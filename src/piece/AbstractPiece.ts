import Board from "../Board";
import MoveShape from '../PGN/MoveShape';
import Color from "../PGN/AN/Color";

abstract class AbstractPiece {
  protected color: string;

  protected sq: string;

  protected mobility: object;

  protected id: string;

  protected move: MoveShape;

  protected board: Board;

  public constructor(color: string, sq: string, id: string) {
    this.color = color;
    this.sq = sq;
    this.id = id;
  }

  protected abstract calcMobility(): AbstractPiece;

  abstract sqs(): Array<string>;

  getMobility(): object {
    return this.mobility;
  }

  getColor(): string {
    return this.color;
  }

  getMove(): MoveShape {
    return this.move;
  }

  setMove(move: MoveShape): AbstractPiece
  {
    this.move = move;

    return this;
  }

  getSq(): string {
    return this.sq;
  }

  getId(): string {
    return this.id;
  }

  oppColor(): string {
    return new Color().opp(this.color);
  }

  isMovable(): boolean {
    if (this.move) {
      return this.sqs().includes(this.move.sq.next);
    }

    return false;
  }

  updateBoard(board: Board): void
  {
    this.board = board;
  }
}

export default AbstractPiece;
