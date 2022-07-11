import Board from '../Board';
import Color from '../PGN/AN/Color';
import Piece from '../PGN/AN/Piece';
import AbstractEval from './AbstractEval';

class DoubledPawnEval extends AbstractEval {
  static NAME: string = 'Doubled pawn';

  constructor(board: Board) {
    super(board);
    this.result = {
      [Color.W]: 0,
      [Color.B]: 0
    };
  }

  public eval = (): any => {
    this.board.forEach(piece => {
      const color = piece.getColor();
      if (piece.getId() === Piece.P) {
        const file = piece.getFile();
        const ranks = piece.getRanks();
        const nextPiece = this.board.getPieceBySq(file.ranks.next).value
        if (nextPiece) {
            if (nextPiece.getId() === Piece.P && nextPiece.getColor() === color) {
                this.result[color] += 1;
            }
        }
      }
    });

    return this.result;
  }
}

export default DoubledPawnEval;