import useData from "./hooks/useData";
import Loader from "./components/Loader";
import Quote from "./components/Quote";
import "./App.css";

function App() {
  const { generateQuote, data, currentIndex, isLoading } = useData();

  /**
   * Handles Generate Quote button click.
   */
  const handleOnclick = async () => {
    await generateQuote();
  };

  return (
    <div className="min-h-screen h-screen m-0 bg-stone-100">
      <div className="flex h-1/5  justify-center items-center mx-auto">
        <h1 className="text-5xl">Welcome to Quote Generator</h1>
      </div>
      <div className="flex h-3/5 justify-center items-center mx-auto">
        {data.length > 0 ? (
          <Quote currentQuote={data[currentIndex]} />
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
