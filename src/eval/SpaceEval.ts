import Board from '../Board';
import Color from '../PGN/AN/Color';
import Piece from '../PGN/AN/Piece';
import AbstractEval from './AbstractEval';
import SqEval from './SqEval';

class SpaceEval extends AbstractEval {
  static NAME: string = 'Space';

  private sqEval: object;

  public constructor(board: Board) {
    super(board);
    const sqEval = new SqEval(board);
    this.sqEval = {
      [SqEval.TYPE_FREE]: sqEval.eval(SqEval.TYPE_FREE),
      [SqEval.TYPE_USED]: sqEval.eval(SqEval.TYPE_USED)
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
      let sqs;
      switch (piece.getId()) {
        case Piece.K:
          sqs = new Set([
            ...this.result[piece.getColor()],
            ...this.sqEval[SqEval.TYPE_FREE].filter(freeSq =>
              Array.from(piece.getMobility()).forEach(sq => freeSq.includes(sq))
            )
          ]);
          this.result[piece.getColor()] = [...sqs];
          break;
        case Piece.P:
          sqs = this.sqEval[SqEval.TYPE_FREE]
            .filter(freeSq => piece.getCaptureSqs().includes(freeSq));
          this.result[piece.getColor()] = [
            ...new Set([
              ...this.result[piece.getColor()],
              ...sqs
            ])
          ];
          break;
        default:
          sqs = this.sqEval[SqEval.TYPE_USED][piece.oppColor()]
            .filter(usedSq => piece.getSq().includes(usedSq));
          this.result[piece.getColor()] = [
            ...new Set([
              ...this.result[piece.getColor()],
              ...sqs
            ])
          ];
          break;
      }
    });

    this.result[Color.W].sort();
    this.result[Color.B].sort();

    return this.result;
  }
}

export default SpaceEval;
