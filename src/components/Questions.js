import React from "react"
import { nanoid } from "nanoid";
import Option from "./Option"

export default function Questions(props){
    const [submission, setSubmission] = React.useState(false); //setting submission false as a default
    // const [score, setScore] = React.useState(0); //setting score to 0
    const [articles, setArticles] = React.useState([]) //setting state for an empty array

    React.useEffect(() => {                 //setting useeffect for sync states
        setArticles(getArticles)
    },[props.quizs])

    function messOrder(...arr) {
        const result = [];
        const list = arr.flat();
        while (list.length) {
          const select = Math.floor(Math.random() * 2) ? list.pop() : list.shift();
          result.push({
            option: select,
            picked: false,
          });
        }
        return result;
      }
    

    function getArticles(){             
        const elements = props.quizs.map((quiz) =>{   //mapping through all quizs and getting question and correct answer from API data
            const question = quiz.question
            const answer = quiz.correct_answer
            let options;
                if (quiz.type === "boolean") {
                options = [
                    { option: "True", picked: false },
                    { option: "False", picked: false },
                ];
      } else {
        options = messOrder(quiz.correct_answer, quiz.incorrect_answers);
      }
            return{
                id:nanoid(),
                question:question,
                answer:answer,
                options:options
            }
        })
        return elements
    }
    
    // function checkAnswer(e) {
    //     e.preventDefault();
    //     if (e.target.textContent === "Play again") {
    //       setSubmission(false);
    //       props.setStarted(false);
    //     }
    //     setSubmission(true);
    //     articles.forEach((article) => {
    //       if (
    //         article.options.find((item) => item.picked).option === article.answer
    //       ) {
    //         setScore((prevScore) => prevScore + 1);
    //       }
    //     });
    //   }

    const articleElements = articles.map((article) =>{
        const lists = article.options.map((item) =>(
            <Option
                key={item.option}
                article={article.id}
                listItem={item}
                isSubmitted={submission}
                answer={article.answer}
                setArticles={setArticles}
            />
        ));
        return(
            <div key={article.id} className="question">
                <h2>{article.question}</h2>
                <ul className="option">{lists}</ul>
            </div>
        )
    })
    


    return (
    <form className="form--question">
            {articleElements}
    </form>
    )
}