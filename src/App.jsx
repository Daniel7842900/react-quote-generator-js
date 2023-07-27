import useData from "./hooks/useData";
import Loader from "./components/Loader";
import "./App.css";

function App() {
  const { makeRequest, findNextQuote, quoteItems, currentQuote, isLoading } =
    useData();

  /**
   * Handles Generate Quote button click.
   */
  // TODO: deal with when the last item has reached.
  const handleOnclick = async () => {
    // Check if quoteItems is empty or not
    if (quoteItems.length > 0) {
      // Check if the last quote is already displayed.
      // If so, fetch another quotes and display the first one.
      if (quoteItems[quoteItems.length - 1]["displayed"] === true) {
        // setQuoteItems([]);

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
