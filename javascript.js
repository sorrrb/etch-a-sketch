let display = () => {
  const WINDOW_SIZE = 700;
  const DEFAULT_GRID_LENGTH = 16;
  const LENGTHS_ARRAY = [1, 2, 4, 8, 16, 32, 64, 100];
  const DEFAULT_LENGTH_INDEX = LENGTHS_ARRAY[(LENGTHS_ARRAY.indexOf(DEFAULT_GRID_LENGTH))];
  const DEFAULT_COLOR = 'black';
  const COLOR_MODES = ['black', 'rainbow', 'grayscale'];

  let CURRENT_COLOR = DEFAULT_COLOR;

  let CURRENT_LENGTH_INDEX = LENGTHS_ARRAY.indexOf(DEFAULT_GRID_LENGTH);

  const SKETCH_PAD_REF = document.querySelector('div.sketch'); // Grab container reference
  SKETCH_PAD_REF.classList.add('black');
  const CLASS_LIST = SKETCH_PAD_REF.getAttribute('class'); // Create reference to class list
  const SKETCH_PAD_STYLE = SKETCH_PAD_REF.style; // Grab reference style object
  SKETCH_PAD_STYLE.cssText = calcDimensions(LENGTHS_ARRAY); // Generate grid using helper function
  
  // Helper function to determine grid size based off WINDOW_SIZE const & given length/width value
  function calcDimensions(squares) {
    const output = WINDOW_SIZE / squares;
    return `display: grid; grid-template-columns: repeat(${squares}, ${output}px); grid-template-rows: repeat(${squares}, ${output}px)`;
  }

  // Named callback function for tracking event listener
  function fillColor(e) {
    e.target.style.backgroundColor = CURRENT_COLOR;
  }

  // Named callback function for clearing grid
  let clearGrid = () => {
    SKETCH_PAD_REF.replaceChildren();
    generateGrid(LENGTHS_ARRAY[CURRENT_LENGTH_INDEX]);
  }

  // Named callback function for cycling sketchpad dimensions
  let cycleSize = () => {
    SKETCH_PAD_REF.replaceChildren();
    const LENGTH_REF = ++CURRENT_LENGTH_INDEX;
    CURRENT_LENGTH_INDEX = LENGTH_REF;
    if (CURRENT_LENGTH_INDEX < LENGTHS_ARRAY.length) {
      generateGrid(LENGTHS_ARRAY[CURRENT_LENGTH_INDEX]);
    }
    else {
      CURRENT_LENGTH_INDEX = 0;
      generateGrid(LENGTHS_ARRAY[CURRENT_LENGTH_INDEX]);
    }
  }

  // Helper function to generate random hexadecimal color codes
  function generateColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  // Named callback function for toggling color mode
  let toggleColor = () => {
    //
  }

  // Grid initialization function
  let generateGrid = size => {
    SKETCH_PAD_STYLE.cssText = calcDimensions(size);
    for (let i = 1; i <= size; i++) {
      for (let j = 1; j <= size; j++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.style.cssText = `grid-area: ${i} / ${j} / ${i + 1} / ${j + 1};`;
        SKETCH_PAD_REF.appendChild(cell);
      }
    }
    const CELLS = document.querySelectorAll('div.grid-cell');
    CELLS.forEach((cell) => { // iterate through each cell
      cell.addEventListener('mouseenter', fillColor); // add event tracking listener
    });
  }

  const SIZE_BTN = document.querySelector('button.size');
  SIZE_BTN.addEventListener('click', cycleSize);

  const COLOR_BTN = document.querySelector('button.color');
  COLOR_BTN.addEventListener('click', toggleColor);

  const CLEAR_BTN = document.querySelector('button.clear');
  CLEAR_BTN.addEventListener('click', clearGrid);

  generateGrid(DEFAULT_LENGTH_INDEX);
}

display();