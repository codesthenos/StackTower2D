import { useEffect, useRef } from 'react'
import type { box } from './types.d.ts'
import { BACKGROUD_COLOR, CANVAS_HEIGHT, GAMEOVER_COLOR, INITIAL_BOX, INITIAL_X_SPEED, MODE, WIN_COLOR } from './constants.ts'
import { addBox, manageDirection } from './gameLogic.ts'
import { drawBackground } from './canvasDraw.ts'

function useCanvas (draw: ({ context, boxes, mode, color }: { context: CanvasRenderingContext2D, boxes: box[], mode: MODE, color: string }) => void) {

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const frameIdRef = useRef(0)
  const speedRef = useRef(INITIAL_X_SPEED)
  const boxesRef = useRef<box[]>([INITIAL_BOX])
  const modeRef = useRef<MODE>(MODE.BOUNCE)
  const currentRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')

    function gameloop () {
      if (!context) return

      function chooseMode (newBox: box) {
        if (newBox.width === 0) return MODE.GAMEOVER
        else {
          if (boxesRef.current[currentRef.current].y === CANVAS_HEIGHT) return MODE.WIN
        }
        return MODE.BOUNCE
      }

      if (modeRef.current === MODE.BOUNCE) {
        speedRef.current = manageDirection(speedRef.current, boxesRef.current, currentRef.current)
        boxesRef.current[currentRef.current].x += speedRef.current

      } else if (modeRef.current === MODE.STOP) {
        const newBox = addBox(boxesRef.current, currentRef.current)
        modeRef.current = chooseMode(newBox)
        boxesRef.current = [...boxesRef.current, newBox]
        currentRef.current++
        speedRef.current += speedRef.current > 0 ? 1 : -1

      } else if (modeRef.current === MODE.GAMEOVER) {
        drawBackground({ context, color: GAMEOVER_COLOR })
        return

      } else if (modeRef.current === MODE.WIN) {
        drawBackground({ context, color: WIN_COLOR })
        return
      }

      draw({ context, boxes: boxesRef.current, mode: modeRef.current, color: BACKGROUD_COLOR })
      console.log(frameIdRef)
      frameIdRef.current = window.requestAnimationFrame(gameloop)
    }
    gameloop()
    
    function handleInput () {
      if (modeRef.current === MODE.BOUNCE) modeRef.current = MODE.STOP
      else if (modeRef.current === MODE.GAMEOVER || MODE.WIN) {
        speedRef.current = INITIAL_X_SPEED
        boxesRef.current = [INITIAL_BOX]
        modeRef.current = MODE.BOUNCE
        currentRef.current = 0
        gameloop()
      }
    }

    canvas.addEventListener('pointerdown', handleInput)
    document.addEventListener('keydown', (event) => {
      if (event.key === ' ') {
        handleInput()
      }
    })
    
    return () => {
      canvas.removeEventListener('pointerdown', handleInput)
      document.removeEventListener('keydown', handleInput)
      window.cancelAnimationFrame(frameIdRef.current)
    }
  }, [draw])

  return { canvasRef }
}
export default useCanvas
