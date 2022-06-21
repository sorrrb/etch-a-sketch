let display = () => {
  const SKETCH_REF = document.querySelector('div.container'); //Sketchpad node reference
  const SKETCH_SIZE = SKETCH_REF.clientWidth; //Grab width of Sketchpad on client

  const SIZE_MODE = document.querySelector('#size'); //Grab size-mode node
  const COLOR_MODE = document.querySelector('#color'); //Grab color-mode node

  const COLOR_INDEX = ['black', 'rainbow', 'white', 'hsl'];
  let CURRENT_COLOR = COLOR_INDEX[0];

  SKETCH_REF.setAttribute('style', `display: grid; grid-template-columns: repeat(16, 1fr); grid-template-rows: repeat(16, 1fr);`);

  // Helper function to change size of sketchpad & size text content
  let changeSize = () => {
    const GRAB_SIZE = SKETCH_REF.getAttribute('style');
    if (GRAB_SIZE.includes('repeat(16')) {
      clear();
      SKETCH_REF.setAttribute('style', `display: grid; grid-template-columns: repeat(32, 1fr); grid-template-rows: repeat(32, 1fr);`);
      SIZE_MODE.textContent = '32x32';
      gridGenerate(32);
    }
    else if (GRAB_SIZE.includes('repeat(32')) {
      clear();
      SKETCH_REF.setAttribute('style', `display: grid; grid-template-columns: repeat(64, 1fr); grid-template-rows: repeat(64, 1fr);`);
      SIZE_MODE.textContent = '64x64';
      gridGenerate(64);
    }
    else if (GRAB_SIZE.includes('repeat(64')) {
      clear();
      SKETCH_REF.setAttribute('style', `display: grid; grid-template-columns: repeat(96, 1fr); grid-template-rows: repeat(96, 1fr);`);
      SIZE_MODE.textContent = '96x96';
      gridGenerate(96);
    }
    else if (GRAB_SIZE.includes('repeat(96')) {
      clear();
      SKETCH_REF.setAttribute('style', `display: grid; grid-template-columns: repeat(1, 1fr); grid-template-rows: repeat(1, 1fr);`);
      SIZE_MODE.textContent = '1x1';
      gridGenerate(1);
    }
    else if (GRAB_SIZE.includes('repeat(1,')) {
      clear();
      SKETCH_REF.setAttribute('style', `display: grid; grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, 1fr);`);
      SIZE_MODE.textContent = '2x2';
      gridGenerate(2);
    }
    else if (GRAB_SIZE.includes('repeat(2,')) {
      clear();
      SKETCH_REF.setAttribute('style', `display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(4, 1fr);`);
      SIZE_MODE.textContent = '4x4';
      gridGenerate(4);
    }
    else if (GRAB_SIZE.includes('repeat(4,')) {
      clear();
      SKETCH_REF.setAttribute('style', `display: grid; grid-template-columns: repeat(8, 1fr); grid-template-rows: repeat(8, 1fr);`);
      SIZE_MODE.textContent = '8x8';
      gridGenerate(8);
    }
    else {
      clear();
      SKETCH_REF.setAttribute('style', `display: grid; grid-template-columns: repeat(16, 1fr); grid-template-rows: repeat(16, 1fr);`);
      SIZE_MODE.textContent = '16x16';
      gridGenerate(16);
    }
  }

  // Helper function to change color of mouse trail
  function changeColor() {
    if (CURRENT_COLOR === COLOR_INDEX[0]) {
      COLOR_MODE.textContent = 'Rainbow';
      CURRENT_COLOR = COLOR_INDEX[1];
      cursorRainbow();
    }
    else if (CURRENT_COLOR === COLOR_INDEX[1]) {
      COLOR_MODE.textContent = 'White';
      CURRENT_COLOR = COLOR_INDEX[2];
      cursorWhite();
    }
    else if (CURRENT_COLOR === COLOR_INDEX[2]) {
      COLOR_MODE.textContent = 'Transparency';
      CURRENT_COLOR = COLOR_INDEX[3];
      cursorHSL();
    }
    else if (CURRENT_COLOR === COLOR_INDEX[3]) {
      COLOR_MODE.textContent = 'Black';
      CURRENT_COLOR = COLOR_INDEX[0];
      cursorBlack();
    }
  }

  // Helper function to clear grid

  function clear() {
    SKETCH_REF.replaceChildren();
  }

  function clearCreate() {
    clear();
    const GRIDSTYLE = SKETCH_REF.getAttribute('style');
    const STYLECOPY = GRIDSTYLE.substring(45, 47);
    if (STYLECOPY.includes(',')) {
      const NEWCOPY = STYLECOPY.substring(0,1);
      gridGenerate(Number(NEWCOPY));
    }
    else {
      gridGenerate(Number(STYLECOPY));
    }
  }

  // Callback function for creating event listener for black mouse trail
  function cursorBlack() {
    const cells = document.querySelectorAll('div.cell');
    cells.forEach((square) => {
      square.addEventListener('mouseenter', e => {
        e.target.style.backgroundColor = 'black';
      })
    });
  }

  // Callback function for creating event listener for rainbow mouse trail
  function cursorRainbow() {
    const COLORWHEEL = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'violet', 'pink'];
    const cells = document.querySelectorAll('div.cell');
    cells.forEach((square) => {
      square.addEventListener('mouseenter', e => {
        e.target.style.backgroundColor = COLORWHEEL[Math.round(Math.random() * (COLORWHEEL.length))];
      })
    });
  }

  // Callback function for creating event listener for white mouse trail
  function cursorWhite() {
    const cells = document.querySelectorAll('div.cell');
    cells.forEach((square) => {
      square.addEventListener('mouseenter', e => {
        e.target.style.backgroundColor = 'whitesmoke';
      })
    });
  }

  // Callback function for creating event listener for transparent mouse trail
  function cursorHSL() {
    const INCREMENT_VALUE = 0.1;
    const cells = document.querySelectorAll('div.cell');
    cells.forEach((square) => {
      let alphaCounter = 1;
      square.addEventListener('mouseenter', e => {
        e.target.style.backgroundColor = `rgba(0, 0, 0, ${(alphaCounter) * INCREMENT_VALUE})`;
        if (alphaCounter < 11) {
          alphaCounter++;
        }
      })
    });
  }

  const SIZE_BTN = document.querySelector('button.size');
  SIZE_BTN.addEventListener('click', changeSize);

  const CLEAR_BTN = document.querySelector('button.clear');
  CLEAR_BTN.addEventListener('click', clearCreate);

  const COLOR_BTN = document.querySelector('button.color');
  COLOR_BTN.addEventListener('click', changeColor);

  let gridGenerate = (size) => {
    for (let i = 1; i <= size; i++) {
      for (let j = 0; j < size; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        SKETCH_REF.appendChild(cell);
      }
    }
    const COLOR_REF = CURRENT_COLOR;
    if (COLOR_REF === COLOR_INDEX[0]) {
      cursorBlack();
    }
    else if (COLOR_REF === COLOR_INDEX[1]) {
      cursorRainbow();
    }
    else if (COLOR_REF === COLOR_INDEX[2]) {
      cursorWhite();
    }
    else if (COLOR_REF === COLOR_INDEX[3]) {
      cursorHSL();
    }
  }

  gridGenerate(16);
}

display();