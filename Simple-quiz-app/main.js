let questions = [
  {
    question: "What is the capital city of Canada?",
    answer: {
      A: "Toronto",
      B: "Ottawa",
      C: "Vancouver",
      D: "Montreal",
    },
    trueValue: "Ottawa"
  },
  {
    question: "Which planet is known as the \"Red planet\"?",
    answer: {
      A: "Venus",
      B: "Saturn",
      C: "Mars",
      D: "Jupiter",
    },
    trueValue: "Mars"
  },
  {
    question: "Who wrote the play Romeo and Juliet?",
    answer: {
      A: "Charles Dickens",
      B: "William Shakespeare",
      C: "Mark Twain",
      D: "Jane Austen",
    },
    trueValue: "William Shakespeare"
  },
  {
    question: "What is the chemical symbol for gold?",
    answer: {
      A: "Ag",
      B: "Au",
      C: "Go",
      D: "Gd",
    },
    trueValue: "Au"
  }
]

let index = 0;
let correctAnswer = 0;

renderAllQuiz();

function renderAllQuiz() {
  if (questions.length) {
    let innerHTML = '';
    
    let html = `${returnHtml(index,questions[index])}`
    innerHTML += html;

    const questionContainer = document.querySelector('.question-container');
    const nextDiv = document.querySelector('.next-div');
    console.log('omega')
    
    questionContainer.innerHTML =innerHTML;
    
    document.querySelectorAll('.choice')
    .forEach((element) => {
      element.addEventListener('click', () => {
        
        document.querySelectorAll('.choice').forEach((div) => {
          div.classList.add('unclickable')
        });

        if (element.innerHTML.includes(`${questions[index].trueValue}`)) {

          element.classList.remove('hover')
          element.classList.add('green');
          correctAnswer += 1;

        } else {
          document.querySelectorAll('.choice')
          .forEach((element) => {

            if(element.innerHTML.includes(`${questions[index].trueValue}`)) {
              element.classList.add('green');
            }
          });

          element.classList.remove('hover')
          element.classList.add('red')
        }
        
        nextDiv.innerHTML = `<button class="next-btn">Next</button>`
        
        index += 1;
        
        document.querySelector('.next-btn')
        .addEventListener('click', () => {
          if(index < questions.length) {
            renderAllQuiz();

             nextDiv.innerHTML = '';

          } else {

            questionContainer.innerHTML = 
            `<div class="result">
            Result: ${correctAnswer} / ${questions.length}
            </div>
            <div class="grade">
            Grade: ${correctAnswer / questions.length >= 0.5? "Pass" : "Fail"}
            </div>
            `

            nextDiv.innerHTML = `
            <div class="try-again">
            <a href="index.html"><button class="try-again-btn">Try again</button></a>
            </div>`;
          }
        });
      });
    });
  } else {
    document.querySelector('.question-container')
    .innerHTML = `<p>There are no quizes available.</p>`
  }
}


function returnHtml(number, question) {
  let html = `
  <div class="question-inner">
      <div class="number">Q${number + 1}.</div>
      <div class="question">${question.question}</div>
    </div>

    <div class="choice hover">
      <div class="letter">A.</div>
      <div class="answer">${question.answer.A}</div>
    </div>
    
    <div class="choice hover">
      <div class="letter">B.</div>
      <div class="answer">${question.answer.B}</div>
    </div>

    <div class="choice hover">
      <div class="letter">C.</div>
      <div class="answer">${question.answer.C}</div>
    </div>

    <div class="choice hover">
      <div class="letter">D.</div>
      <div class="answer">${question.answer.D}</div>
    </div>`

    return html;
}
