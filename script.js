const gridDisplay = (() => {
  const gridContainer = document.querySelector('div.grid');
  let gridLength = 16; // Number of grid squares per side
  let activeColor = '#000000';
  let isRainbow = false;
  let isOpaque = false;

  let generateGrid = () => {
    const temp = window.getComputedStyle(gridContainer).height;
    const endNumIndex = temp.indexOf('p');
    const sizeRef = Number(temp.substring(0, endNumIndex));
    const dimensionsRef = sizeRef / gridLength;
    const gridArea = gridLength ** 2;

    for (let i = 0; i < gridArea; i++) {
      gridContainer.style.gridTemplateColumns = `repeat(${gridLength}, 1fr`;
      const sketchSquare = document.createElement('div');
      sketchSquare.classList.add('sketch-square');
      sketchSquare.style.width = `${dimensionsRef}px`;
      gridContainer.appendChild(sketchSquare);
    }
  }

  let emptyGrid = () => {
    while (gridContainer.firstChild) {
      gridContainer.removeChild(gridContainer.firstChild);
    }
  }

  let getActiveColor = () => activeColor;

  let setRainbow = () => {
    isRainbow = true;
    isOpaque = false;
    gridController.adjustColorListener();
  }

  let getMode = () => {
    if (isRainbow) return 'Rainbow';
    else if (isOpaque) return 'Opaque';
    else return false;
  }

  let generateRainbow = () => {
    let totalChars = 'ABCDEF1234567890';
    let newHex = '#';
    for (let i = 0; i < 6; i++) {
      let randomIndex = totalChars[Math.floor(Math.random() * totalChars.length)];
      newHex += randomIndex;
    }
    return newHex;
  }

  let updateColor = hex => {
    isRainbow = false;
    isOpaque = false;
    activeColor = hex;
    gridController.adjustColorListener();
  }

  let adjustLength = num => {
    const sizeLabel = (document.querySelector('input#resize')).nextElementSibling;
    gridLength = num;
    sizeLabel.textContent = `${num} x ${num}`;
  }

  generateGrid();

  return { gridContainer, getActiveColor, setRainbow, getMode, generateRainbow, generateGrid, emptyGrid, updateColor, adjustLength };
})();

const gridController = (() => {
  gridDisplay.gridContainer.addEventListener('mousedown', sketchCallback);
  gridDisplay.gridContainer.addEventListener('mouseup', removeCellListeners);

  let adjustColorListener = () => {
    gridDisplay.gridContainer.removeEventListener('mousedown', sketchCallback);
    gridDisplay.gridContainer.removeEventListener('mouseup', removeCellListeners);

    gridDisplay.gridContainer.addEventListener('mousedown', sketchCallback);
    gridDisplay.gridContainer.addEventListener('mouseup', removeCellListeners);
  }

  function removeCellListeners() {
    const cellNodes = document.querySelectorAll('div.sketch-square')
    cellNodes.forEach((cell) => {
      cell.removeEventListener('mouseover', updateBoard);
    });
  }

  function sketchCallback(e) {
    if (gridDisplay.getMode() === 'Rainbow') {
      e.target.style.backgroundColor = gridDisplay.generateRainbow();
      const cellNodes = document.querySelectorAll('div.sketch-square')
      cellNodes.forEach((cell) => {
        cell.addEventListener('mouseover', updateBoard);
      });
    }
    else if (gridDisplay.getMode() === 'Opaque') {
      return;
    }
    else {
      e.target.style.backgroundColor = gridDisplay.getActiveColor();
      const cellNodes = document.querySelectorAll('div.sketch-square')
      cellNodes.forEach((cell) => {
        cell.addEventListener('mouseover', updateBoard);
      });
    }
  }

  function updateBoard(e) {
    if (gridDisplay.getMode() === 'Rainbow') e.target.style.backgroundColor = gridDisplay.generateRainbow();
    else {
      e.target.style.backgroundColor = gridDisplay.getActiveColor();
    }
  }

  const recolorTab = document.querySelector('input#recolor');
  recolorTab.addEventListener('change', e => {
    gridDisplay.updateColor(e.target.value);
  })

  const rainbowBtn = document.querySelector('button.rainbow');
  rainbowBtn.addEventListener('click', e => {
    gridDisplay.setRainbow();
  });

  const opaqueBtn = document.querySelector('button.opaque');

  const resizeSlider = document.querySelector('input#resize');
  resizeSlider.addEventListener('change', resizeBoard);

  function resizeBoard(e) {
    gridDisplay.emptyGrid();
    switch(Number(e.target.value)) {
      case 1:
        gridDisplay.adjustLength(1);
        break;
      case 2:
        gridDisplay.adjustLength(2);
        break;
      case 3:
        gridDisplay.adjustLength(4);
        break;
      case 4:
        gridDisplay.adjustLength(8);
        break;
      case 5:
        gridDisplay.adjustLength(16);
        break;
      case 6:
        gridDisplay.adjustLength(32);
        break;
      case 7:
        gridDisplay.adjustLength(64);
        break;
      case 8:
        gridDisplay.adjustLength(96);
        break;
      case 9:
        gridDisplay.adjustLength(128);
        break;
    }
    gridDisplay.generateGrid();
  }

  const resetBtn = document.querySelector('button.reset');
  resetBtn.addEventListener('click', resetBoard);

  function resetBoard() {
    const cellNodes = document.querySelectorAll('div.sketch-square')
    cellNodes.forEach((cell) => {
      cell.style.backgroundColor = 'var(--color-white)';
    });
  }

  return { resizeSlider, adjustColorListener };
})();