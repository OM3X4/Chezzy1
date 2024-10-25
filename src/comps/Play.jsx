/* eslint-disable */
import React , {useState} from 'react';
import { useParams } from 'react-router-dom';
import BoardPVP from './Boards/BoardPVP';
import Board from './Boards/BoardAI';


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
        return <img src={pieceImages[piece]} className=' size-5'></img>
    }
}

function Play({p1 , p2 , deadWw , deadBb , white , isPVP}) {

    const isAI = useParams().isAI;
    const [deadB , setDeadB] = useState([])
    const [deadW , setDeadW] = useState([])


    return (
    <>
        {/* left side */}
        <div className='sm:ml-5 mx-auto  xl:ml-24 flex flex-col md:flex-row'>
            <div className=' md:my-16 mx-10 flex flex-row md:flex-col items-start justify-between h-[550px] '> {/*data*/}
                <div className=' flex flex-col justify-center items-center'>
                    <img src={p1.image} className=' size-10 rounded'/>
                    <h1 className=' font-semibold text-white text-sm'>{p1.name}</h1>
                    <h1 className=' font-semibold text-white text-sm'>{p1.rate}</h1>
                </div>
                <div className=' flex flex-col justify-center items-center'>
                    <img src={p2.image} className=' size-10 rounded'/>
                    <h1 className=' font-semibold text-white text-sm'>{p2.name}</h1>
                    <h1 className=' font-semibold text-white text-sm'>{p2.rate}</h1>
                </div>
            </div>
            <div className='md:flex justify-between ml-3  flex-col md:mr-9 h-[550px] my-12 hidden '>
                    <div className='flex flex-col flex-wrap h-[30%]'>
                        {!white ?
                            deadB.map((piece , index) => {
                                return <div key={index}>{icon(piece)}</div>
                            })
                            :deadW.map((piece , index) => {
                                return <div key={index}>{icon(piece)}</div>
                            })

                        }
                    </div>
                    <div className='flex flex-col-reverse flex-wrap h-[20%]'>
                        {white ?
                            deadB.map((piece , index) => {
                                return <div key={index}>{icon(piece)}</div>
                            })
                            :deadW.map((piece , key) => {
                                return <div key={key}>{icon(piece)}</div>
                            })

                        }
                    </div>
            </div>
            <div className='h-fit rounded overflow-hidden m-5  size-fit order-first md:order-last'>
                {isAI == "false" ? <BoardPVP white={white} setterW={setDeadW} setterB={setDeadB}/> : <Board white={white} setterW={setDeadW} setterB={setDeadB}/>}
            </div>
            {/* <div className='text-black font-bold text-3xl flex justify-center items-center ml-20'>
                <div className=' bg-white px-32 py-3 rounded-lg transition-all duration-100 hover:bg-primary hover:text-white cursor-pointer'
                onClick={e => {window.location.reload(false);}}>
                    Restart
                </div>
            </div> */}
        </div>

    </>
    );
}

export default Play;