import './App.css'

function App() {
  function getCoordinates(e: React.MouseEvent<HTMLElement>) {
    console.log(e)
  }

  return <div className='App' onClick={getCoordinates}></div>
}

export default App
