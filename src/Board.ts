import Color from './PGN/AN/Color';
import Bishop from './piece/Bishop';
import King from './piece/King';
import Knight from './piece/Knight';
import Pawn from './piece/Pawn';
import Queen from './piece/Queen';
import Rook from './piece/Rook';
import RookType from './piece/RookType';

class Board extends Map {
  constructor() {
    super();
    this.set(0, new Rook(Color.W, 'a1', RookType.CASTLE_LONG));
    this.set(1, new Knight(Color.W, 'b1'));
    this.set(2, new Bishop(Color.W, 'c1'));
    this.set(3, new Queen(Color.W, 'd1'));
    this.set(4, new King(Color.W, 'e1'));
    this.set(5, new Bishop(Color.W, 'f1'));
    this.set(6, new Knight(Color.W, 'g1'));
    this.set(7, new Rook(Color.W, 'h1', RookType.CASTLE_SHORT));
    this.set(8, new Knight(Color.W, 'a2'));
    this.set(9, new Knight(Color.W, 'b2'));
    this.set(10, new Knight(Color.W, 'c2'));
    this.set(11, new Knight(Color.W, 'd2'));
    this.set(12, new Knight(Color.W, 'e2'));
    this.set(13, new Knight(Color.W, 'f2'));
    this.set(14, new Knight(Color.W, 'g2'));
    this.set(15, new Knight(Color.W, 'h2'));
    this.set(16, new Rook(Color.B, 'a8', RookType.CASTLE_LONG));
    this.set(17, new Knight(Color.B, 'b8'));
    this.set(18, new Bishop(Color.B, 'c8'));
    this.set(19, new Queen(Color.B, 'd8'));
    this.set(20, new King(Color.B, 'e8'));
    this.set(21, new Bishop(Color.B, 'f8'));
    this.set(22, new Knight(Color.B, 'g8'));
    this.set(23, new Rook(Color.B, 'h8', RookType.CASTLE_SHORT));
    this.set(24, new Knight(Color.B, 'a7'));
    this.set(25, new Knight(Color.B, 'b7'));
    this.set(26, new Knight(Color.B, 'c7'));
    this.set(27, new Knight(Color.B, 'd7'));
    this.set(28, new Knight(Color.B, 'e7'));
    this.set(29, new Knight(Color.B, 'f7'));
    this.set(30, new Knight(Color.B, 'g7'));
    this.set(31, new Knight(Color.B, 'h7'));
  }
}

export default Board;
