import React from "react"
import Questions from "./components/Questions"

export default function App(){
    const [startQuiz, setStartQuiz] = React.useState(false)  //setting state to false
    const [quizs, setQuizs] = React.useState([]) //setting state to empty array


  React.useEffect(() =>{ //using effect to sync states above
        async function getQuestions(){ //fetching API 
          const response = await fetch ("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
          const data = await response.json()
          const {results} = data //getting results data from API
          setQuizs(results) //starting function from state with results data
      }
      if (startQuiz){ //is startQuiz is true we getting questions
        getQuestions();
      }
  },[startQuiz]) //dependencies array to startQuiz when they changed


    return (
        <div>
            {!startQuiz &&(
            <div className="frontpage--component">
                <h1 className="fontpage--title">Qiuzical</h1>
                <p className="frontpage--text">Answer 5 random question and get 5 correct answers to win this quiz!</p>
                <button className="frontpage--btn" onClick={() => setStartQuiz(true)}>Start Quiz</button>
            </div>
            )}
            {startQuiz && (
               <Questions isStarted={startQuiz} setStartQuiz={setStartQuiz} quizs ={quizs} />
            )}
        </div>
    )
}


async function getQuestions(){ //fetching API 
    const response = await fetch ("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
    const data = await response.json()
    console.log(data)
}

getQuestions()