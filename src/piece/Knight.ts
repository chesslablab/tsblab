import Piece from "../PGN/AN/Piece";
import Square from "../PGN/AN/Square";
import AbstractPiece from "./AbstractPiece";

class Knight extends AbstractPiece {
  protected mobility: string[] = [];

  constructor(color: string, sq: string) {
    super(color, sq, Piece.K);
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
    let sqs = [];

    // TODO

    return sqs;
  }
}

export default Knight;
