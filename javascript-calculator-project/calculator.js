let calculation = localStorage.getItem('calculation') || '';

updateDisplay();

function updateCalculation(value) {
  calculation += value;
  localStorage.setItem('calculation', calculation);
  updateDisplay();
}

function calculateResult() {
  try {
    calculation = eval(calculation).toString();
  } catch {
    calculation = 'Error';
  }

  localStorage.setItem('calculation', calculation);
  updateDisplay();
}

function clearCalculation() {
  calculation = '';
  localStorage.setItem('calculation', calculation);
  updateDisplay();
}

function updateDisplay() {
  document.querySelector('.js-display').innerHTML = calculation || '0';
}