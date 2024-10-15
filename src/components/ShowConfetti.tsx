import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'

function ShowConfetti ({ textEndGame }: { textEndGame: 'YOU WIN' | 'GAME OVER' | null }) {
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
    </>
  )
}
export default ShowConfetti
