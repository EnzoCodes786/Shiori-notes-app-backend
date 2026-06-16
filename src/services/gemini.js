const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function geminiSummarize(content) {
    for (let i = 0; i < 3; i++) {
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: `summarize ${content}`
            });

            
            return response.text;
        } catch (err) {
            console.log(`Attempt ${i + 1} failed`);
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
}

module.exports = geminiSummarize