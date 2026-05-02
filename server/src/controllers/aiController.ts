import { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';

// Controller requires API key from env
export const handleChat = async (req: Request, res: Response) => {
  try {
    const { message, context, history, language } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Gemini API key is missing' });
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // Create system instruction based on context (e.g. "First time voter from Mumbai")
    let systemInstruction = `You are VoteVerse AI, an election companion. You guide users based on their age, location, and needs. Keep answers simple, jargon-free, and helpful.`;
    if (context) {
      systemInstruction += ` The user's context: ${JSON.stringify(context)}.`;
    }
    
    if (language) {
      if (language === 'genz') {
        systemInstruction += ` IMPORTANT: You MUST reply entirely in modern GenZ slang (like "no cap", "skibidi", "bet", etc.). Do not use standard English. Return ONLY plain text. ABSOLUTELY NO markdown formatting, NO asterisks (**), NO bold text.`;
      } else if (language !== 'en') {
        const langMap: Record<string, string> = {
          'hi': 'Hindi',
          'te': 'Telugu',
          'mr': 'Marathi'
        };
        const langName = langMap[language] || language;
        systemInstruction += ` IMPORTANT: You MUST reply entirely in ${langName}.`;
      }
    }
    
    // Format history for Gemini
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));
    
    formattedHistory.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedHistory,
      config: {
        systemInstruction,
      }
    });

    res.json({ reply: response.text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate response', details: (error as Error).message });
  }
};

export const checkRumor = async (req: Request, res: Response) => {
  try {
    const { claim } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Gemini API key is missing' });
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const prompt = `Analyze the following claim or viral message related to elections/voting: "${claim}". Explain if it is suspicious, false, or true based on general verified election rules. Recommend official verification steps. Be objective.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({ analysis: response.text });
  } catch (error) {
    console.error('Error in rumor checker:', error);
    res.status(500).json({ error: 'Failed to analyze claim' });
  }
};
