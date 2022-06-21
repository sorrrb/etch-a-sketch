let display = () => {
  const WINDOW_SIZE = 600;
  const DEFAULT_LENGTH = 16;

  const SKETCH_PAD_REF = document.querySelector('div.sketch'); // Grab container reference
  const SKETCH_PAD_STYLE = SKETCH_PAD_REF.style; // Grab reference style object
  SKETCH_PAD_STYLE.cssText = calcDimensions(DEFAULT_LENGTH); // Generate grid using helper function
  
  // Helper function to determine grid size based off WINDOW_SIZE const & given length/width value
  function calcDimensions(squares) {
    const output = WINDOW_SIZE / squares;
    return `display: grid; grid-template-columns: repeat(${squares}, ${output}px); grid-template-rows: repeat(${squares}, ${output}px)`;
  }

  // Named callback function for tracking event listener
  function colorBlack(e) {
    e.target.style['background-color'] = 'black';
  }

  // Named callback function for clearing grid
  let clearGrid = () => {
    SKETCH_PAD_REF.replaceChildren();
    generateGrid(DEFAULT_LENGTH);
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
      cell.addEventListener('mouseenter', colorBlack); // add event tracking listener
    });
  }

  const SIZE_BTN = document.querySelector('button.size');

  const CLEAR_BTN = document.querySelector('button.clear');
  CLEAR_BTN.addEventListener('click', clearGrid);

  generateGrid(DEFAULT_LENGTH);
}

display();