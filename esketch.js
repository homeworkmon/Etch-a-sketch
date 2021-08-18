const container = document.querySelector(".container");
const reset = document.querySelector(".reset");
const colorButton = document.querySelectorAll(".color-button");
const slide = document.querySelector("input[type=range]");
let base = 16;
let pixels = container.childNodes;
let round = Math.round, random = Math.random, colors = 255;
let color;

function draw(pixels) {
    pixels.forEach(pixel => {
        pixel.addEventListener("mouseover", (e) => {
            if (color == 'pink') {
                e.target.style.backgroundColor = randomizePink();
            }
            else if (color == 'green') {
                e.target.style.backgroundColor = randomizeGreen();
            }
            else if (color == 'orange') {
                e.target.style.backgroundColor = randomizeOrange();
            }
            else { e.target.style.background ='black'; }
        });
    });
}

function generateBoard(container, base) {
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    container.style.setProperty('--grid-base', base); //pass base number to css grid dislay property for row/column count
    for (let i=0; i<base*base; i++) {
        let pixel = document.createElement('div');
        pixel.className = 'pixel';
        container.appendChild(pixel);
    }
    draw(pixels);
}

function resetButton(pixels) {
    reset.addEventListener("click", () => {
        document.body.style.backgroundColor = 'white';
        pixels.forEach(pixel => {
            pixel.style.backgroundColor = 'white';
        });
        color = 0;
        draw(pixels);
    });
}

function adjustGrid() {
    slide.onchange = (e) => {
        base = e.target.value;
        generateBoard(container, base);
    }
}

function changeTheme() {
    colorButton.forEach(button => {
        button.addEventListener("click", (e) => {
            if (e.target.classList.contains('pink')) {
                color = 'pink';
                document.body.style.backgroundColor = randomizePink();
            } else if (e.target.classList.contains('orange')) {
                color = 'orange'; 
                document.body.style.backgroundColor = randomizeOrange();
            } else if (e.target.classList.contains('green')) { 
                color = 'green'; 
                document.body.style.backgroundColor = randomizeGreen();}
        });
    });
}

function randomizePink() {
    return 'rgba(' + 255 + ',' + 0 + ',' + round(random()*colors) + ',' + '1)'
}

function randomizeGreen() {
    return 'rgba(' + 0 + ',' + 255 + ',' + round(random()*colors) + ',' + '1)'
}

function randomizeOrange() {
    return 'rgba(' + 255 + ',' + round(random()*colors) + ',' + 0 + ',' + '1)'
}

generateBoard(container, base);
resetButton(pixels);
changeTheme();
adjustGrid();