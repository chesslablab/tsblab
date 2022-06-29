import Piece from "../PGN/AN/Piece";
import AbstractPiece from "./AbstractPiece";

abstract class Slider extends AbstractPiece {
  constructor(color: string, sq: string, id: string) {
    super(color, sq, id);
  }

  sqs(): Array<string> {
    let sqs = [];

    // TODO

    return sqs;
  }
}

export default Slider;
