import React, {useState, useEffect, useRef} from 'react';
import GameBtn from './GameBtn';
import right from '../assets/right.mp3';
import wrong from '../assets/wrong.mp3';
import sound from '../assets/sound.mp3';

const colors =['green', 'red', 'yellow', 'blue']

const SimonGame = () => {

  const [sequence, setSequence] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [playingIdx, setPlayingIdx] = useState(0);

  const greenRef = useRef(null);
  const redRef = useRef(null);
  const yellowRef = useRef(null);
  const blueRef = useRef(null);

  const addNewColor = () => {
    const color = colors[Math.floor(Math.random() * 4)];
    const newSequence = [...sequence, color];
    setSequence(newSequence);
  }

  const handleNextLevel = () => {
    if(!playing) {
      setPlaying(true);
      addNewColor();
    }
  }

  const resetGame = () => {
    setSequence([]);
    setPlaying(false);
    setPlayingIdx(0);
  }

  const handleColorClick = (e) => {
    if(playing) {
      e.target.classList.add('opacity-50');

      setTimeout(() => {
        e.target.classList.remove('opacity-50');

        const clickColor = e.target.getAttribute('color');
        if(sequence[playingIdx] === clickColor ) {
          if(playingIdx === sequence.length - 1) {
            var audio = new Audio(right);
            audio.play();
            setTimeout(() => {
              setPlayingIdx(0);
              addNewColor();
              
            }, 250)
          } else {
            setPlayingIdx(playingIdx + 1)
            var audio = new Audio(right);
            audio.play();
          }
      } else {
        var audio = new Audio(wrong);
        audio.play();
        resetGame();
      }
      }, 250)

      
    }  
  }

  useEffect(() => {
     
    if(sequence.length > 0) {
      const showSequence = (idx = 0) => {
        var audio = new Audio(sound);
        audio.play();

        let ref = null;

        if(sequence[idx] === 'green') ref = greenRef;
        if(sequence[idx] === 'red') ref = redRef;
        if(sequence[idx] === 'yellow') ref = yellowRef;
        if(sequence[idx] === 'blue') ref = blueRef;

        setTimeout(() => {
          ref.current.classList.add('brightness-[2.5]')

          setTimeout(() => {
            ref.current.classList.remove('brightness-[2.5]')
            if (idx < sequence.length - 1) showSequence(idx + 1)
          }, 300)
        }, 300)

      }

      showSequence();
    }
  }, [sequence])

  return (

    <div className='flex justify-center items-center bg-neutral-800 text-white w-screen h-screen'>
      <div className='relative flex flex-col justify-center items-center'>
        <div className='flex '>
          <GameBtn color='green' bg='bg-green-500' border='rounded-tl-full' onClick={handleColorClick} ref={greenRef}/>
          <GameBtn color='red' bg='bg-red-500' border='rounded-tr-full' onClick={handleColorClick} ref={redRef}/>
        </div>
        <div className='flex'>
          <GameBtn color='yellow' bg='bg-yellow-500' border='rounded-bl-full' onClick={handleColorClick} ref={yellowRef}/>
          <GameBtn color='blue' bg='bg-blue-500' border='rounded-br-full' onClick={handleColorClick} ref={blueRef}/>
        </div>
        <button className='absolute bg-neutral-900 text-white text-xl sm:text-2xl w-[150px] h-[150px] sm:w-[175px] sm:h-[175px] rounded-full duration-200 hover:scale-105'
        onClick={handleNextLevel}
        >{sequence.length === 0 ? 'Play' : 'Score ' + sequence.length}</button>
      </div>
    </div>
  )
}

export default SimonGame