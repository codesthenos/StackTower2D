import { BOX_HEIGHT, CANVAS_WIDTH, INITIAL_BOX_X } from './constants'
import type { box } from './types'

function getColor () {
  const red = Math.floor(Math.random() * 255)
  const green = Math.floor(Math.random() * 255)
  const blue = Math.floor(Math.random() * 255)

  return `rgb(${red}, ${green}, ${blue})`
}

function getWidth (boxesRef: box[], currentRef: number) {
  const currentBox = boxesRef[currentRef]

  if (currentRef === 0) return currentBox.width

  const previousBox = boxesRef[currentRef - 1]

  const overlapStart = Math.max(previousBox.x, currentBox.x)
  const overlapEnd = Math.min(previousBox.x + previousBox.width, currentBox.x + currentBox.width)
  
  return overlapEnd > overlapStart ? overlapEnd - overlapStart : 0
}

export function addBox (boxesRef: box[], currentRef: number) {
  const newBox = {
    x: INITIAL_BOX_X,
    y: boxesRef[currentRef].y + BOX_HEIGHT,
    width: getWidth(boxesRef, currentRef),
    color: getColor()
  }
  return newBox
}

export function manageDirection (speedRef: number, boxesRef: box[], currentRef: number) {
  if ((speedRef > 0 && boxesRef[currentRef].x > CANVAS_WIDTH - 50) || (speedRef < 0 && boxesRef[currentRef].x < -50) ) {
    return -speedRef
  } else {
    return speedRef
  }
}
