import "./App.css";

function App() {
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
