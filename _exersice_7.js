//Make Quiz App 


let score = Number.parseInt(localStorage.getItem("score")) || 0;

let plus = document.querySelector('.score')
let myScore = document.querySelector('.score');
myScore.innerHTML = `<p>Your Score is: <span style="font-weight:600">${score}</span></p>`;
const genrateQuiz = async()=>{
    let txt = "";
    let url = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
    let resoponse = await url.json();
     
    let incorrect = resoponse.results[0].incorrect_answers;
    let correct = resoponse.results[0].correct_answer;
    console.log(correct)
     let number = Math.floor(4 * Math.random())
     incorrect[number] = resoponse.results[0].correct_answer;
     console.log(incorrect)
     for(let item of resoponse.results){
  txt += `<div id="question-container">
    <p id="question-text">${item.question}</p>
    <div id="options-container">
    
</div>`;
     }
     document.querySelector('.quiz').innerHTML = txt;
     for(let i of incorrect){
        let div = document.createElement('div');
        
        div.innerHTML = `<button class="option">${i}</button>`;
        div.querySelector('.option').addEventListener('click', ()=>{
        if(i === correct){
            score = score + 1;
            localStorage.setItem("score", score.toString())
            alert("You are win")
            location.reload();
        }else{ 
            score = 0;
            localStorage.setItem("score", score.toString());
            alert(`Correct Anwser is ${correct} .So, Wrong anwser Better luck next time!`)
            location.reload()
        }
     })
        document.getElementById('options-container').append(div);
     }
  return resoponse.results;
}

const run = async()=>{
    let a = await genrateQuiz();
    console.log(a)
}

run();