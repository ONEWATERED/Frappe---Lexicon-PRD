import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAI = () => {
    if (!ai) {
        if (!process.env.API_KEY) {
            console.error("API_KEY environment variable not set.");
            throw new Error("API_KEY environment variable not set.");
        }
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
}

export const explainTermSimply = async (term: string, technicalDefinition: string): Promise<string> => {
  try {
    const genAI = getAI();
    const prompt = `You are an expert in the water utility industry, skilled at explaining complex topics simply. 
    Explain the following term as if you were talking to a curious 5-year-old. Use a simple analogy.
    Keep it to 2-3 short sentences.

    Term: "${term}"
    Technical Definition: "${technicalDefinition}"

    Simple Explanation:`;

    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating simple explanation:", error);
    return "I'm having trouble simplifying this right now. Please try again later.";
  }
};

export const generateRealWorldExample = async (term: string, definition: string): Promise<string> => {
  try {
    const genAI = getAI();
    const prompt = `You are an expert in the water utility industry. 
    Provide a concise, practical, real-world example of the following term in action at a utility. 
    Frame it as a mini-scenario or story. Keep it to one paragraph.

    Term: "${term}"
    Definition: "${definition}"

    Real-World Example:`;

    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating real-world example:", error);
    return "I'm having trouble generating an example right now. Please try again later.";
  }
};


export const getAICoachResponse = async (cardFront: string, cardBack: string, question: string): Promise<string> => {
  try {
    const genAI = getAI();
    const prompt = `You are an AI Coach helping a student study for a water industry exam. 
    They are looking at a flashcard and have a follow-up question.
    
    Here is the flashcard content:
    - Front (Question): "${cardFront}"
    - Back (Answer): "${cardBack}"
    
    Here is the student's question:
    - "${question}"
    
    Your task is to answer their question concisely and accurately, relating it back to the flashcard's topic. 
    If the question is unrelated, gently guide them back to the topic. Be encouraging and helpful.`;

    const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error getting AI Coach response:", error);
    return "I'm sorry, I can't answer that right now. Let's focus on the card's topic. Do you have another question about it?";
  }
};

export const getHardeepVoiceResponse = async (userQuery: string): Promise<string> => {
  try {
    const genAI = getAI();
    const prompt = `You are Hardeep, a "Knowledge Avatar" and an expert in the water utility industry. 
    You are speaking to a user via a voice interface.
    Your knowledge base covers utility management, digital transformation, and sustainable infrastructure.
    
    Answer the user's query concisely and conversationally, as if you were in a real phone call.
    Keep your responses to 2-4 sentences to be suitable for a voice-first experience.
    Do not use markdown or formatting. Just provide the plain text for your verbal response.
    
    User's query: "${userQuery}"
    
    Hardeep's response:`;

    const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error getting Hardeep voice response:", error);
    return "I'm sorry, I'm having trouble connecting right now. Could you please repeat that?";
  }
};