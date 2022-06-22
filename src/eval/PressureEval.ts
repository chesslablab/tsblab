import Board from '../Board';
import Color from '../PGN/AN/Color';
import Piece from '../PGN/AN/Piece';
import AbstractEval from './AbstractEval';
import SqEval from './SqEval';

class PressureEval extends AbstractEval {
  static NAME: string = 'Pressure';

  private sqEval: object;

  constructor(board: Board) {
    super(board);
    let sqEval = new SqEval(board);
    this.sqEval = {
      [SqEval.TYPE_FREE]: sqEval.eval(SqEval.TYPE_FREE),
      [SqEval.TYPE_USED]: sqEval.eval(SqEval.TYPE_USED)
    };

    this.result = {
      [Color.W]: [],
      [Color.B]: []
    };
  }

  public eval = (): any => {
    this.board.forEach((piece, key) => {
      switch (piece.getId()) {
        case Piece.K:
          this.result[piece.getColor()] = [
            ...this.result[piece.getColor()],
            ...this.sqEval[SqEval.TYPE_USED][piece.getOppColor()]
              .filter(usedSq => Array.from(piece.getMobility()).forEach(sq => usedSq.includes(sq)))
          ];
          break;
        case Piece.P:
          this.result[piece.getColor()] = [
            ...this.result[piece.getColor()],
            ...this.sqEval[SqEval.TYPE_USED][piece.getOppColor()]
              .filter(usedSq => piece.getCaptureSqs().includes(usedSq))
          ];
          break;
        default:
          this.result[piece.getColor()] = [
            ...this.result[piece.getColor()],
            ...this.sqEval[SqEval.TYPE_USED][piece.getOppColor()]
              .filter(usedSq => piece.getSq().includes(usedSq))
          ];
          break;
      }
    });

    this.result[Color.W].sort();
    this.result[Color.B].sort();

    return this.result;
  }
}

export default PressureEval;
