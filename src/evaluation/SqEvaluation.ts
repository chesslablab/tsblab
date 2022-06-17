import Board from '../Board';
import Color from '../PGN/AN/Color';
import AbstractPiece from '../piece/AbstractPiece';
import AbstractEvaluation from './AbstractEvaluation';

class SqEvaluation extends AbstractEvaluation {
  static NAME: string = 'Square';
  static TYPE_FREE: string = 'free';
  static TYPE_USED: string = 'used';

  public constructor(board: Board) {
    super(board);

    this.result = {
      [Color.B]: [],
      [Color.W]: []
    };
  }

  public eval = (feature: string): any => {
    switch (feature) {
      case SqEvaluation.TYPE_FREE:
        this.result = this.free(this.board);
        break;
      case SqEvaluation.TYPE_USED:
        this.result = this.used(this.board);
        break;
    }

    return this.result;
  }

  private all = (): string[] => {
    let all = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 1; j <= 8; j++) {
        all.push(String.fromCharCode('a'.charCodeAt(0) + i) + j);
      }
    }

    return all;
  }

  private free = (pieces: Map<number, AbstractPiece>): string[] => {
    let used = this.used(pieces);
    let usedSqs = [...used[Color.B], ...used[Color.W]];

    return this.all().filter(sq => !usedSqs.includes(sq));
  }

  private used = (pieces: Map<number, AbstractPiece>): object => {
    let used = {
      [Color.W]: [],
      [Color.B]: []
    };
    pieces.forEach((piece, key) => {
      used[piece.getColor()].push(piece.getSq());
    });

    return used;
  }
}

export default SqEvaluation;
