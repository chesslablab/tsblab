import Color from "../PGN/AN/Color";
import Piece from "../PGN/AN/Piece";
import Square from "../PGN/AN/Square";
import AbstractPiece from "./AbstractPiece";

interface RanksShape {
  initial: number,
  next: number,
  promotion: number
}

class P extends AbstractPiece {
  private file: string;
  private ranks: RanksShape;
  private captureSqs: string[];
  private enPassantSq: string = '';
  protected mobility: string[];

  constructor(color: string, sq: string) {
    super(color, sq, Piece.P);
    this.file = this.sq[0];

    if (this.color === Color.W) {
      this.ranks = {
        initial: 2,
        next: Number(this.sq[1]) + 1,
        promotion: 8
      };
    } else if (this.color === Color.B) {
      this.ranks = {
        initial: 7,
        next: Number(this.sq[1]) - 1,
        promotion: 1
      };
    }

    this.captureSqs = [];
    this.mobility = [];
    this.calcMobility();
  }

  protected calcMobility(): AbstractPiece {
    try {
      if (new Square().validate(this.file + this.ranks.next)) {
        this.mobility.push(this.file + this.ranks.next);
      }
    } catch (e) {

    }

    if (this.sq[1] === '2' && this.ranks.initial === 2) {
      this.mobility.push(this.file + (this.ranks.initial + 2));
    } else if (this.sq[1] === '7' && this.ranks.initial === 7) {
      this.mobility.push(this.file + (this.ranks.initial - 2));
    }

    try {
      this.file = String.fromCharCode(this.sq[0].charCodeAt(0) - 1);
      if (new Square().validate(this.file + this.ranks.next)) {
        this.captureSqs.push(this.file + this.ranks.next);
      }
    } catch (e) {

    }

    try {
      this.file = String.fromCharCode(this.sq[0].charCodeAt(0) + 1);
      if (new Square().validate(this.file + this.ranks.next)) {
        this.captureSqs.push(this.file + this.ranks.next);
      }
    } catch (e) {

    }

    return this;
  }

  sqs(): Array<string> {
    let sqs = [];
    const end = this.board.getHistory()[this.board.getHistory().length - 1];

    // mobility squares
    for (let sq of this.mobility) {
      if (this.board.getSqEval().free.includes(sq)) {
        sqs.push(sq);
      } else {
        break;
      }
    }

    // capture squares
    for (let sq of this.captureSqs) {
      if (this.board.getSqEval().used[this.oppColor()].includes(sq)) {
        sqs.push(sq);
      } else {
        break;
      }
    }

    // en passant squares
    if (end && end.move.id === Piece.P && end.move.color === this.oppColor()) {
      if (this.color === Color.W) {
        if (Number(this.sq.charAt(1)) === 5) {
          const captureSq = end.move.sq.next.charAt(0) + String.fromCharCode(end.move.sq.next.charCodeAt(1) + 1);
          if (this.captureSqs.includes(captureSq)) {
            this.enPassantSq = end.move.sq.next;
            sqs.push(captureSq);
          }
        }
      } else if (this.color === Color.B) {
        if (Number(this.sq.charAt(1)) === 4) {
          const captureSq = end.move.sq.next.charAt(0) + String.fromCharCode(end.move.sq.next.charCodeAt(1) - 1);
          if (this.captureSqs.includes(captureSq)) {
            this.enPassantSq = end.move.sq.next;
            sqs.push(captureSq);
          }
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

  getCaptureSqs(): string[] {
    return this.captureSqs;
  }

  getEnPassantSq(): string {
    return this.enPassantSq;
  }

  isPromoted(): boolean {
    return (this.move.newId && Number(this.getMove().sq.next[1]) === this.ranks.promotion);
  }
}

export default P;
