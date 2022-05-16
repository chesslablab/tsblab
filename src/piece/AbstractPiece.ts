import Color from "../PGN/AN/Color";

abstract class AbstractPiece {
  protected color: string;

  protected sq: string;

  protected mobility: any;

  protected board: Board;

  public constructor(color: string, sq: string) {
    this.color = color;
    this.sq = sq;
  }

  protected abstract calcMobility(): AbstractPiece;

  getMobility(): string[] {
    return this.mobility;
  }

  getColor(): string {
    return this.color;
  }

  getOppColor(): string {
    return new Color().opp(this.color);
  }
}

export default AbstractPiece;
