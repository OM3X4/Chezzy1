/* eslint-disable */
import { Chess, PAWN } from 'chess.js';
import React, { useEffect, useState } from 'react'
import Square from './Square.jsx'
import { layout } from './assets.jsx'
import { layoutToFEN } from "./assets.jsx";

const squareNames = [
    'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8',
    'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8',
    'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8',
    'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8',
    'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8',
    'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8',
    'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'
]

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


function BoardPVP({white , setterW , setterB}) {

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
    const [ isStalemate , setIsStaleMated] = useState(false)
    const [trail , setTrail] = useState([])
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

    const initialWhitePieces = {
        'R': 2,  // Rooks
        'N': 2,  // Knights
        'B': 2,  // Bishops
        'Q': 1,  // Queen
        'K': 1,  // King
        'P': 8   // Pawns
    };
    
    const initialBlackPieces = {
        'RB': 2,  // Black Rooks
        'NB': 2,  // Black Knights
        'BB': 2,  // Black Bishops
        'QB': 1,  // Black Queen
        'KB': 1,  // Black King
        'PB': 8   // Black Pawns
    };
    
    // Function to get dead pieces
    function getDeadPieces(layout) {
        // Count current pieces on the board
        const currentPieceCounts = {
            // White pieces
            'R': 0, 'N': 0, 'B': 0, 'Q': 0, 'K': 0, 'P': 0,
            // Black pieces
            'RB': 0, 'NB': 0, 'BB': 0, 'QB': 0, 'KB': 0, 'PB': 0
        };
    
        // Count pieces currently on the board
        for (let square in layout) {
            const piece = layout[square];
            if (piece) {
                currentPieceCounts[piece]++;
            }
        }
    
        // Calculate dead pieces by comparing with initial counts
        const deadWhitePieces = [];
        const deadBlackPieces = [];
    
        // Check white pieces
        for (let piece in initialWhitePieces) {
            const missing = initialWhitePieces[piece] - (currentPieceCounts[piece] || 0);
            for (let i = 0; i < missing; i++) {
                deadWhitePieces.push(piece);
            }
        }
    
        // Check black pieces
        for (let piece in initialBlackPieces) {
            const missing = initialBlackPieces[piece] - (currentPieceCounts[piece] || 0);
            for (let i = 0; i < missing; i++) {
                deadBlackPieces.push(piece);
            }
        }
    
        return [ deadWhitePieces, deadBlackPieces ];
    }
    

    //set dead pieces
    useEffect(() => {
        const dead = getDeadPieces(piecesLay);
        setterW(dead[0]);
        setterB(dead[1])
    } , [piecesLay])



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
                        setTrail([start , square])
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
            <div className=' grid grid-rows-8 grid-cols-8 gap-0 xl:size-[600px] lg:size-[500px] md:size-[450px] sm:size-[80vw] size-fit '>
                        {rows.map((row , index) => {
                            return cols.map((col , i) => {
                                // Convert column letter to a number (1 for 'a', 2 for 'b', ..., 8 for 'h')
                                const colNumber = cols.indexOf(col) + 1;
                                // Determine if the square is dark
                                const isDark = (row + colNumber) % 2 === 0;

                                return <div key={`${index}${i}`}>
                                    <Square number={`${col}${row}`} dark={isDark} lay={piecesLay} avail={available}click={HandleClick} selected={start}
                                    ischeck={isCheck} ischeckMated={isCheckMated} isWhiteTurn={isWhiteTurn} stale={isStalemate} trail={trail}/>
                                </div>
                            })
                        })}
                        
            </div>
        </>
    );
}

export default BoardPVP;