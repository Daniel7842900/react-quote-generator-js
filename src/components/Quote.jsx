const Quote = (props) => {
  const { currentQuote } = props;

  return (
    <span key={currentQuote.id} className="text-2xl italic">
      {currentQuote.content}
    </span>
  );
};

export default Quote;
