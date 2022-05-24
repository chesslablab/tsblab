import AbstractPiece from './AbstractPiece';
import BishopMobility from './BishopMobility';
import Square from '../PGN/AN/Square';

class Bishop extends AbstractPiece {
  protected mobility: BishopMobility = {
    upLeft: [],
    upRight: [],
    bottomLeft: [],
    bottomRight: []
  };

  constructor(color: string, sq: string) {
    super(color, sq);
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
        this.mobility.bottomLeft.push(file + rank);
        file = String.fromCharCode(file.charCodeAt(0) - 1);
        rank = String.fromCharCode(rank.charCodeAt(0) - 1);
      }
    } catch (e) {

    }
    try {
      let file = String.fromCharCode(this.sq[0].charCodeAt(0) + 1);
      let rank = String.fromCharCode(this.sq[1].charCodeAt(0) - 1);
      while (new Square().validate(file + rank)) {
        this.mobility.bottomRight.push(file + rank);
        file = String.fromCharCode(file.charCodeAt(0) + 1);
        rank = String.fromCharCode(rank.charCodeAt(0) - 1);
      }
    } catch (e) {

    }

    return this;
  }

}

export default Bishop;
