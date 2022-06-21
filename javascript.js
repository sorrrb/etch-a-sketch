let display = () => {
  const DEFAULT = 16;
  const MAX_WIDTH = 720;

  // Create div in memory, add container class, append to body
  const newContainer = document.createElement('div');
  newContainer.classList.add('container');
  document.body.appendChild(newContainer);

  // Get reference to container
  // Get reference to parent of container
  // Create button in memory, add text, style button, insert button in parent before container
  const containerNode = document.querySelector('div.container');
  const pageNode = containerNode.parentNode;
  const dimensionsBtn = document.createElement('button');
  dimensionsBtn.textContent = `Change Size`;
  const btnStyle = dimensionsBtn.style;
  btnStyle.cssText = `background-color: black; color: rgb(240, 234, 214); border: 2px solid rgb(240, 234, 214); padding: 8px 32px; border-radius: 16px;`;
  pageNode.insertBefore(dimensionsBtn, containerNode);

  const titleStyle = (document.querySelector('h1')).style;
  titleStyle.cssText = `color: rgb(240, 234, 214); border-top: 2px solid rgb(240, 234, 214); border-bottom: 2px solid rgb(240, 234, 214); padding: 16px;`

  // Add event listener to button for changing grid dimensions
  dimensionsBtn.addEventListener('click', defineSize);

  // Define default style for grid

  containerNode.style.cssText = createArea(DEFAULT);

  // Node Style Helper Functions

  function createSq(cntX, cntY) {
    return `grid-area: ${cntY} / ${cntX} / ${cntY + 1} / ${cntX + 1};`;
  }

  function createArea(sideLength) {
    return `display: grid; grid-template-columns: repeat(${sideLength}, ${MAX_WIDTH / sideLength}px [col-start]); grid-template-rows: repeat(${sideLength}, ${MAX_WIDTH / sideLength}px [row-start]);`
  }

  // Event Listener Helper Functions

  function styleBackground(e) {
    e.target.classList.add('hover');
  }

  function defineSize() {
    const input = prompt(`Please enter grid dimensions:`)
    if (input === null) return;
    const inputNum = Number(input);
    if ((inputNum > 100) || (inputNum < 1)) {
      alert('Error! Grid dimension boundaries exceeded - please enter a number between 1-100.');
      defineSize();
    }
    else if ((inputNum <= 100) || (inputNum >= 1)){
      containerNode.replaceChildren();
      containerNode.style.cssText = createArea(inputNum);
      generateGrid(input);
    }
  }

  // Function to generate Grid

  let generateGrid = size => {
    for (let i = 1; i <= size; i++) {
      for (let j = 1; j <= size; j++) {
        const cell = document.createElement('div');
        cell.style.cssText = createSq(j,i);
        cell.classList.add(`cell`);
        containerNode.appendChild(cell);
      }
    }
    const squares = document.querySelectorAll('div.cell');
    squares.forEach((cell) => {
      cell.addEventListener('mouseenter', styleBackground);
    });
  }

  generateGrid(DEFAULT);
}

display();