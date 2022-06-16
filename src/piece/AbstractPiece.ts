import Board from "../Board";
import Color from "../PGN/AN/Color";

abstract class AbstractPiece {
  protected color: string;

  protected sq: string;

  protected mobility: object;

  protected id: string;

  protected move: object;

  // TODO:
  // Add a basic Board to make the tests pass in the simplest possible way

  protected board: Board;

  public constructor(color: string, sq: string, id: string) {
    this.color = color;
    this.sq = sq;
    this.id = id;
  }

  protected abstract calcMobility(): AbstractPiece;

  getMobility(): object {
    return this.mobility;
  }

  getColor(): string {
    return this.color;
  }

  getOppColor(): string {
    return new Color().opp(this.color);
  }

  getMove(): object {
    return this.move;
  }

  getSq(): string {
    return this.sq;
  }

  getId(): string {
    return this.id;
  }
}

export default AbstractPiece;
