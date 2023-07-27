import { useState } from "react";
import Apiclient from "./services/ApiClient";
import Loader from "./components/Loader";
import "./App.css";

function App() {
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
   * Handles Generate Quote button click.
   */
  const handleOnclick = async () => {
    // Check if quoteItems is empty or not
    if (quoteItems.length > 0) {
      // Check if the last quote is already displayed.
      // If so, fetch another quotes and display the first one.
      if (quoteItems[quoteItems.length - 1]["displayed"] === true) {
        setQuoteItems([]);

        const fetchedData = await makeRequest();
        await findNextQuote(fetchedData);
      } else {
        await findNextQuote(quoteItems);
      }
    } else {
      const fetchedData = await makeRequest();
      await findNextQuote(fetchedData);
    }
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

  return (
    <div className="min-h-screen h-screen m-0 bg-stone-100">
      <div className="flex h-1/5  justify-center items-center mx-auto">
        <h1 className="text-5xl">Welcome to Quote Generator</h1>
      </div>
      <div className="flex h-3/5 justify-center items-center mx-auto">
        {quoteItems.length > 0 ? (
          <span key={currentQuote.id} className="text-2xl italic">
            {currentQuote.content}
          </span>
        ) : isLoading ? (
          <Loader />
        ) : (
          <span className="text-5xl italic">
            Click below button to see an inspiring quote for today!
          </span>
        )}
      </div>
      <div className="flex h-1/5 justify-center mx-auto">
        <div>
          <button
            className="text-4xl rounded-full py-1 px-3 border-2 border-black bg-indigo-200"
            onClick={handleOnclick}
          >
            Generate Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
