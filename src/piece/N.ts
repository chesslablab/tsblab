import Piece from "../PGN/AN/Piece";
import Square from "../PGN/AN/Square";
import AbstractPiece from "./AbstractPiece";

class N extends AbstractPiece {
  protected mobility: string[] = [];

  constructor(color: string, sq: string) {
    super(color, sq, Piece.N);
    this.calcMobility();
  }

  protected calcMobility = (): AbstractPiece => {
    try {
      const file = String.fromCharCode(this.sq[0].charCodeAt(0) - 1);
      const rank = String.fromCharCode(this.sq[1].charCodeAt(0) + 2);
      if (new Square().validate(file + rank)) {
        this.mobility.push(file + rank);
      }
    } catch (e) {

    }
    try {
      const file = String.fromCharCode(this.sq[0].charCodeAt(0) - 2);
      const rank = String.fromCharCode(this.sq[1].charCodeAt(0) + 1);
      if (new Square().validate(file + rank)) {
        this.mobility.push(file + rank);
      }
    } catch (e) {

    }
    try {
      const file = String.fromCharCode(this.sq[0].charCodeAt(0) - 2);
      const rank = String.fromCharCode(this.sq[1].charCodeAt(0) - 1);
      if (new Square().validate(file + rank)) {
        this.mobility.push(file + rank);
      }
    } catch (e) {

    }
    try {
      const file = String.fromCharCode(this.sq[0].charCodeAt(0) - 1);
      const rank = String.fromCharCode(this.sq[1].charCodeAt(0) - 2);
      if (new Square().validate(file + rank)) {
        this.mobility.push(file + rank);
      }
    } catch (e) {

    }
    try {
      const file = String.fromCharCode(this.sq[0].charCodeAt(0) + 1);
      const rank = String.fromCharCode(this.sq[1].charCodeAt(0) - 2);
      if (new Square().validate(file + rank)) {
        this.mobility.push(file + rank);
      }
    } catch (e) {

    }
    try {
      const file = String.fromCharCode(this.sq[0].charCodeAt(0) + 2);
      const rank = String.fromCharCode(this.sq[1].charCodeAt(0) - 1);
      if (new Square().validate(file + rank)) {
        this.mobility.push(file + rank);
      }
    } catch (e) {

    }
    try {
      const file = String.fromCharCode(this.sq[0].charCodeAt(0) + 2);
      const rank = String.fromCharCode(this.sq[1].charCodeAt(0) + 1);
      if (new Square().validate(file + rank)) {
        this.mobility.push(file + rank);
      }
    } catch (e) {

    }
    try {
      const file = String.fromCharCode(this.sq[0].charCodeAt(0) + 1);
      const rank = String.fromCharCode(this.sq[1].charCodeAt(0) + 2);
      if (new Square().validate(file + rank)) {
        this.mobility.push(file + rank);
      }
    } catch (e) {

    }

    return this
  }

  sqs(): Array<string> {
    let sqs = this.mobility.filter(sq => {
      if (this.board.getSqEval().free.includes(sq)) {
        return true;
      } else if (this.board.getSqEval().used[this.oppColor()]) {
        return true;
      }
    });

    return sqs;
  }

  defendedSqs(): Array<string> {
    let sqs = this.mobility.filter(sq => this.board.getSqEval().used[this.getColor()].includes(sq));

    return sqs;
  }
}

export default N;
