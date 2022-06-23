import "./Check.css";

export default function Check(props) {
  return (
    <div className="check">
      {props.change && <span>You scored {props.count}/5 correct answers</span>}
      <button className="checkans" onClick={props.check}>
        {props.change ? "Play again" : "Check Answers"}
      </button>
    </div>
  );
}
