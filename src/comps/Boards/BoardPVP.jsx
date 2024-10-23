/* eslint-disable */
import { Chess, PAWN } from 'chess.js';
import { engine } from '../../Engine/EngineKO4.js';
import React, { useEffect, useState } from 'react'
import Square from './Square.jsx'
import { layout } from './assets.jsx'
import { layoutToFEN } from "./assets.jsx";

const order = new Map();
order.set("c" , 4)
order.set("p" , 3)
order.set("b" , 2)
order.set("n" , 1)



const moveAudio = new Audio("http://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-self.mp3");
moveAudio.preload = "auto";
const captureAudio = new Audio("http://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/capture.mp3");
captureAudio.preload = "auto";
const checkAudio = new Audio("https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-check.mp3");
checkAudio.preload = "auto";


function BoardPVP({white}) {

    //locating kings
    const [isCheckMated , setIsCheckMated] = useState(false)
    const [whiteKingPosition, setWhiteKingPosition] = useState('e1');
    const [blackKingPosition, setBlackKingPosition] = useState('e8');
    const [castlingRights , setCastlingRights] = useState("KQkq")
    //whose turn
    const [isWhiteTurn , setIsWhiteTurn] = useState(true)
    //set of available squares that is used to check for every square to put point in it
    const [available , setAvailable] = useState([])
    //set inital square
    const [start , setStart] = useState(null)
    const [rows , setRows] = useState(Array(8).fill().map((_, index) => 8 - index))
    const [cols , setCols] = useState(Array(8).fill().map((_, index) => String.fromCharCode(index + 97))) 
    const [piecesLay , setPiecesLay] = useState(layout)
    const [isCheck , setIsCheck] = useState(false)
    const [history , setHistory] = useState([])
    const [ isStalemate , setIsStaleMated] = useState(false)
    const CHESS = new Chess(layoutToFEN(piecesLay , isWhiteTurn , castlingRights))
    const [MainChess , setMainChess] = useState(CHESS)
    let FENcounter = new Map()


    //sound use effect
    useEffect(() => {
        const preloadAudio = () => {
            moveAudio.load();
            captureAudio.load();
            checkAudio.load();
        };
        if(!white){
            setRows(Array(8).fill().map((_, index) => 8 - index).reverse());
            setCols(Array(8).fill().map((_, index) => String.fromCharCode(index + 97)).reverse());        
        }
        preloadAudio();
    }, []);


    //castling setting 
    useEffect(() => {
        castling(piecesLay , castlingRights)
    })







    



    useEffect(() => {
        isInCheck(piecesLay)
    })


    


    async function HandleClick(square) {
        if(true){
            if (start) {
            if (start !== square) {
                const validMove = available.includes(square);
                if (validMove) {
                    if(piecesLay[start] == (!isWhiteTurn ? whiteKingPosition : blackKingPosition)){
                        !isWhiteTurn ? setBlackKingPosition(square) : setWhiteKingPosition(square)
                    }
                        setIsWhiteTurn(prev => !prev)
                        const tranLay = {...piecesLay}
                        if((start == "e1" && piecesLay[start] == "K" && square == "g1") || (start == "e8" && piecesLay[start] == "KB" && square == "g8")){
                            if(isWhiteTurn){
                                tranLay[square] = tranLay[start];
                                tranLay[start] = null;
                                tranLay["f1"] = tranLay["h1"]
                                tranLay["h1"] = null;
                            }else{
                                tranLay[square] = tranLay[start];
                                tranLay[start] = null;
                                tranLay["f8"] = tranLay["h8"]
                                tranLay["h8"] = null;
                            }
                        }else if((start == "e1" && piecesLay[start] == "K" && square == "c1") || (start == "e8" && piecesLay[start] == "KB" && square == "c8")){
                            if(isWhiteTurn){
                                tranLay[square] = tranLay[start];
                                tranLay[start] = null;
                                tranLay["d1"] = tranLay["a1"]
                                tranLay["a1"] = null;
                            }else{
                                tranLay[square] = tranLay[start];
                                tranLay[start] = null;
                                tranLay["d8"] = tranLay["a8"]
                                tranLay["a8"] = null;
                            }
                        }else{
                            tranLay[square] = tranLay[start];
                            tranLay[start] = null;
                        }
                        if((piecesLay[start] == "P" && square[1] == 8)){
                            tranLay[square] = "Q"
                            // MainChess.load(layoutToFEN(tranLay , isWhiteTurn , castlingRights))
                        }
                        else if((piecesLay[start] == "PB" && square[1] == 1)){
                            tranLay[square] = "QB"
                            // MainChess.load(layoutToFEN(tranLay , isWhiteTurn , castlingRights))
                        }
                        setPiecesLay(tranLay);
                        setStart(null);
                        setAvailable([]);
                        const chess = new Chess(layoutToFEN(tranLay , isWhiteTurn , castlingRights));
                        const check = chess.isCheck()
                        const checkmate = chess.isCheckmate()
                        let pieceType = piecesLay[start].length === 2 
                        ? (piecesLay[start] !== "PB" ? piecesLay[start][0].toUpperCase() : "") 
                        : (piecesLay[start] !== "P" ? piecesLay[start][0].toUpperCase() : "");
                        
                    // Construct the move description
                        let moveDescription = pieceType ? `${pieceType}${square}` : square;
                        if (piecesLay[square]) {
                            if(pieceType == ""){
                                pieceType = start[0]
                            }
                            moveDescription = `${pieceType}x${square}`;
                            captureAudio.play();
                        } else if (check) {
                            moveDescription += `+`;
                            checkAudio.play();
                        } else if (checkmate) {
                            moveDescription += `#`;
                            checkAudio.play();
                        } else {
                            moveAudio.play();
                        }
                        setHistory(prev => [...prev, layoutToFEN(piecesLay , isWhiteTurn , castlingRights)]);
                        if(FENcounter.has(layoutToFEN(tranLay , isWhiteTurn , castlingRights))){
                            FENcounter.set(layoutToFEN(tranLay , isWhiteTurn , castlingRights), FENcounter.get(layoutToFEN(tranLay , isWhiteTurn , castlingRights)));
                        }else{
                            FENcounter.set(layoutToFEN(tranLay , isWhiteTurn , castlingRights) , 0)
                        }
                    } else {
                        setStart(null);
                        setAvailable([]);
                }
            } else {
                setAvailable([]);
                setStart(null);
            }
        } else {
            if (piecesLay[square]) {
                const isWhite = piecesLay[square].length === 1;
                if (isWhite === isWhiteTurn) {
                    getValidSquares(square, piecesLay);
                    setStart(square);
                }
            }
        }}
    }
    
    function castling(piecesLay, castlingRights) {
        // If castling rights is empty, set to "-" and return early
        if (!castlingRights) {
            setCastlingRights("-");
            return;
        }
    
        let newCastlingRights = castlingRights;
        
        // Define the required pieces for castling
        const castlingRequirements = {
            'K': { king: ['e1', 'K'], rook: ['h1', 'R'] },
            'Q': { king: ['e1', 'K'], rook: ['a1', 'R'] },
            'k': { king: ['e8', 'KB'], rook: ['h8', 'RB'] },
            'q': { king: ['e8', 'KB'], rook: ['a8', 'RB'] }
        };
    
        // Check each castling right
        Object.entries(castlingRequirements).forEach(([right, requirement]) => {
            const { king, rook } = requirement;
            
            if (newCastlingRights.includes(right)) {
                // Remove castling right if either king or rook is not in correct position
                if (piecesLay[king[0]] !== king[1] || piecesLay[rook[0]] !== rook[1]) {
                    newCastlingRights = newCastlingRights.replace(right, '');
                }
            }
        });
    
        // If all castling rights have been removed, use "-"
        if (!newCastlingRights) {
            newCastlingRights = "-";
        }
    
        // Update castling rights if they've changed
        if (newCastlingRights !== castlingRights) {
            setCastlingRights(newCastlingRights);
        }
    }




    function getValidSquares(square, board) {
        const tran = { ...board };  // Spread the board object to avoid mutating it
        const chess = new Chess(layoutToFEN(tran , isWhiteTurn , castlingRights));  // Create a new chess instance with the FEN string
    
        let validMoves = chess.moves({ square, verbose: true });  // Get all valid moves for the given square
    
        // Set available squares by mapping over the valid moves and extracting the 'to' property
        setAvailable(validMoves.map(move => move.to));
    }

    function isInCheck(board){
        const tran = { ...board };
        const chess = new Chess(layoutToFEN(tran , isWhiteTurn , castlingRights));
        setIsCheckMated(chess.isCheckmate());
        setIsStaleMated(chess.isStalemate());
        setIsCheck(chess.isCheck());
        return [chess.isCheck() , chess.isCheckmate()];
    }


    return (
        <>
            <div className=' grid grid-rows-8 grid-cols-8 gap-0 lg:size-[600px] sm:size-[50vw]'>
                        {rows.map((row , index) => {
                            return cols.map((col , i) => {
                                // Convert column letter to a number (1 for 'a', 2 for 'b', ..., 8 for 'h')
                                const colNumber = cols.indexOf(col) + 1;
                                // Determine if the square is dark
                                const isDark = (row + colNumber) % 2 === 0;

                                return <div key={`${index}${i}`}>
                                    <Square number={`${col}${row}`} dark={isDark} lay={piecesLay} avail={available}click={HandleClick} selected={start}
                                    ischeck={isCheck} ischeckMated={isCheckMated} isWhiteTurn={isWhiteTurn} stale={isStalemate}/>
                                </div>
                            })
                        })}
                        
            </div>
        </>
    );
}

export default BoardPVP;