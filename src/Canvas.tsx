//Constants
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants.ts'
//Draw Function
import draw from './canvasDraw.ts'
//Custom hook
import useCanvas from './useCanvas.ts'

function Canvas () {
  const { canvasRef, spanRef, score } = useCanvas(draw)
  const text = score < 1201 ? '' : 'YOU WIN'
  
  return (
    <>
      <span ref={spanRef}>Score: {score}</span>
      {text && <span>{text}</span>}
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></canvas>
    </>
  )
}

export default Canvas
