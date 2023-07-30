import { useState } from "react";
import Apiclient from "../services/ApiClient";

const useData = () => {
  const [response, setResponse] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const generateQuote = async () => {
    // Check if data is empty or not
    if (data.length > 0) {
      // Check if the last quote is already displayed.
      // If so, fetch another quotes and display the first one.
      if (currentIndex === data.length - 1) {
        setData([]);

        await makeRequest();
        await findNextQuote();
      } else {
        await findNextQuote();
      }
    } else {
      await makeRequest();
      await findNextQuote();
    }
  };

  /**
   * Send a request to OpenAI API and fetch the data with the given prompt.
   *
   * @returns an array of objects
   */
  const makeRequest = async () => {
    setLoading(true);

    const PROMPT =
      "Give me 10 inspiring quotes from https://www.brainyquote.com/ in English. Start the response with the numbered point right away.";

    // Construct the option that will be used to send a request
    const completedOptions = Apiclient.constructOptions(PROMPT);

    // Make a call with given option
    const openai = Apiclient.configureOpenAI();

    const chat_completion = await openai.createChatCompletion(completedOptions);

    // Store the response (only the content)
    const responseContent = chat_completion.data.choices[0].message.content;
    console.log(responseContent);
    const quotes = responseContent.split(/\n/);
    const quoteItems = [];

    quotes.forEach((q) => {
      // Capture the number from the string
      const numberMatchId = q.match(/^\d+/);
      const id = numberMatchId ? parseInt(numberMatchId[0]) : null;

      // Capture the content quote from the string
      const content = q.slice(3);

      // Construct an object with captured info
      const quote = {
        id: id,
        content: content,
        displayed: false,
      };

      // Add a quote object into an array
      quoteItems.push(quote);
    });

    setLoading(false);
    setResponse(responseContent);
    setData(quoteItems);
    setCurrentIndex(0); // Start with the first quote
  };

  /**
   * Find the next quote to render
   */
  const findNextQuote = async () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return {
    generateQuote,
    data,
    currentIndex,
    isLoading,
  };
};

export default useData;
