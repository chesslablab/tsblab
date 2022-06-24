import Board from '../Board';
import Color from '../PGN/AN/Color';
import Piece from '../PGN/AN/Piece';
import AbstractEval from './AbstractEval';

class MaterialEval extends AbstractEval {
  static NAME: string = 'Material';

  constructor(board: Board) {
    super(board);
    this.result = {
      [Color.W]: 0,
      [Color.B]: 0
    };
  }
  public eval = (): any => {
    this.board.getPiecesByColor(Color.W).forEach((piece) => {
      if (piece.getId() !== Piece.K) {
        this.result[Color.W] += this.value[piece.getId()];
      }
    });
    this.board.getPiecesByColor(Color.B).forEach((piece) => {
      if (piece.getId() !== Piece.K) {
        this.result[Color.B] += this.value[piece.getId()];
      }
    });
    this.result[Color.B] = Math.round(this.result[Color.B] * 100) / 100;
    this.result[Color.W] = Math.round(this.result[Color.W] * 100) / 100;
    
    return this.result;
  }
}

export default MaterialEval;
