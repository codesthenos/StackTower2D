//Constants
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants.ts'
//Draw Function
import draw from './canvasDraw.ts'
//Custom hook
import useCanvas from './useCanvas.ts'
//Confetti
import Confetti from 'react-confetti'
import { useEffect, useState } from 'react'

function Canvas () {
  const { canvasRef, score, textEndGame } = useCanvas(draw)
  const [showConfetti, setShowConfetti] = useState(false)
  useEffect(() => {
    if (textEndGame === 'YOU WIN') {
      setShowConfetti(true)
    } else {
      setShowConfetti(false)
    }
  }, [textEndGame])
  
  return (
    <>
      {showConfetti && <Confetti />}
      {score > 0 && <span>Score: {score}</span>}
      {textEndGame && <span>{textEndGame}</span>}
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></canvas>
    </>
  )
}

export default Canvas
