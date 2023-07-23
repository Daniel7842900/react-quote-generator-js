import { useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const prompt = "Give me 10 inspiring quotes.";

  useEffect(() => {
    makeRequest();
  }, []);

  const makeRequest = async () => {
    const options = {
      model: "gpt-3.5-turbo",
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      max_tokens: 100,
    };

    const messages = [{ role: "user", content: prompt }];

    const completedOptions = {
      ...options,
      messages: messages,
    };

    const chat_completion = await openai.createChatCompletion(completedOptions);
    console.log(chat_completion.data.choices[0].message);
  };

  return (
    <div className="min-h-screen h-screen m-0 bg-stone-100">
      <div className="flex h-1/5  justify-center items-center mx-auto">
        <h1 className="text-5xl">Welcome to Quote Generator</h1>
      </div>
      <div className="flex h-3/5 justify-center items-center mx-auto">
        <span className="text-6xl italic">main quote here</span>
      </div>
      <div className="flex h-1/5 justify-center mx-auto">
        <div>
          <button className="text-4xl rounded-full py-1 px-3 border-2 border-black">
            Generate Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
