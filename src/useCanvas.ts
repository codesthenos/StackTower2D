import { useEffect, useRef } from 'react'
import type { box } from './types.d.ts'
import { INITIAL_BOX, INITIAL_X_SPEED, MODE } from './constants.ts'
import { addBox, manageDirection } from './gameLogic.ts'

function useCanvas (draw: ({ context, boxes, mode }: { context: CanvasRenderingContext2D, boxes: box[], mode: MODE }) => void) {

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

      //Start Gameloop
      if (modeRef.current === MODE.BOUNCE) {
        speedRef.current = manageDirection(speedRef.current, boxesRef.current, currentRef.current)
        boxesRef.current[currentRef.current].x += speedRef.current
      } else if (modeRef.current === MODE.STOP) {
        const newBox = addBox(boxesRef.current, currentRef.current)
        boxesRef.current = [...boxesRef.current, newBox]
        modeRef.current = MODE.BOUNCE
        currentRef.current++
        speedRef.current += speedRef.current > 0 ? 1 : -1
      }
      draw({ context, boxes: boxesRef.current, mode: modeRef.current })
      frameIdRef.current = window.requestAnimationFrame(gameloop)
    }
    gameloop()
    
    function handleInput () {
      if (modeRef.current === MODE.BOUNCE) modeRef.current = MODE.STOP
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
