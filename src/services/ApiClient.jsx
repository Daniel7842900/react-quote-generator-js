import { Configuration, OpenAIApi } from "openai";

const configureOpenAI = () => {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  return openai;
};

/**
 * Constructs an option that will be used to send a request.
 * @returns an object
 * TODO change the token limit to cover all 10 quotes
 *
 */
const constructOptions = (prompt) => {
  const options = {
    model: "gpt-3.5-turbo",
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    temperature: 1.8,
    max_tokens: 1000,
  };

  const messages = [{ role: "user", content: prompt }];

  const completedOptions = {
    ...options,
    messages: messages,
  };

  return completedOptions;
};

export default { configureOpenAI, constructOptions };
