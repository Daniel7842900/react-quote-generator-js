import React, { useState } from "react";
import Apiclient from "../services/ApiClient";

const useData = () => {
  const [response, setResponse] = useState();
  const [quoteItems, setQuoteItems] = useState([]);
  const [currentQuote, setCurrentQuote] = useState({});
  const [isLoading, setLoading] = useState(false);

  /**
   * Send a request to OpenAI API and fetch the data with the given prompt.
   *
   * @returns an array of objects
   */
  const makeRequest = async () => {
    setLoading(true);

    const PROMPT = "Give me 10 inspiring quotes only.";

    // Construct the option that will be used to send a request
    const completedOptions = Apiclient.constructOptions(PROMPT);

    // Make a call with given option
    const openai = Apiclient.configureOpenAI();

    const chat_completion = await openai.createChatCompletion(completedOptions);

    // Store the response (only the content)
    const responseContent = chat_completion.data.choices[0].message.content;
    const quotes = responseContent.split("\n");
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
    setQuoteItems(quoteItems);
    return quoteItems;
  };

  /**
   * Find the next quote to render
   * Find the quote that has displayed property false.
   * If the quote is found, update the states accordingly.
   *
   * @param {*} quoteItems
   */
  const findNextQuote = async (quoteItems) => {
    // Find the quote hasn't displayed yet
    const itemToDisplay = quoteItems.find((item) => item.displayed === false);

    // If found, set the states accordingly
    if (itemToDisplay !== undefined) {
      const updatedItem = { ...itemToDisplay, displayed: true };
      const updatedQuoteItems = quoteItems.map((item) =>
        item.id === itemToDisplay.id ? updatedItem : item
      );

      setCurrentQuote(updatedItem);
      setQuoteItems(updatedQuoteItems);
    }
  };
  return { makeRequest, findNextQuote, quoteItems, currentQuote, isLoading };
};

export default useData;
