import { useEffect, useRef, useState } from 'react'
import './App.css'
import { saveOnLeaderboard, sendHit, startGame } from './api/requests';
import { useParams } from 'react-router';

function BoardPage() {
  const { mapId } = useParams();
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [coords, setCoords] = useState({ x: -1000, y: -1000 });
  const [running, setRunning] = useState(false);
  const [counter, setCounter] = useState(0);
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState([0, 0]) // State to save the position where you clicked
  const [boxes, setBoxes] = useState([
    { id: 0, name: "Waldo", found: false },
    { id: 1, name: "Wenda", found: false },
    { id: 2, name: "Woof", found: false },
    { id: 3, name: "Wizard", found: false },
    { id: 4, name: "Odlaw", found: false },
  ]);

  const huntStatus = <ul className='hunt-status-ul'>
    {boxes.map((box) => <li key={box.id} className='hunt-status-li'>
      <span>{box.name}: {box.found ? "Found" : "Not found"}</span>
    </li>)}
  </ul>

  const names = boxes.map((box) => {
    if (!box.found) return { id: box.id, name: box.name };
    return null;
  }).filter((name) => name != null);

  /**
 * Handles the input value change event.
 * @param {React.ChangeEvent<HTMLInputElement>} event - The React change event object.
 */
  function handleCLick(event) {
    const frame = document.getElementById("picture-frame").getBoundingClientRect();
    const marker = document.getElementById("marker");
    // const boxlimit = document.getElementById("box");
    // console.log(event.target)
    const clickX = event.clientX - frame.x;
    const clickY = event.clientY - frame.y;
    const centerX = clickX - 12.5;
    const centerY = clickY - 12.5;
    // console.log(frame)
    console.log(clickX, clickY)

    if (!isVisible)
      setCoords({ x: clickX, y: clickY });
    // if (box.tlx <= clickX && clickX <= box.brx && box.tly <= clickY && clickY <= box.bry) {
    //   console.log("inside")
    // } else {
    //   console.log("outside")
    // }
    if (names.length > 0)
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
          return { ...selected, found: true, ...result.boundingBox };
        }
        return box;
      });
      setBoxes(newBoxes);
      if (result.finished) {
        setRunning(false);
        setModal(true);
        setFinished(true);
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
    const result = await startGame(mapId);
    if (result && result.success) {
      setStarted(true)
      setRunning(true);
      console.log(result)
    }
  }

  async function handleSaveOnLeaderBoard(e) {
    e.preventDefault();
    const result = await saveOnLeaderboard(username);
    if (result && result.success) {
      setModal(false);
    }
  }

  return (
    <>
      <div className='content'>
        {
          started ?
            <><Clock running={running} counter={counter} setCounter={setCounter}></Clock>
              {huntStatus}</>
            : <button className='start-button' onClick={handleStartGame}>Start</button>
        }
        {/* <button
          onClick={() => setModal(true)}
        >
          Open modal
        </button> */}
        <div onClick={handleCLick} id='picture-frame' className="picture">
          <div style={{ left: coords.x, top: coords.y }} id='marker' className="marker"></div>
          {boxes.map((box) => {
            return (
              box.found ? (<div key={box.id} className="found-box" style={{
                left: box.tlx, top: box.tly,
                width: box.brx - box.tlx, height: box.bry - box.tly
              }}></div>) : null)
          })}
          {isVisible && (
            <ul className="menu" onClick={handleClickMenu} style={{
              position: "absolute",
              left: position[0],
              top: position[1],
            }}>
              {
                names.length > 0 ? (
                  names.map((name) => {
                    return (
                      <li key={name.id} onClick={() => { checkChoice(name.id) }} className="menu-item">{name.name}</li>
                    );
                  })
                ) : (
                  <p>You already found everybody!</p>
                )
              }
            </ul>
          )}
          <img className={started ? "" : "blur"} src={`/picture${mapId}.jpg`} alt="" />
        </div>
      </div>
      <Modal
        openModal={modal}
        closeModal={() => setModal(false)}
      >
        <div className="modal-content">
          <p>You found all the characters!</p>
          <p>Elapsed time: {counter}</p>
          <p>Type your username to save on the leaderboard:</p>
          <div className="dialog-save">
            <form>
              <input type="text" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
              <button type='submit' className='save-button' onClick={(e) => handleSaveOnLeaderBoard(e)}>Save</button>
            </form>
          </div>
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
      className='details-modal'
      ref={ref}
      onCancel={closeModal}
    >
      <button className='close-dialog' onClick={closeModal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z" fill="black" />
        </svg>
      </button>
      {children}
    </dialog>
  );
}
