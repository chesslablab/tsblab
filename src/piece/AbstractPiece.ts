abstract class AbstractPiece {
  protected color: string;

  protected sq: string;

  protected mobility: any;

  public constructor(color: string, sq: string) {
    this.color = color;
    this.sq = sq;
  }

  protected abstract calcMobility(): AbstractPiece;

  getMobility(): string[] {
    return this.mobility;
  }
}

export default AbstractPiece;
