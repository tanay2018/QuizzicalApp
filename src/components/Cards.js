import "./Cards.css";

export default function Cards(props) {
  // const styles =  {
  //    backgroundColor: x.isHeld ? "grey" : "white"
  // }

  let backgroundColor = "";

  const answers = props.data.answers.map((x, ind) => {
    if (x.isCorrect) {
      backgroundColor = "#94D7A2";
    } else if (x.isHeld && !x.isCorrect && props.change) {
      backgroundColor = "#F8BCBC";
    } else if (x.isHeld) {
      backgroundColor = "#D6DBF5";
    } else {
      backgroundColor = "white";
    }

    const styles = {
      backgroundColor: backgroundColor,
    };

    return (
      <div
        key={x.id}
        className="answer"
        style={styles}
        onClick={() => props.clicked(props.data.id, x.id)}
      >
        {x.value}
      </div>
    );
  });

  return (
    <div className="card">
      <p className="question">{props.data.question}</p>
      <div className="options">{answers}</div>
    </div>
  );
}
