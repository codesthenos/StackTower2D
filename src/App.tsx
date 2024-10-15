//Draw Function
import draw from './utilities/canvasDraw.ts'
//Custom hook
import useCanvas from './hooks/useCanvas.ts'
//Components
import ShowConfetti from './components/ShowConfetti.tsx'
import Score from './components/Score.tsx'
import TextEndGame from './components/TextEndGame.tsx'
import Canvas from './components/Canvas.tsx'

function App () {
  const { canvasRef, score, textEndGame } = useCanvas(draw)
  
  return (
    <>
      <ShowConfetti textEndGame={textEndGame} />
      <Score score={score} />
      <TextEndGame textEndGame={textEndGame} />
      <Canvas canvasRef={canvasRef} />
    </>
  )
}

export default App
