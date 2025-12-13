import { GoogleGenAI, Type } from "@google/genai";
import { MenuItem, ChatMessage } from "../types";

export const analyzeMenuImage = async (base64Image: string): Promise<Partial<MenuItem>[]> => {
    try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) throw new Error("API Key missing");

        const ai = new GoogleGenAI({ apiKey });

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
                    { text: "Analyze this menu image. Extract the dishes. Return a JSON array where each object has: 'name' (string), 'description' (string, keep it short), 'price' (number), 'category' (guess one: starter, main, dessert, drink), 'dietary' (array of strings, e.g. 'V', 'GF', 'VG', 'JAIN' if detected)." }
                ]
            },
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            description: { type: Type.STRING },
                            price: { type: Type.NUMBER },
                            category: { type: Type.STRING },
                            dietary: { type: Type.ARRAY, items: { type: Type.STRING } }
                        }
                    }
                }
            }
        });

        if (response.text) {
             // Robust JSON parsing to handle potential Markdown wrapping (e.g., ```json ... ```)
            let cleanedText = response.text.trim();
            if (cleanedText.startsWith('```')) {
                cleanedText = cleanedText.replace(/^```(json)?/, '').replace(/```$/, '').trim();
            }
            return JSON.parse(cleanedText);
        }
        return [];
    } catch (error) {
        console.error("Menu Scan Error:", error);
        return [];
    }
};

export const chatWithChef = async (history: ChatMessage[], newMessage: string, menuItems: MenuItem[]): Promise<string> => {
    try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) throw new Error("API Key missing");

        const ai = new GoogleGenAI({ apiKey });

        const menuContext = menuItems.map(item => 
            `- ${item.name} (${item.category}, ₹${item.price}): ${item.description} ${item.dietary ? `[${item.dietary.join(', ')}]` : ''}`
        ).join('\n');

        const systemInstruction = `You are Chef Aurelius, the digital concierge of a premium restaurant.
        Your tone is sophisticated, welcoming, and knowledgeable.
        
        Here is our Menu:
        ${menuContext}
        
        Answer guest inquiries about ingredients, dietary suitability, and pairings.
        Recommend dishes based on their preferences.
        If a dish is not on the menu, politely inform them.
        Keep answers concise (under 3 sentences) unless asked for details.`;

        // Map ChatMessage to Content format expected by SDK
        const contents = history.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.text }]
        }));

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
            }
        });

        return response.text || "I apologize, I am at a loss for words.";
    } catch (error) {
        console.error("Chat Error:", error);
        return "I apologize, but I cannot respond right now.";
    }
};