import { useState } from 'react'
import './App.css'

function App() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const box = { tlx: 200, tly: 200, brx: 300, bry: 300 };

  // box.style.left = box.tlx;
  // box.style.top = box.tly;
  // box.style.width = box.brx - box.tlx;
  // box.style.heigth = box.bry - box.tly;
  /**
 * Handles the input value change event.
 * @param {React.ChangeEvent<HTMLInputElement>} event - The React change event object.
 */
  function handleCLick(event) {
    const frame = document.getElementById("picture-frame").getBoundingClientRect();
    const marker = document.getElementById("marker");

    const clickX = event.clientX - frame.x;
    const clickY = event.clientY - frame.y;
    const centerX = clickX - 12.5;
    const centerY = clickY - 12.5;
    console.log(frame)
    console.log(centerX, centerY)
    setCoords({ x: centerX, y: centerY });
    if (box.tlx <= clickX && clickX <= box.brx && box.tly <= clickY && clickY <= box.bry) {
      console.log("inside")
    } else {
      console.log("outside")
    }
  }

  return (
    <>
      <div className='content'>
        <div onClick={handleCLick} id='picture-frame' className="picture">
          <div style={{ left: coords.x, top: coords.y }} id='marker' className="marker"></div>
          <div id='box' className="box" style={{
            left: box.tlx, top: box.tly,
            width: box.brx - box.tlx, height: box.bry - box.tly
          }}></div>
          <img src="/picture1.jpeg" alt="" />
        </div>
      </div>
    </>
  )
}

export default App
