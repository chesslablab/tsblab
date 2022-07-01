import Board from '../Board';
import Color from '../PGN/AN/Color';
import Piece from '../PGN/AN/Piece';
import P from '../piece/P';
import AbstractEval from './AbstractEval';
import SqEval from './SqEval';

class ConnectivityEval extends AbstractEval {
  static NAME: string = 'Connectivity';

  private sqEval: object;

  constructor(board: Board) {
    super(board);
    const sqEval = new SqEval(board);
    this.sqEval = {
      [SqEval.TYPE_FREE]: sqEval.eval(SqEval.TYPE_FREE),
      [SqEval.TYPE_USED]: sqEval.eval(SqEval.TYPE_USED)
    };

    this.result = {
      [Color.W]: 0,
      [Color.B]: 0
    };
  }

  public eval = (): any => {
    this.color(Color.W);
    this.color(Color.B);

    return this.result;
  }

  private color = (color: string): void => {
    this.board.getPiecesByColor(color).forEach(piece => {
      switch (piece.getId()) {
        case Piece.K:
          this.result[color] += this.sqEval[SqEval.TYPE_USED][color]
            .filter(usedSq => Array.from(piece.getMobility()).includes(usedSq)).length;
          break;
        case Piece.N:
          this.result[color] += this.sqEval[SqEval.TYPE_USED][color]
            .filter(usedSq => piece.getMobility().includes(usedSq)).length;
          break;
        case Piece.P:
          if (piece instanceof P) {
            this.result[color] += this.sqEval[SqEval.TYPE_USED][color]
              .filter(usedSq => piece.getCaptureSqs().includes(usedSq)).length;
          }
          break;
        default:
          for (const key in piece.getMobility()) {
            const val = piece.getMobility()[key];
            for (let sq of val) {
              if (this.sqEval[SqEval.TYPE_USED][color].includes(sq)) {
                this.result[color] += 1;
                break;
              } else if (this.sqEval[SqEval.TYPE_USED][piece.oppColor()].includes(sq)) {
                break;
              }
            }
          }

          break;
      }
    });
  }
}

export default ConnectivityEval;
