const startColorRandom = document.querySelector('button[data-start]');
const stopColorRandom = document.querySelector('button[data-stop]');let colorId = null;

function goColor(){
    colorId = setInterval(() =>{
        let randomColor = getRandomHexColor();
        document.querySelector('body').style.backgroundColor = randomColor;
    },1000);
    startColorRandom.disabled = true;
    stopColorRandom.disabled = false;
}

function stopColor(){
    clearInterval(colorId);
    startColorRandom.disabled = false;
    stopColorRandom.disabled = true;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

  startColorRandom.addEventListener('click', goColor);
  stopColorRandom.addEventListener('click', stopColor);