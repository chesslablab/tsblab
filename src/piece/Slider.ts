import Piece from "../PGN/AN/Piece";
import AbstractPiece from "./AbstractPiece";

abstract class Slider extends AbstractPiece {
  constructor(color: string, sq: string, id: string) {
    super(color, sq, id);
  }

  sqs(): Array<string> {
    let sqs = [];
    for (let direction of Object.values(this.mobility)) {
      for (let sq of direction) {
        if (
          !this.board.getSqEval().used[this.getColor()].includes(sq) &&
          !this.board.getSqEval().used[this.oppColor()].includes(sq)
        ) {
          sqs.push(sq);
        } else if (this.board.getSqEval().used[this.oppColor()].includes(sq)) {
          sqs.push(sq);
          break;
        } else if (this.board.getSqEval().used[this.getColor()].includes(sq)) {
          break;
        }
      }
    }

    return sqs;
  }

  defendedSqs(): Array<string> {
    let sqs = [];

    // TODO

    return sqs;
  }
}

export default Slider;
