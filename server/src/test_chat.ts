import { GoogleGenAI } from '@google/genai';

async function testChat() {
  try {
    
    
    let systemInstruction = `You are VoteVerse AI, an election companion. You guide users based on their age, location, and needs. Keep answers simple, jargon-free, and helpful.`;
    
    const formattedHistory = [{ role: 'user', parts: [{ text: "hello" }] }];

    console.log("Generating...");
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedHistory,
      config: {
        systemInstruction,
      }
    });

    console.log("Response:", response.text);
  } catch (err: any) {
    console.error("Error Details:", err.message);
  }
}

testChat();
