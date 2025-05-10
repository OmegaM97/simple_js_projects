let number = localStorage.getItem('calculation');
const screen = document.querySelector('.screen');
screen.innerText = number;

function updateCalculation(value) {
  number += `${value}`;
  screen.innerText = number;
  localStorage.setItem('calculation', number);
}

function clearNow() {
  number = '';
  screen.innerText ='cleared'; 
  localStorage.setItem('calculation', number);
}

function calculate() {
  const alemu = eval(number);
  number = `${alemu}`;
  screen.innerText = number;
  localStorage.setItem('calculation', number);
}

function deleteNum() {
  const sisay = number.split('');
  for(let i = 0; i < sisay.length; i++) {
  if ( i === sisay.length - 1) {
    console.log(sisay[i])
    if(sisay[i] == ' '){
      sisay.splice(i - 2, 3);
    } else {
      sisay.splice(i,1);
    }
  }
  }
  number = sisay.join('');
  screen.innerText = number;
  localStorage.setItem('calculation', number);
}

document
.addEventListener('keydown', (event) => {
  if (event.key == 1) {
    updateCalculation(1)
  }
  else if (event.key == 2) {
    updateCalculation(2)
  }
  else if (event.key == 3) {
    updateCalculation(3)
  }
  else if (event.key == 4) {
    updateCalculation(4)
  }
  else if (event.key == 5) {
    updateCalculation(5)
  }
  else if (event.key == 6) {
    updateCalculation(6)
  }
  else if (event.key == 7) {
    updateCalculation(7)
  }
  else if (event.key == 8) {
    updateCalculation(8)
  }
  else if (event.key == 9) {
    updateCalculation(9)
  }
  else if (event.key == 0) {
    updateCalculation(0)
  }
  else if (event.key == '*') {
    updateCalculation(' * ')
  }
  else if (event.key == '+') {
    updateCalculation(' + ')
  }
  else if (event.key == '-') {
    updateCalculation(' - ')
  }
  else if (event.key == '/') {
    updateCalculation(' / ')
  }
  else if (event.key == '.') {
    updateCalculation('.')
  }
  else if (event.key == '=') {
    calculate()
  }
  else if (event.key == 'Backspace') {
    deleteNum();
  }
})

