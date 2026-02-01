const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export const generateContent = async (contents) => {
  if (!API_KEY) {
    throw new Error("Gemini API key is missing. Check your .env file.");
  }

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    if (
      !data.candidates ||
      !data.candidates[0] ||
      !data.candidates[0].content
    ) {
      throw new Error("Invalid response from Gemini API");
    }

    return data.candidates[0].content.parts[0].text
      .replace(/\*\*/g, "")
      .replace(/##/g, "");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
