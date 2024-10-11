import { INITIAL_X_SPEED } from './constants.ts'

function Aside () {
  return (
    <aside>
      <div className="score">
        <h2>SCORE</h2>
        <span>xSpeed = {INITIAL_X_SPEED}</span>
      </div>
      <button onClick={() => {}}>ReStart</button>
    </aside>
  )
}
export default Aside
