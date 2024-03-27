import { useRef, useEffect } from 'react';

export default function YourComponent() {
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      const grid = gridRef.current;
      const firstRow = grid.children[0];
      const secondRow = grid.children[5]; // adjust this to target the correct grid item
      const thirdRow = grid.children[10]; // adjust this to target the correct grid item
      const firstColumn = grid.children[0];
      const secondColumn = grid.children[1]; // adjust this to target the correct grid item
      const fourthColumn = grid.children[3]; // adjust this to target the correct grid item

      const top = secondRow.offsetTop - grid.offsetTop;
      const left = secondColumn.offsetLeft - grid.offsetLeft;
      const width = (fourthColumn.offsetLeft + fourthColumn.offsetWidth) - secondColumn.offsetLeft;
      const height = (thirdRow.offsetTop + thirdRow.offsetHeight) - secondRow.offsetTop;

      const pseudoElement = document.createElement('div');
      pseudoElement.style.position = 'absolute';
      pseudoElement.style.top = `${top}px`;
      pseudoElement.style.left = `${left}px`;
      pseudoElement.style.width = `${width}px`;
      pseudoElement.style.height = `${height}px`;
      pseudoElement.style.border = '3px solid darkcyan';

      grid.appendChild(pseudoElement);
    }
  }, []);

  return (
    <div ref={gridRef} className="gridContainer">
      {/* your grid items here */}
    </div>
  );
}