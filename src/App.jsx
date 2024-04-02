import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [characters, setCharacters] = useState('')
  const [typing, setTyping] = useState(0)
  const [words, setWords] = useState('0')
  const textAreaRef = useRef(null);
  const [timer, setTimer] = useState(0);

  function handleStart() {
    setTyping(e => !e)
    setCharacters('')
    setTimer(0); 
    textAreaRef.current.value=''
  }

  useEffect(() => {
    let interval;
    if (typing) {
      interval = setInterval(() => {
        setTimer(prevTime => prevTime + 1);
        if (timer === 60) {
          clearInterval(interval);
          setTyping(false);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [typing, timer]);

useEffect(() => {
  let words
  characters==''?words='0':words=characters.trim().replace(/ +/g, ' ').split(' ').length
  setWords(words)
}, [typing])


  
  useEffect(() => {
    if (typing) {
      var time = setTimeout(() => {
        setTyping(false)
        setWords('0')
      }, 60000);
    } else {
      console.log('typing stop..')
      return
    }

    return () => {
      clearTimeout(time)
    }
  }, [typing,words])


  return (
    <>
      <div className='container'>
        <h1>Typing Test !!!</h1>
        <textarea name="textarea" placeholder='Type..' cols="60" rows="10" onChange={(e) => setCharacters(e.target.value)} ref={textAreaRef}></textarea> <br />
        <button onClick={() => handleStart()} className={typing ? 'red' : 'green'}>{typing ? 'stop' : 'start'}</button>
        <p>{words!='0' ? `Words: ${words} /min` : ''}</p>
        <p>Timer: {timer}s</p>
      </div>
    </>
  )
}

export default App
