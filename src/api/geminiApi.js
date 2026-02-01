const API_KEY = "AIzaSyDbaRg5hjOMcupYcbyOrbqn-N9sOgfJ50I";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export const generateContent = async (contents) => {
    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents })
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error.message);
        }

        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error("Invalid response from API");
        }

        let result = data.candidates[0].content.parts[0].text;
        return result.replace(/\*\*/g, '').replace(/##/g, '');
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};
