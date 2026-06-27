import { useState } from 'react'
import './App.css'

function App() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  /**
 * Handles the input value change event.
 * @param {React.ChangeEvent<HTMLInputElement>} event - The React change event object.
 */
  function handleCLick(event) {
    const frame = document.getElementById("picture-frame").getBoundingClientRect();
    const marker = document.getElementById("marker");
    var spotX = event.pageX - frame.x;
    var spotY = event.pageY - frame.y;
    console.log(frame)
    console.log(spotX, spotY)
    setCoords({ x: spotX-12.5, y: spotY-12.5 });
  }

  return (
    <>
      <div className='content'>
        <div onClick={handleCLick} id='picture-frame' className="picture">
          <div style={{left:coords.x, top:coords.y}} id='marker' className="marker"></div>
          <img src="/picture1.jpeg" alt="" />
        </div>
      </div>
    </>
  )
}

export default App
