import React, { useState } from 'react'
import './App.css'

interface ClickedProps {
  clientX: number
  clientY: number
}

function App() {
  const [clickedPoints, setClickedPoints] = useState<ClickedProps[]>([])

  function getCoordinates(e: React.MouseEvent<HTMLElement>) {
    const { clientX, clientY } = e

    setClickedPoints([...clickedPoints, { clientX, clientY }])
  }

  return <div className='App' onClick={getCoordinates}>
    {clickedPoints.map((clickedPoint) => {
      return <div style={{
        left: clickedPoint.clientX - 7, 
        top: clickedPoint.clientY - 7,
        position: 'absolute',
        borderRadius: '50%',
        background: 'blue',
        width: '20px',
        height: '20px'}}
        ></div>
    })}
  </div>
}

export default App
