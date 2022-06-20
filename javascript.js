let display = () => {
  const GRID_DIMENSION = 16;
  const containerRef = document.querySelector('div.container');
  containerRef.classList.add('grid-template');

  // General Helper Functions

  function createSq(cntX, cntY) {
    return `grid-area: ${cntY} / ${cntX} / ${cntY + 1} / ${cntX + 1};`;
  }

  // Event Listener Helper Functions

  function styleBackground(e) {
    e.target.classList.add('hover');
  }

  // Function to generate Grid

  let defineGrid = () => {
    for (let i = 1; i <= GRID_DIMENSION; i++) {
      for (let j = 1; j <= GRID_DIMENSION; j++) {
        const cell = document.createElement('div');
        cell.style.cssText = createSq(j,i);
        cell.classList.add(`cell`);
        containerRef.appendChild(cell);
      }
    }
    const squares = document.querySelectorAll('div.cell');
    squares.forEach((cell) => {
      cell.addEventListener('mouseenter', styleBackground);
    });
  }

  defineGrid();
}

display();