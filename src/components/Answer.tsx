function Answer({ result }) {
  const isEmpty =
    result.years === null &&
    result.months === null &&
    result.days === null;

  return (
    <section className="answer">
      <div className="answer-item">
        <span className="answer-item-line">
          {isEmpty ? "--" : result.years}
        </span>
        <h1 className="answer-item-text">years</h1>
      </div>

      <div className="answer-item">
        <span className="answer-item-line">
          {isEmpty ? "--" : result.months}
        </span>
        <h1 className="answer-item-text">months</h1>
      </div>

      <div className="answer-item">
        <span className="answer-item-line">
          {isEmpty ? "--" : result.days}
        </span>
        <h1 className="answer-item-text">days</h1>
      </div>
    </section>
  );
}

export default Answer;
