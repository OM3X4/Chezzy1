import { FaChessQueen, FaChessKing, FaChessBishop, FaChessPawn } from "react-icons/fa";
import { GiChessKnight, GiChessRook } from "react-icons/gi";
export const layout = {
    // White pieces
    a1: 'R', a2: "P", a3: null, a4: null, a5: null, a6: null, a7: "PB", a8: 'RB',
    b1: "N", b2: "P", b3: null, b4: null, b5: null, b6: null, b7: "PB", b8: "NB",
    c1: "B", c2: "P", c3: null, c4: null, c5: null, c6: null, c7: "PB", c8: "BB",
    d1: "Q", d2: "P", d3: null, d4: null, d5: null, d6: null, d7: "PB", d8: "QB",
    e1: 'K', e2: "P", e3: null, e4: null, e5: null, e6: null, e7: "PB", e8: 'KB',
    f1: "B", f2: "P", f3: null, f4: null, f5: null, f6: null, f7: "PB", f8: "BB",
    g1: "N", g2: "P", g3: null, g4: null, g5: null, g6: null, g7: "PB", g8: "NB",
    h1: 'R', h2: "P", h3: null, h4: null, h5: null, h6: null, h7: "PB", h8: 'RB'
};
// export const layout = {
//     // White pieces
//     a1: null, a2: null, a3: "P", a4: null, a5: "PB", a6: null, a7: null, a8: "RB",
//     b1: "B", b2: null, b3: null, b4: null, b5: null, b6: null, b7: null, b8: null,
//     c1: null, c2: null, c3: null, c4: null, c5: "NB", c6: "PB", c7: null, c8: null,
//     d1: null, d2: null, d3: null, d4: null, d5: null, d6: null, d7: null, d8: "KB",
//     e1: "NB", e2: null, e3: null, e4: "K", e5: null, e6: null, e7: null, e8: null,
//     f1: null, f2: "P", f3: null, f4: null, f5: null, f6: null, f7: "PB", f8: null,
//     g1: null, g2: null, g3: "P", g4: null, g5: null, g6: null, g7: null, g8: null,
//     h1: null, h2: null, h3: null, h4: null, h5: "N", h6: null, h7: null, h8: null
// };
// export const layout = {
//     // White pieces
//     a1: null, a2: null, a3: null, a4: null, a5: null, a6: null, a7: null, a8: null,
//     b1: null, b2: null, b3: null, b4: null, b5: null, b6: null, b7: "P", b8: null,
//     c1: null, c2: null, c3: null, c4: null, c5: null, c6: null, c7: null, c8: null,
//     d1: null, d2: null, d3: null, d4: null, d5: null, d6: null, d7: null, d8: null,
//     e1: null, e2: null, e3: null, e4: "K", e5: null, e6: null, e7: null, e8: null,
//     f1: null, f2: "PB", f3: null, f4: null, f5: null, f6: null, f7: null, f8: null,
//     g1: null, g2: null, g3: null, g4: null, g5: null, g6: null, g7: null, g8: null,
//     h1: null, h2: null, h3: null, h4: null, h5: null, h6: null, h7: null, h8: "KB"
// };






export const squareValue = {
    a1: -0.5, b1: -0.4, c1: -0.4, d1: -0.4, e1: -0.4, f1: -0.4, g1: -0.4, h1: -0.5,
    a2: -0.4, b2: -0.2, c2: 0.0, d2: 0.0, e2: 0.0, f2: 0.0, g2: -0.2, h2: -0.4,
    a3: -0.4, b3: 0.0, c3: 0.1, d3: 0.2, e3: 0.2, f3: 0.1, g3: 0.0, h3: -0.4,
    a4: -0.4, b4: 0.0, c4: 0.2, d4: 0.25, e4: 0.25, f4: 0.2, g4: 0.0, h4: -0.4,
    a5: -0.4, b5: 0.0, c5: 0.2, d5: 0.25, e5: 0.25, f5: 0.2, g5: 0.0, h5: -0.4,
    a6: -0.4, b6: 0.0, c6: 0.1, d6: 0.2, e6: 0.2, f6: 0.1, g6: 0.0, h6: -0.4,
    a7: -0.4, b7: -0.2, c7: 0.0, d7: 0.0, e7: 0.0, f7: 0.0, g7: -0.2, h7: -0.4,
    a8: -0.5, b8: -0.4, c8: -0.4, d8: -0.4, e8: -0.4, f8: -0.4, g8: -0.4, h8: -0.5
};

export const kingSquares = {
    a1: -0.3, b1: -0.4, c1: -0.4, d1: -0.5, e1: -0.5, f1: -0.4, g1: -0.4, h1: -0.3,
    a2: -0.3, b2: -0.4, c2: -0.4, d2: -0.5, e2: -0.5, f2: -0.4, g2: -0.4, h2: -0.3,
    a3: -0.3, b3: -0.4, c3: -0.4, d3: -0.5, e3: -0.5, f3: -0.4, g3: -0.4, h3: -0.3,
    a4: -0.3, b4: -0.4, c4: -0.4, d4: -0.5, e4: -0.5, f4: -0.4, g4: -0.4, h4: -0.3,
    a5: -0.3, b5: -0.4, c5: -0.4, d5: -0.5, e5: -0.5, f5: -0.4, g5: -0.4, h5: -0.3,
    a6: -0.2, b6: -0.2, c6: -0.2, d6: -0.2, e6: -0.2, f6: -0.2, g6: -0.2, h6: -0.2,
    a7: 0.2, b7: 0.2, c7: 0.0, d7: 0.0, e7: 0.0, f7: 0.0, g7: 0.2, h7: 0.2,
    a8: 0.2, b8: 0.3, c8: 0.1, d8: 0.0, e8: 0.0, f8: 0.1, g8: 0.3, h8: 0.2
};


export function layoutToFEN(layout, isWhite, castlingRights = '-') {
    const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
    let fen = '';
    const turn = isWhite ? "w" : "b";
   
    ranks.forEach(rank => {
        let emptySquares = 0;
        let row = '';
       
        'abcdefgh'.split('').forEach(file => {
            const key = `${file}${rank}`;
            const piece = layout[key];
           
            if (piece === null || piece === undefined) {
                emptySquares++;
            } else {
                if (emptySquares > 0) {
                    row += emptySquares;
                    emptySquares = 0;
                }
                const isBlack = piece.endsWith('B') && piece.length == 2;
                const pieceType = piece.charAt(0);
                row += isBlack ? pieceType.toLowerCase() : pieceType;
            }
        });
       
        if (emptySquares > 0) {
            row += emptySquares;
        }
       
        fen += row + (rank > 1 ? '/' : '');
    });
   
    // Validate and normalize castling rights string
    let normalizedCastlingRights = castlingRights;
    
    // If empty string is provided, use '-'
    if (normalizedCastlingRights === '') {
        normalizedCastlingRights = '-';
    }
    
    // Validate castling rights string
    const validCharacters = ['K', 'Q', 'k', 'q', '-'];
    if (normalizedCastlingRights !== '-') {
        const castlingArray = [...new Set(normalizedCastlingRights)].sort(); // Remove duplicates and sort
        if (!castlingArray.every(char => validCharacters.includes(char))) {
            throw new Error('Invalid castling rights string. Use only K, Q, k, q, or -');
        }
        normalizedCastlingRights = castlingArray.join('');
    }

    const activeColor = turn;
    const enPassant = '-';  // No en passant possible
    const halfmoveClock = '0';
    const fullmoveNumber = '1';
   
    fen += ` ${activeColor} ${normalizedCastlingRights} ${enPassant} ${halfmoveClock} ${fullmoveNumber}`;
   
    return fen;
}







function getChessPieceIcon(square, lay) {
    const piece = lay[square]; // Access the piece using bracket notation

    if (!piece) return null; // Return null if the square is empty

    const isBlack = piece.endsWith('B') && piece.length == 2;
    const baseStyle = "w-[3vw] h-[3vw] self-center"; // Adjust size with Tailwind classes
    const colorStyle = isBlack ? "text-black" : "text-white";

    // Return the corresponding JSX component with the applied styles
    switch (piece.charAt(0)) {
        case 'R':
            return <GiChessRook className={`${baseStyle} ${colorStyle}`} />;
        case 'N':
            return <GiChessKnight className={`${baseStyle} ${colorStyle}`} />;
        case 'B':
            return <FaChessBishop className={`${baseStyle} ${colorStyle}`} />;
        case 'Q':
            return <FaChessQueen className={`${baseStyle} ${colorStyle}`} />;
        case 'K':
            return <FaChessKing className={`${baseStyle} ${colorStyle}`} />;
        case 'P':
            return <FaChessPawn className={`${baseStyle} ${colorStyle}`} />;
        default:
            return null;
    }
}

export default getChessPieceIcon;