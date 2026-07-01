import { useEffect, useRef, useState } from 'react'
import './App.css'
import { saveOnLeaderboard, sendHit, startGame } from './api/requests';
import { useParams } from 'react-router';

function BoardPage() {
  const { mapId } = useParams();
  const [started, setStarted] = useState(false);
  const [coords, setCoords] = useState({ x: -1000, y: -1000 });
  const [running, setRunning] = useState(false);
  const [counter, setCounter] = useState(0);
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState('');
  // const box = { tlx: 498, tly: 222, brx: 511, bry: 243 };
  const [boxes, setBoxes] = useState([
    { id: 0, name: "Waldo", found: false, tlx: 498, tly: 222, brx: 511, bry: 243 },
    { id: 1, name: "Wenda", found: false, tlx: 624, tly: 240, brx: 633, bry: 253 },
    { id: 2, name: "Woof", found: false, tlx: 550, tly: 221, brx: 558, bry: 228 },
    { id: 3, name: "Wizard", found: false, tlx: 220, tly: 206, brx: 233, bry: 225 },
    { id: 4, name: "Odlaw", found: false, tlx: 92, tly: 208, brx: 102, bry: 229 },
  ]);

  useEffect(() => {
    const allFound = boxes.every((box) => box.found);
    if (allFound) alert("You won")
  }, [boxes])

  const huntStatus = <ul className='hunt-status-ul'>
    {boxes.map((box) => <li key={box.id} className='hunt-status-li'>
      <span>{box.name}: {box.found ? "Found" : "Not found"}</span>
    </li>)}
  </ul>

  const names = boxes.map((box) => {
    return { id: box.id, name: box.name };
  });

  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState([0, 0]) // State to save the position where you clicked

  // const handleClick = (event) => {
  //   setIsVisible(current => !current)
  //   setPosition([event.pageX, event.pageY]) // Save the pos where you clicked
  // }

  /**
 * Handles the input value change event.
 * @param {React.ChangeEvent<HTMLInputElement>} event - The React change event object.
 */
  function handleCLick(event) {
    const frame = document.getElementById("picture-frame").getBoundingClientRect();
    const marker = document.getElementById("marker");
    // const boxlimit = document.getElementById("box");
    console.log(event.target)
    const clickX = event.clientX - frame.x;
    const clickY = event.clientY - frame.y;
    const centerX = clickX - 12.5;
    const centerY = clickY - 12.5;
    // console.log(frame)
    // console.log(clickX, clickY)

    if (!isVisible)
      setCoords({ x: clickX, y: clickY });
    // if (box.tlx <= clickX && clickX <= box.brx && box.tly <= clickY && clickY <= box.bry) {
    //   console.log("inside")
    // } else {
    //   console.log("outside")
    // }
    setIsVisible(current => !current)
    setPosition([centerX, centerY]) // Save the pos where you clicked
  }

  function handleClickMenu(event) {
    event.stopPropagation();
    setIsVisible(false)
  }

  async function checkChoice(id) {
    const selected = boxes.find((box) => box.id == id);
    const result = await sendHit(coords, selected.name);
    if (result && result.hit) {
      console.log("outside")

      localStorage.setItem("token", result.token);
      const newBoxes = boxes.map((box) => {
        if (box.id == selected.id) {
          return { ...selected, found: true };
        }
        return box;
      });
      setBoxes(newBoxes);
      if (result.finished) {
        setRunning(false)
        setModal(true)
      }
    } else {
      console.log("outside")
    }
    console.log(result)
    // if (selected.tlx <= coords.x && coords.x <= selected.brx && selected.tly <= coords.y && coords.y <= selected.bry) {
    //   console.log("inside");
    //   const newBoxes = boxes.map((box) => {
    //     if (box.id == selected.id) {
    //       return { ...selected, found: true };
    //     }
    //     return box;
    //   });
    //   setBoxes(newBoxes);
    // } else {
    //   console.log("outside")
    // }
  }

  async function handleStartGame() {
    const result = await startGame();
    if (result && result.success) {
      setStarted(true)
      setRunning(true);
      console.log(result)
    }
  }

  async function handleSaveOnLeaderBoard() {
    console.log("called")
    const result = await saveOnLeaderboard(username);
    console.log(result)
  }

  return (
    <>
      <div className='content'>
        {
          started ?
            <><Clock running={running} counter={counter} setCounter={setCounter}></Clock>
              {huntStatus}</>
            : <button onClick={handleStartGame}>Start</button>
        }
        <button
          onClick={() => setModal(true)}
        >
          Open modal
        </button>
        <div onClick={handleCLick} id='picture-frame' className="picture">
          <div style={{ left: coords.x, top: coords.y }} id='marker' className="marker"></div>
          {boxes.map((box) => {
            return (<div key={box.id} className={(box.found ? "found-box" : "box")} style={{
              left: box.tlx, top: box.tly,
              width: box.brx - box.tlx, height: box.bry - box.tly
            }}></div>)
          })}
          {isVisible && (
            <ul className="menu" onClick={handleClickMenu} style={{
              position: "absolute",
              left: position[0],
              top: position[1],
            }}>
              {names.map((name) => {
                return (
                  <li key={name.id} onClick={() => { checkChoice(name.id) }} className="menu-item">{name.name}</li>
                );
              })}
            </ul>
          )}
          <img className={started ? "" : "blur"} src="/picture1.jpeg" alt="" />
        </div>
      </div>
      <Modal
        openModal={modal}
        closeModal={() => setModal(false)}
      >
        <div className="modal-content">
          <p>You found all the characters.</p>
          <p>Elapsed time: {counter}</p>
          <p>Type your username to save on the leaderboard.</p>
          <input type="text" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
          <button onClick={handleSaveOnLeaderBoard}>Save</button>
        </div>
      </Modal>
    </>
  )
}

export default BoardPage


function Clock({ running, counter, setCounter }) {

  useEffect(() => {
    if (running) {
      const key = setInterval(() => {
        setCounter(count => count + 1)
      }, 1000);


      return () => {
        clearInterval(key);
      };
    }
  }, [running])

  return (
    <p>Elapsed time: {counter} seconds</p>
  );
}

// Modal as a separate component

function Modal({ openModal, closeModal, children, time, username, setUsername, handleSaveOnLeaderBoard }) {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog
      ref={ref}
      onCancel={closeModal}
    >
      {children}
      <button onClick={closeModal}>
        Close
      </button>
    </dialog>
  );
}
