import AbstractPiece from "./AbstractPiece";

abstract class Slider extends AbstractPiece {
  constructor(color: string, sq: string, id: string) {
    super(color, sq);    
  }
  public sqs(): string[] {
    let sqs = [];
    for (let direction of this.getMobility()) {
      for (let sq of direction) {
        if (this.board.getSqEval().used[this.getColor()].includes(sq) && this.board.getSqEval().used[this.getOppColor()].includes(sq)) {
          sqs.push(sq);
        }
        else if (this.board.getSqEval().used[this.getOppColor()].includes(sq)) {
          sqs.push(sq);
          break;
        }
        else if (this.board.getSqEval().used[this.getColor()].includes(sq)) {
          break;
        }
      }
    }

    return sqs;
  }

  public defendedSqs(): string[] {
    let sqs = [];
    for (let direction of this.mobility) {
      for (let sq of direction) {
        if (this.board.getSqEval().used[this.getColor()].includes(sq)) {
          sqs.push(sq);
          break;
        }
        else if (this.board.getSqEval().used[this.getOppColor()].includes(sq)) {
          break;
        }
      }
    }

    return sqs;
  }
}

export default Slider;