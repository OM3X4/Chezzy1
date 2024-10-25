import { CgMathEqual } from "react-icons/cg"; 
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { BiHash } from "react-icons/bi"; 
import { TbCrown } from "react-icons/tb"; 
import React from 'react'

const pieceImages = {
    K: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wk.png', // White King
    Q: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wq.png', // White Queen
    R: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wr.png', // White Rook
    N: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wn.png', // White Knight
    B: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wb.png', // White Bishop
    P: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png', // White Pawn
    KB: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bk.png', // Black King
    QB: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bq.png', // Black Queen
    RB: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/br.png', // Black Rook
    NB: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bn.png', // Black Knight
    BB: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bb.png', // Black Bishop
    PB: 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png', // Black Pawn
};

function icon(piece){
    if(piece){
        return <img src={pieceImages[piece]} className=" size-[90%] self-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></img>
    }
}


function Square({ dark, number, lay, click, avail , selected , ischeck , ischeckMated , isWhiteTurn , stale , trail}) {

    // const red = (number == (isWhiteTurn ? "KB" : "K") && ischeck)
    const red = (lay[number] == (!isWhiteTurn ? "KB" : "K") && ischeck)
    const iswin = (lay[number] == (isWhiteTurn ? "KB" : "K") && ischeckMated)
    const islose = (ischeckMated && lay[number] == (!isWhiteTurn ? "KB" : "K"))
    const draw = (stale && (lay[number] == "K" || lay[number] == "KB"))

    const isTrail = trail.includes(number)

    const darkStyle = `group relative size-[100%] bg-dark text-xs flex flex-col justify-center items-center ${isTrail ? "bg-trail" : ""} ${red ? " bg-red-500" : ""} `
    const lightStyle = `group relative size-[100%] bg-light text-xs flex justify-center items-center ${isTrail ? "bg-trail " : ""} ${red ? " bg-red-500" : ""}`
    const numberDark = `absolute top-0 left-0 p-1 text-[1vw] font-mono font-medium ${dark ? "text-light": "text-dark"}`
    return (
<>
    <div className={dark ? darkStyle : lightStyle}
        onClick={e => click(number)}>
        

        <span className={`absolute top-0 left-0 p-1 text-[100%] font-mono font-bold ${dark ? "text-light": "text-dark"}`}>{number}</span>
        

            <div>
        {selected === number 
            ? <div className=' border-selection border-4 border-avail border-opacity-70 group-hover:border-8 transition-all duration-100
            rounded-full size-[9vw] md:size-[50px] lg:size-[55px] xl:size-[65px] xl:border-[5px] flex justify-center items-center self-center'></div> : null}
            </div>
            {icon(lay[number]) ? icon(lay[number]) : null}
            {iswin ? <div className=" bg-orange-500 rounded-full absolute size-[3vw] lg:size-[25px] md:size-[15px] top-2 right-2 flex justify-center items-center"><TbCrown className=" text-white text-xl"/></div> 
            : null}
            {islose ? <div className=" bg-black rounded-full absolute size-[3vw] lg:size-[25px] md:size-[15px] top-2 right-2 flex justify-center items-center"><BiHash className=" text-white text-xl"/></div> 
            : null}
            {draw ? <div className=" bg-gray-400 rounded-full absolute size-[3vw] lg:size-[25px] md:size-[15px] top-1 right-1 flex justify-center items-center"><CgMathEqual className="text-white text-4xl"/></div> 
            : null}
        
        {(avail ? avail.includes(number) : false) ? 
            lay[number] ? <div className='border-4 border-selection  rounded-full opacity-70 group-hover:border-8 size-16 flex justify-center items-center self-center fixed transition-all duration-100'></div>
            : <div className='bg-selection size-7 rounded-full self-center fixed opacity-50 group-hover:size-10 transition-all duration-100'></div> 
            : null}
    </div>
</>

)
}

export default Square