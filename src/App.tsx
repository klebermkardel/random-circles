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
    {clickedPoints.map(() => {
      return <div className='circlePoint'>0</div>
    })}
  </div>
}

export default App
