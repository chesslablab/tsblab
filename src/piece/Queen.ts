import Piece from "../PGN/AN/Piece";
import AbstractPiece from "./AbstractPiece";
import Bishop from "./Bishop";
import Rook from "./Rook";
import RookType from "./RookType";
import Slider from "./Slider";

class Queen extends Slider {
  private rook: Rook;
  private bishop: Bishop;

  constructor(color: string, sq: string) {
    super(color, sq, Piece.Q);
    this.rook = new Rook(color, sq, RookType.SLIDER);
    this.bishop = new Bishop(color, sq);
    this.calcMobility();
  }

  protected calcMobility(): AbstractPiece {
    this.mobility = {
      ...this.rook.getMobility(),
      ...this.bishop.getMobility()
    };

    return this;
  }
}

export default Queen;
