import { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { v2 } from '@google-cloud/translate';

export const translateText = async (req: Request, res: Response) => {
  try {
    const { text, targetLang } = req.body;
    
    if (!text || !targetLang) {
      return res.status(400).json({ error: 'Missing text or targetLang' });
    }

    // 1. GenZ Slang Translation (using Gemini)
    if (targetLang === 'genz') {
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: 'Gemini API key missing' });
      }
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Rewrite this English text into modern GenZ slang (e.g. "no cap", "skibidi", "rizz", "bet"). Return ONLY the plain text. ABSOLUTELY NO markdown formatting, NO asterisks (**), NO bold text. Keep it very short. Text: "${text}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return res.json({ translatedText: response.text.trim() });
    }

    // 2. Standard Language Translation (using Google Cloud Translate API)
    const translateKey = process.env.GOOGLE_TRANSLATE_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY; 
    
    if (!translateKey) {
      return res.status(500).json({ error: 'Google Translate API key missing' });
    }

    const translateClient = new v2.Translate({ key: translateKey });
    let [translations] = await translateClient.translate(text, targetLang);
    translations = Array.isArray(translations) ? translations[0] : translations;

    res.json({ translatedText: translations });

  } catch (error) {
    console.error('Error translating text:', error);
    res.status(500).json({ error: 'Translation failed', details: (error as Error).message });
  }
};
