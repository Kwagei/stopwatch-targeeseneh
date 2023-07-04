let timer;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let timerDisplay = document.getElementById('timer-display');
let buzzer = document.getElementById('buzzer');

function enableInputFields() {
  let inputs = document.querySelectorAll('.input-box input');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].disabled = false;
  }
}



function startTimer() {
  let hourInput = document.querySelector('.input-box input[placeholder="hour"]');
  let minuteInput = document.querySelector('.input-box input[placeholder="minute"]');
  let secondInput = document.querySelector('.input-box input[placeholder="second"]');
  
  let hours = parseInt(hourInput.value) || 0;
  minutes = parseInt(minuteInput.value) || 0;
  seconds = parseInt(secondInput.value) || 0;
  
  let totalTime = hours * 3600 + minutes * 60 + seconds;

  if (totalTime > 0) {
    timer = setInterval(function() {
      if (milliseconds === 0) {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timer);
            buzzer.play();
            return;
          }
          minutes--;
          seconds = 59;
        } else {
          seconds--;
        }
        milliseconds = 99;
      } else {
        milliseconds--;
      }
      
      timerDisplay.textContent = formatTime(minutes, seconds, milliseconds);
    }, 10);
  }
}

function formatTime(minutes, seconds, milliseconds) {
  return (
    (minutes < 10 ? '0' + minutes : minutes) +
    ':' +
    (seconds < 10 ? '0' + seconds : seconds) +
    ':' +
    (milliseconds < 10 ? '0' + milliseconds : milliseconds)
  );
}

function pauseTimer() {
  clearInterval(timer);
}
function continueTimer() {
  
   startTimer();
  
}



function resetTimer() {
  clearInterval(timer);
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  timerDisplay.textContent = '00:00:00';
  buzzer.pause();
  buzzer.currentTime = 0;

  let inputs = document.querySelectorAll('.input-box input');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
  enableInputFields();
}
