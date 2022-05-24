import PieceTypeError from '../error/PieceTypeError';
import Square from "../PGN/AN/Square";
import Piece from "../PGN/AN/Piece";
import AbstractPiece from "./AbstractPiece";
import RookMobility from './RookMobility';
import RookType from './RookType';
import Slider from "./Slider";

class Rook extends Slider {
  protected mobility: RookMobility;

  private type: string;

  constructor(color: string, sq: string, type: string) {
    if (!RookType.all().includes(type)) {
      throw new PieceTypeError;
    }

    super(color, sq, Piece.R);

    this.mobility = {
      up: [],
      bottom: [],
      left: [],
      right: []
    };

    this.type = type;

    this.calcMobility();
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
        this.mobility.bottom.push(file + rank);
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
