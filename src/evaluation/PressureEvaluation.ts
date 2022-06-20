import Board from '../Board';
import Color from '../PGN/AN/Color';
import Piece from '../PGN/AN/Piece';
import AbstractEvaluation from './AbstractEvaluation';
import SqEvaluation from './SqEvaluation';

class PressureEvaluation extends AbstractEvaluation {
  static NAME: string = 'Pressure';

  private sqEval: object;

  constructor(board: Board) {
    super(board);
    let sqEvaluation = new SqEvaluation(board);
    this.sqEval = {
      [SqEvaluation.TYPE_FREE]: sqEvaluation.eval(SqEvaluation.TYPE_FREE),
      [SqEvaluation.TYPE_USED]: sqEvaluation.eval(SqEvaluation.TYPE_USED)
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
            ...this.sqEval[SqEvaluation.TYPE_USED][piece.getOppColor()]
              .filter(usedSq => Array.from(piece.getMobility()).forEach(sq => usedSq.includes(sq)))
          ];
          break;
        case Piece.P:
          this.result[piece.getColor()] = [
            ...this.result[piece.getColor()],
            ...this.sqEval[SqEvaluation.TYPE_USED][piece.getOppColor()]
              .filter(usedSq => piece.getCaptureSqs().includes(usedSq))
          ];
          break;
        default:
          this.result[piece.getColor()] = [
            ...this.result[piece.getColor()],
            ...this.sqEval[SqEvaluation.TYPE_USED][piece.getOppColor()]
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

export default PressureEvaluation;
