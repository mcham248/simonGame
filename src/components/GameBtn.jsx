import React, {forwardRef} from 'react'


const GameBtn = forwardRef(({color, border, bg, onClick}, ref) => {
  return (
    <button color={color} className={`${border} ${bg} sm:w-[175px] sm:h-[175px] w-[200px] h-[200px] m-2 duration-200 hover:scale-105`} onClick={onClick} ref={ref}></button>
  )
})

export default GameBtn