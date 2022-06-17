import Board from '../Board';
import Color from '../PGN/AN/Color';
import Piece from '../PGN/AN/Piece';
import AbstractEvaluation from './AbstractEvaluation';
import SqEvaluation from './SqEvaluation';

class SpaceEvaluation extends AbstractEvaluation {
  static NAME: string = 'Space';

  private sqEval: object;

  public constructor(board: Board) {
    super(board);
    const sqEvaluation = new SqEvaluation(board);
    this.sqEval = {
      [SqEvaluation.TYPE_FREE]: sqEvaluation.eval(SqEvaluation.TYPE_FREE),
      [SqEvaluation.TYPE_USED]: sqEvaluation.eval(SqEvaluation.TYPE_USED)
    };
    this.result = {
      [Color.W]: [],
      [Color.B]: []
    };
  }

  public eval = (): object => {
    this.result = {
      [Color.W]: [],
      [Color.B]: []
    };
    this.board.forEach((piece, key) => {
      let uniqueSqs;
      switch (piece.getId()) {
        case Piece.K:
          uniqueSqs = new Set([
            ...this.result[piece.getColor()],
            ...this.sqEval[SqEvaluation.TYPE_FREE].filter((freeSq) => {
              const mobility = piece.getMobility();
              for (let mobilityElement in mobility) {
                if (mobility[mobilityElement].includes(freeSq)) {
                  return true;
                }
              }

              return false;
            })
          ]);
          this.result[piece.getColor()] = [...uniqueSqs];
          break;
        case Piece.P:
          uniqueSqs = new Set([
            ...this.result[piece.getColor()],
            ...this.sqEval[SqEvaluation.TYPE_FREE].filter((freeSq) => {
              return piece.getCaptureSqs().includes(freeSq);
            })
          ]);
          this.result[piece.getColor()] = [...uniqueSqs];
          break;
        default:
          uniqueSqs = new Set([
            ...this.result[piece.getColor()],
            ...this.sqEval[SqEvaluation.TYPE_USED][piece.getOppColor()].filter((usedSq) => {
              return piece.getSq().includes(usedSq);
            })
          ]);
          this.result[piece.getColor()] = [...uniqueSqs];
          break;
      }
    });

    this.result[Color.W].sort();
    this.result[Color.B].sort();

    return this.result;
  }
}

export default SpaceEvaluation;
