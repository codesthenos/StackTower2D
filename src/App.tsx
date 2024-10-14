//Draw Function
import draw from './canvasDraw.ts'
//Custom hook
import useCanvas from './useCanvas.ts'
//Components
import ShowConfetti from './ShowConfetti.tsx'
import Score from './Score.tsx'
import TextEndGame from './TextEndGame.tsx'
import Canvas from './Canvas.tsx'

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
