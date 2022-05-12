import Square from "../PGN/AN/Square";
import AbstractPiece from "./AbstractPiece";

class Knight extends AbstractPiece {
  constructor(color: string, sq: string) {
    super(color, sq);
    this.mobility = [];
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
}

export default Knight;
