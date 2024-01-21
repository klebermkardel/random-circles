import React, { useState } from 'react';
import './App.css';

interface ClickedProps {
  clientX: number;
  clientY: number;
  size: number;
  color: string;
}

function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomSize(): number {
  return Math.floor(Math.random() * 20) + 10; // Tamanho aleatório entre 10 e 30 pixels
}

function App() {
  const [clickedPoints, setClickedPoints] = useState<ClickedProps[]>([]);

  function getCoordinates(e: React.MouseEvent<HTMLElement>) {
    const { clientX, clientY } = e;

    const newClickedPoint: ClickedProps = {
      clientX,
      clientY,
      size: getRandomSize(),
      color: getRandomColor(),
    };

    setClickedPoints([...clickedPoints, newClickedPoint]);
  }

  function handleUndo() {
    const newClickedPoint = [...clickedPoints]
    newClickedPoint.pop()
    setClickedPoints(newClickedPoint)
  }

  return (
    <>
    <button onClick={handleUndo}>Desfazer</button>
    <div className='App' onClick={getCoordinates}>
      {clickedPoints.map((clickedPoint, index) => (
        <div
          key={index}
          style={{
            left: clickedPoint.clientX - clickedPoint.size / 2,
            top: clickedPoint.clientY - clickedPoint.size / 2,
            position: 'absolute',
            borderRadius: '50%',
            background: clickedPoint.color,
            width: `${clickedPoint.size}px`,
            height: `${clickedPoint.size}px`,
            opacity: '50%'
          }}
        ></div>
      ))}
    </div>
    </>
  );
}

export default App;
