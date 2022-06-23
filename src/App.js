import "./App.css";
import { useEffect, useState } from "react";
import img1 from "./images/basetopright.png";
import img2 from "./images/basebottomleft.png";
import img3 from "./images/nexttopright.png";
import img4 from "./images/nextbottomleft.png";
import Card from "./components/Cards";
import Check from "./components/Check";
import { nanoid } from "nanoid";
import he from "he";

function App() {
  const [data, setData] = useState([]);

  const [count, setCount] = useState(0);

  const [change, setChange] = useState(false);

  const [play, setplay] = useState(false);

  function playGame() {
    setData([]);
    setCount(0);
    setChange(false);
    setplay(!play);
    document.querySelector(".container").classList.toggle("active");
  }

  function clicked(dataid, answerid) {
    function getanswers(ele) {
      return ele.answers.map((x) => {
        if (x.id === answerid) {
          return {
            ...x,
            isHeld: !x.isHeld,
          };
        } else {
          return {
            ...x,
            isHeld: x.isHeld ? !x.isHeld : x.isHeld,
          };
        }
      });
    }

    setData((prevdata) => {
      return prevdata.map((ele) => {
        if (ele.id === dataid) {
          return {
            ...ele,
            answers: getanswers(ele),
          };
        } else {
          return ele;
        }
      });
    });
  }

  function getRandom(arrx) {
    const arr = [];
    while (arr.length < 4) {
      var r = Math.floor(Math.random() * 4);
      if (arr.indexOf(arrx[r]) === -1) arr.push(arrx[r]);
    }

    return arr.map((x) => {
      return {
        id: nanoid(),
        value: x,
        isHeld: false,
        isCorrect: false,
      };
    });
  }

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) =>
        setData(
          data.results.map((x, ind) => {
            // console.log(x.correct_answer);
            return {
              question: he.decode(x.question),
              answers: getRandom([
                x.incorrect_answers[0],
                x.incorrect_answers[1],
                x.incorrect_answers[2],
                x.correct_answer,
              ]),
              correctanswer: x.correct_answer,
              id: nanoid(),
            };
          })
        )
      )
      .catch(() => window.location.reload(false));
  }, [play]);

  console.log(count);

  const cardEle = data.map((x) => (
    <Card data={x} id={x.id} key={x.id} clicked={clicked} change={change} />
  ));

  function checkAnswers() {
    setChange(!change);
    if (!change) {
      data.forEach((item) => {
        item.answers.forEach((ans) => {
          if (ans.isHeld && ans.value === item.correctanswer) {
            setCount((prevCount) => prevCount + 1);
          }
        });
      });

      function ans(item) {
        return item.answers.map((ele) => {
          if (ele.value === item.correctanswer) {
            return {
              ...ele,
              isCorrect: true,
            };
          } else {
            return ele;
          }
        });
      }

      setData((prevdata) =>
        prevdata.map((item) => {
          return {
            ...item,
            answers: ans(item),
          };
        })
      );
    } else {
      playGame();
    }
  }
  console.log(data);

  return (
    <div className="container">
      <img className="img1" src={img1} alt="" />
      <img className="img2" src={img2} alt="" />
      <div className="intro">
        <h1>Quizzical</h1>
        <p>Best Quiz App there is!!</p>
        <button className="start" onClick={playGame}>
          Start Quiz
        </button>
      </div>
      <div className="questions">
        <img className="img3" src={img3} alt="" />
        <img className="img4" src={img4} alt="" />
        <div className="cards">{cardEle}</div>
        <Check data={data} check={checkAnswers} count={count} change={change} />
      </div>
    </div>
  );
}

export default App;
