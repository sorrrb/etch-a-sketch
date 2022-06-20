let display = () => {
  const STATIC_COUNT = 1;
  const GRID_DIMENSION = 16;
  const containerRef = document.querySelector('div.container');
  containerRef.classList.add('grid-template');

  let defineGrid = () => {
    for (let i = 1; i <= GRID_DIMENSION; i++) {
      for (let j = 1; j <= GRID_DIMENSION; j++) {
        const cell = document.createElement('div');
        cell.style.cssText = createSq(j,i);
        containerRef.appendChild(cell);
      }
    }
  }

  function createSq(cntX, cntY) {
    return `grid-area: ${cntY} / ${cntX} / ${cntY + 1} / ${cntX + 1};`
  }

  defineGrid();
}

display();