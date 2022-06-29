import Piece from "../PGN/AN/Piece";
import AbstractPiece from "./AbstractPiece";
import B from "./B";
import R from "./R";
import RType from "./RType";
import Slider from "./Slider";

class Q extends Slider {
  private rook: R;
  private bishop: B;

  constructor(color: string, sq: string) {
    super(color, sq, Piece.Q);
    this.rook = new R(color, sq, RType.SLIDER);
    this.bishop = new B(color, sq);
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

export default Q;
