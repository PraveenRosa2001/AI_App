import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Replace process.env.API_KEY with your actual API key
const genAI = new GoogleGenerativeAI("AIzaSyAC5nTKju3ZhhfUo0UL30Mkf7s_LT3jlw8");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  return result.response.text(); // Ensure you are returning the correct result


  // Fix the returned result
  return result.response.text(); // Correctly return the text from the response
}

export default run;
