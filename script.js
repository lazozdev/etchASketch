const defaultMode = "color";
const defaultColor = "#3700B3";
const defaultSize = 16;

let currentSize = defaultSize;
let currentMode = defaultMode;

const colorBtn = document.getElementById('colorBtn')
const rainbowBtn = document.getElementById('rainbowBtn')
const eraserBtn = document.getElementById('eraserBtn')
const sizeValue = document.getElementById("sizeValue");
const gridContainer = document.querySelector(".gridContainer");
const gridRange = document.getElementById('gridRange');

colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow')
eraserBtn.onclick = () => setCurrentMode('erase')
gridRange.onmousemove = (e) => updateSizeValue(e.target.value);
gridRange.onchange = (e) => changeSize(e.target.value);

function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

function setCurrentSize(newSize) {
    currentSize = newSize;
    reloadGrid();
}

function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

function setupGrid(size) {
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    // Calcule le nombre de div à créer
    let gridDivTotal = Math.pow(size, 2);
    // Loop pour créer les div
    for(let i=0; i < gridDivTotal; i++) {
        const addDiv = document.createElement('div');
        addDiv.addEventListener("mouseover", changeColor);
        gridContainer.appendChild(addDiv);
    }
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}

function reloadGrid() {
    clearGrid();
    setupGrid(currentSize);
}

function clearGrid() {
    gridContainer.innerHTML = '';
}

function changeColor(e) {
    if (currentMode === "rainbow") {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (currentMode === "color") {
        e.target.style.backgroundColor = defaultColor;
    }  else if (currentMode === "erase") {
        e.target.style.backgroundColor = "#fefefe"
    }
}

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
      rainbowBtn.classList.remove('active')
    } else if (currentMode === 'color') {
      colorBtn.classList.remove('active')
    }
  
    if (newMode === 'rainbow') {
      rainbowBtn.classList.add('active')
    } else if (newMode === 'color') {
      colorBtn.classList.add('active')
    }
}

window.onload = () => {
    setupGrid(defaultSize)
    activateButton(defaultMode)
  }