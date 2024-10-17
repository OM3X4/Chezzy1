/* eslint-disable */
//it now doesnt evaluate scholars mate
import { Chess, PAWN } from 'chess.js';
import { squareValue } from '../assets/assets.jsx';
import { getBestMove } from '../assets/stockfish.jsx';
import React, { useEffect, useState } from 'react'
import Square from './Square'
import { layout } from '../assets/assets.jsx'
import { layoutToFEN } from "../assets/assets.jsx";
import { kingSquares } from '../assets/assets.jsx';
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

const moveAudio = new Audio("http://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-self.mp3");
moveAudio.preload = "auto";
const captureAudio = new Audio("http://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/capture.mp3");
captureAudio.preload = "auto";
const checkAudio = new Audio("https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-check.mp3");
checkAudio.preload = "auto";


function Board({white}) {

    //locating kings
    const [isCheckMated , setIsCheckMated] = useState(false)
    const [whiteKingPosition, setWhiteKingPosition] = useState('e1');
    const [blackKingPosition, setBlackKingPosition] = useState('e8');
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

    const layout2 = {
        // White pieces
        a1: 'R', a2: 'P', a3: null, a4: null, a5: null, a6: null, a7: 'PB', a8: 'RB',
        b1: 'N', b2: 'P', b3: null, b4: null, b5: null, b6: null, b7: 'PB', b8: 'NB',
        c1: 'B', c2: 'P', c3: null, c4: null, c5: null, c6: null, c7: 'PB', c8: 'BB',
        d1: "QB", d2: null, d3: null, d4: null, d5: null, d6: null, d7: null, d8: null,
        e1: null, e2: 'P', e3: null, e4: null, e5: null, e6: null, e7: 'PB', e8: 'KB',
        f1: null, f2: 'P', f3: null, f4: null, f5: null, f6: null, f7: 'PB', f8: 'BB',
        g1: "K", g2: 'P', g3: null, g4: null, g5: null, g6: null, g7: 'PB', g8: 'NB',
        h1: 'R', h2: 'P', h3: null, h4: null, h5: null, h6: null, h7: 'PB', h8: 'RB'
    };

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




    //checkmate checker
    useEffect(() => {
        const processMove = () => {
            try {
                if (!isCheckMated && !isStalemate) {
                    const [from, to] = getMove(layoutToFEN(piecesLay, isWhiteTurn));
                    if (isWhiteTurn !== white) {
                        setIsWhiteTurn(prev => !prev);
                        const tranLay = { ...piecesLay };
                        tranLay[to] = tranLay[from];
                        tranLay[from] = null;
    
                        if ((piecesLay[from] === "P" && to[1] === 8)) {
                            console.log("promotion")
                            tranLay[to] = "Q";
                        }
                        if ((piecesLay[from] === "PB" && to[1] === 1)) {
                            console.log("promotion")
                            tranLay[to] = "QB";
                        }
                        
                        setPiecesLay(tranLay);
                        setAvailable([]);
                        const chess = new Chess(layoutToFEN(tranLay , isWhiteTurn));
                        const check = chess.isCheck();
                        const checkmate = chess.isCheckmate();
    
                        let moveDescription = `${piecesLay[from].length === 2 ? piecesLay[from][0].toUpperCase() : piecesLay[from][0].toLowerCase()}${to}`;
                        if (piecesLay[to]) {
                            moveDescription += `x`;
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
    
                        setHistory(prev => [...prev, moveDescription]);
                    }
                }
            } catch (error) {
                console.error('Error processing move:', error);
            }
        };
    
        // Generate a random timeout between 500ms and 2000ms
        const randomTimeout = Math.floor(Math.random() * 1500) + 500;
    
        // Use setTimeout to introduce the delay
        const timeoutId = setTimeout(() => {
            processMove();
        }, randomTimeout);
    
        // Cleanup the timeout if the component unmounts or dependencies change
        return () => clearTimeout(timeoutId);
    
    }, [piecesLay]);



    useEffect(() => {
        if(white == isWhiteTurn){
            Engine(piecesLay)
        }
    } , [piecesLay])




    


    function getMove(fen) {
                let randomMove = Engine(piecesLay);
                return [randomMove.from , randomMove.to];
    }


    function evaluate(fen , isMaximizing){
        let score = 0;
        let color = isMaximizing ? "w" : "b"
        const chess = new Chess(fen);
        if(chess.isCheckmate() && !isMaximizing){
            score = 1000;
            console.log("checmate found ++")
            chess.ascii()

            return score;
        }else if(chess.isCheckmate() && isMaximizing){
            score = -1000;
            console.log("checmate found --")
            chess.ascii()

            return score;
        }else if(chess.isDraw()){
            score = 0;
            return score;
        }


        const pawns = squareNames.filter((square) => {const piece = chess.get(square);
            return piece && piece.type === 'p' && piece.color === color;
        })
        const pawnsMap = {
            a : 0,
            b : 0,
            c : 0,
            d : 0,
            e : 0,
            f : 0,
            g : 0,
            h : 0,
        }
        pawns.map((pawn) => {
            pawnsMap[pawn[0]]++;
        })
        cols.map((col) => {
            if(pawnsMap[col] > 1){
                score += -0.3 * (pawnsMap[col] - 1)
            }
        })

        const Epawns = squareNames.filter((square) => {const piece = chess.get(square);
            return piece && piece.type === 'p' && piece.color !== color;
        })
        const EpawnsMap = {
            a : 0,
            b : 0,
            c : 0,
            d : 0,
            e : 0,
            f : 0,
            g : 0,
            h : 0,
        }
        Epawns.map((pawn) => {
            EpawnsMap[pawn[0]]++;
        })
        cols.map((col) => {
            if(EpawnsMap[col] > 1){
                score -= -0.3 * (EpawnsMap[col] - 1)
            }
        })


        for(let i = 0; i < 64;i++){
            const piece = chess.get(squareNames[i]);
            if(piece != false){
                if(piece.color == color){
                    score += value[piece.type.toLowerCase()];
                    score += chess.moves({square : squareNames[i]}).length * 0.1;
                    if(piece.type == "k"){
                        score += kingSquares[squareNames[i]]
                    }else {
                        score += squareValue[squareNames[i]];
                    }
                }else {
                    score -= chess.moves({square : squareNames[i]}).length * 0.01;
                    score -= value[piece.type.toLowerCase()];
                    if(piece.type == "k"){
                        score -= kingSquares[squareNames[i]]
                    }else {
                        score -= squareValue[squareNames[i]];
                    }
                }
            }
        }
        return score;
    }

    function minimax(fen , depth , isMaximizing , Steps , alpha , beta){
        Steps.count = Steps.count + 1;
        let score = 0;
        let BestMove = null
        const chess = new Chess(fen)
        if(chess.isCheckmate() && !isMaximizing){
            score = 1000;
            console.log("checmate found ++")

            return score;
        }else if(chess.isCheckmate() && isMaximizing){
            score = -1000;
            console.log("checmate found --")
            return score;
        }else if(chess.isDraw()){
            score = 0;
            return score;
        }
        if(depth == 1){
            return evaluate(fen , isMaximizing);
        }

        if(isMaximizing){
            let bestScore = -Infinity;
            const moves = chess.moves({verbose : true});
            for(const move of moves){
                if(!move.san){
                    continue;
                }
                try{

                    chess.move(move.san);
                }catch(e){
                    continue
                }
                const childscore = minimax(chess.fen() , depth + 1 , false , Steps , alpha , beta);
                bestScore = Math.max(bestScore , childscore);
                alpha = Math.max(alpha , childscore);
                if(beta <= alpha){
                    break;
                }
                chess.undo();

            }
            return bestScore;
        }else{
            let bestScore = Infinity;
            const moves = chess.moves({verbose : true});

            for(const move of moves){
                if(!move.san){
                    continue;
                }
                try{

                    chess.move(move.san);
                }catch(e){
                    continue;
                }

                const childscore = minimax(chess.fen() , depth + 1 , true , Steps , alpha , beta);
                bestScore = Math.min(bestScore , childscore);
                beta = Math.min(beta , childscore);
                if(beta >= alpha){
                    break;
                }
                chess.undo();

            }
            return bestScore;
        }

    }

    function Engine(piecesLay){
        const chess = new Chess(layoutToFEN(piecesLay , isWhiteTurn));
        const moves = chess.moves({verbose : true});
        let bestScore = -Infinity;
        
        for (const move of moves){
            try{
                chess.move(move.to);
            }catch(e){
                continue
            }
            validMoves++;
            let score = minimax(chess.fen() , 0 , false , Steps , -Infinity , Infinity)
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
            chess.undo();

        }
        console.log(bestMove , bestScore);
        console.log("numbere of evaluations" , Steps.count)
        return bestMove;
    }




    useEffect(() => {
        const fen = layoutToFEN(piecesLay , isWhiteTurn);
        getMove(fen);
    } , [piecesLay])


    useEffect(() => {
        isInCheck(piecesLay)
    })



    useEffect(() => {
    } , [available])


    


    async function HandleClick(square) {
        if(isWhiteTurn == white){
            if (start) {
            if (start !== square) {
                const validMove = available.includes(square);
                if (validMove) {
                    if(piecesLay[start] == (!isWhiteTurn ? whiteKingPosition : blackKingPosition)){
                        !isWhiteTurn ? setBlackKingPosition(square) : setWhiteKingPosition(square)
                    }
                        const tranLay = { ...piecesLay };
                        tranLay[square] = tranLay[start];
                        tranLay[start] = null;
                        if((piecesLay[start] == "P" && square[1] == 8)){
                            tranLay[square] = "Q"
                        }
                        if((piecesLay[start] == "PB" && square[1] == 1)){
                            tranLay[square] = "QB"
                        }
                        setPiecesLay(tranLay);
                        setStart(null);
                        setAvailable([]);
                        setIsWhiteTurn(prev => !prev);
                        const chess = new Chess(layoutToFEN(tranLay));
                        const check = chess.isCheck()
                        const checkmate = chess.isCheckmate()
                        if(piecesLay[square]){
                            setHistory(prev => [...prev , `${piecesLay[start].length == 2 ? piecesLay[start][0].toUpperCase() : piecesLay[start][0].toLowerCase()}x${square}`])
                            captureAudio.play();
                        }else if(check){
                            setHistory(prev => [...prev , `${piecesLay[start].length == 2 ? piecesLay[start][0].toUpperCase() : piecesLay[start][0].toLowerCase()}${square}+`])
                            checkAudio.play();
                        }else if(checkmate){
                            setHistory(prev => [...prev , `${piecesLay[start].length == 2 ? piecesLay[start][0].toUpperCase() : piecesLay[start][0].toLowerCase()}${square}#`])
                            checkAudio.play();
                        }else{
                            setHistory(prev => [...prev , `${piecesLay[start].length == 2 ? piecesLay[start][0].toUpperCase() : piecesLay[start][0].toLowerCase()}${square}`])
                            moveAudio.play();
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
    


    function isValidPawnMove(start , end , board){
        const lay = board;
        const startCol = start[0].charCodeAt(0) - 'a'.charCodeAt(0) + 1;
        const startRow = parseInt(start[1], 10);
        const endCol = end[0].charCodeAt(0) - 'a'.charCodeAt(0) + 1;
        const endRow = parseInt(end[1], 10);
        const isWhite = lay[start].length == 1
        const colDiff = Math.abs(endCol - startCol)
        const rowDiff = Math.abs(endRow - startRow)

        //first two squares case
        if(startRow == (isWhite ? 2 : 7) && endRow - startRow == (isWhite ? 2 : -2) && colDiff == 0 && !lay[end] && !lay[(isWhite ? `${end[0]}${endRow - 1}` : `${end[0]}${endRow + 1}`)]){
            return true
        //one square case
        }else if(colDiff == 0 && (startRow - endRow == (isWhite ? -1 : 1)) && !lay[end]){
            return true
        }else if(colDiff == 1 && (startRow - endRow == (isWhite ? -1 : 1)) && (lay[end] ? lay[end].length == (isWhite ? 2 : 1) : false)){
            return true
        }
        else{
            return false
        }





        
    }
    function isValidPawnMove2(start , end , board){
        const lay = board;
        const startCol = start[0].charCodeAt(0) - 'a'.charCodeAt(0) + 1;
        const startRow = parseInt(start[1], 10);
        const endCol = end[0].charCodeAt(0) - 'a'.charCodeAt(0) + 1;
        const endRow = parseInt(end[1], 10);
        const isWhite = lay[start].length == 1
        const colDiff = Math.abs(endCol - startCol)
        const rowDiff = Math.abs(endRow - startRow)


        if(colDiff == 1 && (startRow - endRow == (isWhite ? -1 : 1))){
            return true
        }
        else{
            return false
        }





        
    }

    function isValidKnightMove(start , end , board){
        const lay = board;
        const startCol = start[0].charCodeAt(0) - 'a'.charCodeAt(0) + 1;
        const startRow = parseInt(start[1], 10);
        const endCol = end[0].charCodeAt(0) - 'a'.charCodeAt(0) + 1;
        const endRow = parseInt(end[1], 10);
        const isWhite = lay[start].length == 1
        const colDiff = Math.abs(endCol - startCol)
        const rowDiff = Math.abs(endRow - startRow)

        if(((colDiff == 1 && rowDiff == 2) || (colDiff == 2 && rowDiff == 1)) && (lay[end] ? lay[end].length == (isWhite ? 2 : 1) : true)){
            return true
        }else return false

        
    }


    function isValidKingMove(start , end , board){
        const lay = board;
        const startCol = start[0].charCodeAt(0) - 'a'.charCodeAt(0) + 1;
        const startRow = parseInt(start[1], 10);
        const endCol = end[0].charCodeAt(0) - 'a'.charCodeAt(0) + 1;
        const endRow = parseInt(end[1], 10);
        const isWhite = lay[start].length == 1
        const colDiff = Math.abs(endCol - startCol)
        const rowDiff = Math.abs(endRow - startRow)
        


        if(colDiff <= 1 && rowDiff <= 1 && (lay[end] ? lay[end].length == (isWhite ? 2 : 1) : true)){
            return true
        }else return false
    }

    function isValidBishopMove(start, end, board) {
        const lay = board;
        const startCol = start[0].charCodeAt(0) - 'a'.charCodeAt(0) + 1;
        const startRow = parseInt(start[1], 10);
        const endCol = end[0].charCodeAt(0) - 'a'.charCodeAt(0) + 1;
        const endRow = parseInt(end[1], 10);
        const isWhite = lay[start].length === 1;
        const colDiff = Math.abs(endCol - startCol);
        const rowDiff = Math.abs(endRow - startRow);
    
        if (colDiff !== rowDiff) {
            return false;
        }
    
        let isLegalMove = true;
    
        squareNames.forEach((name) => {
            const pathCol = name[0].charCodeAt(0) - 'a'.charCodeAt(0) + 1;
            const pathRow = parseInt(name[1], 10);
    
            // Check if the square is on the diagonal path and between start and end
            if (Math.abs(pathCol - startCol) === Math.abs(pathRow - startRow) &&
                ((pathCol > startCol && pathCol < endCol) || (pathCol < startCol && pathCol > endCol)) &&
                ((pathRow > startRow && pathRow < endRow) || (pathRow < startRow && pathRow > endRow))) {
    
                if (lay[name]) {
                    isLegalMove = false;
                }
            }
        });
    
        if (isLegalMove && (lay[end] ? lay[end].length === (isWhite ? 2 : 1) : true)) {
            return true;
        } else {
            return false;
        }
    }

    function isValidRookMove(start, end, board) {
        const lay = board;
        const startCol = start[0].charCodeAt(0) - 'a'.charCodeAt(0) + 1;
        const startRow = parseInt(start[1], 10);
        const endCol = end[0].charCodeAt(0) - 'a'.charCodeAt(0) + 1;
        const endRow = parseInt(end[1], 10);
        const isWhite = lay[start].length === 1;
        const colDiff = Math.abs(endCol - startCol);
        const rowDiff = Math.abs(endRow - startRow);
    
        // Check if the move is either horizontal or vertical
        if (!((rowDiff > 0 && colDiff === 0) || (rowDiff === 0 && colDiff > 0))) {
            return false;
        }
    
        let isLegalMove = true;
    
        squareNames.forEach((name) => {
            const pathCol = name[0].charCodeAt(0) - 'a'.charCodeAt(0) + 1;
            const pathRow = parseInt(name[1], 10);
    
            // Check if the square is on the same row or column and between start and end
            if (((rowDiff > 0 && colDiff === 0) && (pathCol === startCol) &&
                ((pathRow > startRow && pathRow < endRow) || (pathRow < startRow && pathRow > endRow))) ||
                ((rowDiff === 0 && colDiff > 0) && (pathRow === startRow) &&
                ((pathCol > startCol && pathCol < endCol) || (pathCol < startCol && pathCol > endCol)))) {
                
                if (lay[name]) {
                    isLegalMove = false;
                }
            }
        });
    
        if (isLegalMove && (lay[end] ? lay[end].length === (isWhite ? 2 : 1) : true)) {
            return true
        } else {
            return false
        }
    }

    function isValidQueenMove(start, end, board) {
        const isRookMove = isValidRookMove(start, end, board);
        const isBishopMove = isValidBishopMove(start, end, board);
    
        return isRookMove || isBishopMove;
    }


    function handleSwitching(start, square, board) {
        switch (board[start]) {
            case "P":
                return (isValidPawnMove(start, square, board));
            case "PB":
                return (isValidPawnMove(start, square, board));
            case "N":
            case "NB":
                return isValidKnightMove(start, square, board);
            case "K":
            case "KB":
                return (isValidKingMove(start, square, board));
            case "R":
            case "RB":
                return isValidRookMove(start, square, board);
            case "B":
            case "BB":
                return isValidBishopMove(start, square, board);
            case "Q":
            case "QB":
                return isValidQueenMove(start, square, board);
            default:
                return false;
        }
    }

    function getValidSquares(square, board) {
        const tran = { ...board };  // Spread the board object to avoid mutating it
        const chess = new Chess(layoutToFEN(tran , isWhiteTurn));  // Create a new chess instance with the FEN string
    
        let validMoves = chess.moves({ square, verbose: true });  // Get all valid moves for the given square
    
        // Set available squares by mapping over the valid moves and extracting the 'to' property
        setAvailable(validMoves.map(move => move.to));
    }

    function isInCheck(board){
        const tran = { ...board };
        const chess = new Chess(layoutToFEN(tran , isWhiteTurn));
        setIsCheckMated(chess.isCheckmate());
        setIsStaleMated(chess.isStalemate());
        setIsCheck(chess.isCheck());
        return [chess.isCheck() , chess.isCheckmate()];
    }


    return (
        <>
        <div className=' flex justify-between items-center h-[100vh] gap-20 w-[81vw] mx-auto'>
            <div className=' grid grid-rows-8 grid-cols-8 gap-0'>
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
            <div>
        { !isCheckMated ? <div><h1 className=" text-center text-5xl text-red-400 mt-10">{start ? start : "NO thing is Selected"}</h1>
        <h1 className=" text-center text-5xl text-green-400 mt-10">{isWhiteTurn ? "White" : "black"}'s turn</h1></div>
    :<div><h1 className=" text-3xl font-bold mt-10">CheckMate {isWhiteTurn ? "black won" : "white won"}</h1></div>}
        
            <button onClick={e => {setIsWhiteTurn(true);setPiecesLay(layout);setIsCheck(false);setIsCheckMated(false);setAvailable([]);setIsWhiteTurn(true);setHistory([]);setIsStaleMated(false)}}
                className=" bg-black w-[10vw] h-[5vw] mt-10 text-white font-bold text-3xl rounded-3xl hover:bg-gray-900">Restart</button></div>
        </div>
        </>
    );
}

export default Board;