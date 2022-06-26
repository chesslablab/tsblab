import PieceTypeError from '../error/PieceTypeError';
import Square from "../PGN/AN/Square";
import Piece from "../PGN/AN/Piece";
import AbstractPiece from "./AbstractPiece";
import RookType from './RookType';
import Slider from "./Slider";

interface MobilityShape {
  up: string[],
  down: string[],
  left: string[],
  right: string[]
}

class Rook extends Slider {
  protected mobility: MobilityShape = {
    up: [],
    down: [],
    left: [],
    right: []
  };

  private type: string;

  constructor(color: string, sq: string, type: string) {
    if (!RookType.all().includes(type)) {
      throw new PieceTypeError;
    }
    super(color, sq, Piece.R);
    this.type = type;
    this.calcMobility();
  }

  getType(): string {
    return this.type;
  }

  protected calcMobility(): AbstractPiece {
    try {
      let file = this.sq[0];
      let rank = String.fromCharCode(this.sq[1].charCodeAt(0) + 1);
      while (new Square().validate(file + rank)) {
        this.mobility.up.push(file + rank);
        rank = String.fromCharCode(rank.charCodeAt(0) + 1);
      }
    } catch (e) {

    }
    try {
      let file = this.sq[0];
      let rank = String.fromCharCode(this.sq[1].charCodeAt(0) - 1);
      while (new Square().validate(file + rank)) {
        this.mobility.down.push(file + rank);
        rank = String.fromCharCode(rank.charCodeAt(0) - 1);
      }
    } catch (e) {

    }
    try {
      let file = String.fromCharCode(this.sq[0].charCodeAt(0) - 1);
      let rank = this.sq[1];
      while (new Square().validate(file + rank)) {
        this.mobility.left.push(file + rank);
        file = String.fromCharCode(file.charCodeAt(0) - 1);
      }
    } catch (e) {

    }
    try {
      let file = String.fromCharCode(this.sq[0].charCodeAt(0) + 1);
      let rank = this.sq[1];
      while (new Square().validate(file + rank)) {
        this.mobility.right.push(file + rank);
        file = String.fromCharCode(file.charCodeAt(0) + 1);
      }
    } catch (e) {

    }

    return this;
  }
}

export default Rook;
