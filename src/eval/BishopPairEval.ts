import Board from '../Board';
import Color from '../PGN/AN/Color';
import Piece from '../PGN/AN/Piece';
import AbstractEval from './AbstractEval';

class BishopPairEval extends AbstractEval {
  static NAME: string = 'Bishop pair';

  constructor(board: Board) {
    super(board);
    this.result = {
      [Color.W]: 0,
      [Color.B]: 0
    };
  }

  public eval = (): any => {
    let count = {
      [Color.W]: 0,
      [Color.B]: 0
    };

    this.board.forEach(piece => {
      if (piece.getId() === Piece.B) {
        count[piece.getColor()] += 1;
      }
    });
    if (count[Color.W] === 2 && count[Color.W] > count[Color.B]) {
      this.result[Color.W] = 1;
    } else if (count[Color.B] === 2 && count[Color.B] > count[Color.W]) {
      this.result[Color.B] = 1;
    }

    return this.result;
  }
}

export default BishopPairEval;