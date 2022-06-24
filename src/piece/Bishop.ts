import AbstractPiece from './AbstractPiece';
import BishopMobility from './BishopMobility';
import Slider from './Slider';
import Square from '../PGN/AN/Square';
import Piece from '../PGN/AN/Piece';

class Bishop extends Slider {
  protected mobility: BishopMobility = {
    upLeft: [],
    upRight: [],
    downLeft: [],
    downRight: []
  };

  constructor(color: string, sq: string) {
    super(color, sq, Piece.B);
    this.calcMobility()
  }

  protected calcMobility(): AbstractPiece {
    try {
      let file = String.fromCharCode(this.sq[0].charCodeAt(0) - 1);
      let rank = String.fromCharCode(this.sq[1].charCodeAt(0) + 1);
      while (new Square().validate(file + rank)) {
        this.mobility.upLeft.push(file + rank);
        file = String.fromCharCode(file.charCodeAt(0) - 1);
        rank = String.fromCharCode(rank.charCodeAt(0) + 1);
      }
    } catch (e) {

    }
    try {
      let file = String.fromCharCode(this.sq[0].charCodeAt(0) + 1);
      let rank = String.fromCharCode(this.sq[1].charCodeAt(0) + 1);
      while (new Square().validate(file + rank)) {
        this.mobility.upRight.push(file + rank);
        file = String.fromCharCode(file.charCodeAt(0) + 1);
        rank = String.fromCharCode(rank.charCodeAt(0) + 1);
      }
    } catch (e) {

    }
    try {
      let file = String.fromCharCode(this.sq[0].charCodeAt(0) - 1);
      let rank = String.fromCharCode(this.sq[1].charCodeAt(0) - 1);
      while (new Square().validate(file + rank)) {
        this.mobility.downLeft.push(file + rank);
        file = String.fromCharCode(file.charCodeAt(0) - 1);
        rank = String.fromCharCode(rank.charCodeAt(0) - 1);
      }
    } catch (e) {

    }
    try {
      let file = String.fromCharCode(this.sq[0].charCodeAt(0) + 1);
      let rank = String.fromCharCode(this.sq[1].charCodeAt(0) - 1);
      while (new Square().validate(file + rank)) {
        this.mobility.downRight.push(file + rank);
        file = String.fromCharCode(file.charCodeAt(0) + 1);
        rank = String.fromCharCode(rank.charCodeAt(0) - 1);
      }
    } catch (e) {

    }

    return this;
  }

}

export default Bishop;
