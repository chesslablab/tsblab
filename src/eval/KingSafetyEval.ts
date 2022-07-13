import Board from '../Board';
import Color from '../PGN/AN/Color';
import Piece from '../PGN/AN/Piece';
import AbstractEval from './AbstractEval';
import PressureEval from './PressureEval';
import SpaceEval from './SpaceEval';

class KingSafetyEval extends AbstractEval {
  static NAME: string = 'King safety';

  constructor(board: Board) {
    super(board);
    this.result = {
      [Color.W]: 1,
      [Color.B]: 1
    };
  }

  public eval = (): any => {
    const pressEval = (new PressureEval(this.board)).eval();
    const spEval = (new SpaceEval(this.board)).eval();

    this.color(Color.W, pressEval, spEval);
    this.color(Color.B, pressEval, spEval);
  }

  public color = (color: string, pressEval: any, spEval: any): void => {
    const king = this.board.getPiece(color, Piece.K).value;
    for (const [key, sq] of Object.entries(king.getMobility())) {
      const piece = this.board.getPieceBySq(sq).value;
      if (piece && piece.getColor() === king.oppColor()) {
        this.result[color] -= 1;
      }
      if (pressEval[king.oppColor()].includes(sq)) {
        this.result[color] -= 1;
      }
      if (spEval[king.oppColor()].includes(sq)) {
        this.result[color] -= 1;
      }
    }
  }
}

export default KingSafetyEval;