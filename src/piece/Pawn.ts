import Color from "../PGN/AN/Color";
import Piece from "../PGN/AN/Piece";
import Square from "../PGN/AN/Square";
import AbstractPiece from "./AbstractPiece";
import PawnRanks from "./PawnRanks";

class Pawn extends AbstractPiece {
  private file: string;
  private ranks: PawnRanks;
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
      this.file = String.fromCharCode(this.file.charCodeAt(0) - 1);
      if (new Square().validate(this.file + this.ranks.next)) {
        this.captureSqs.push(this.file + this.ranks.next);
      }
    } catch (e) {

    }

    try {
      this.file = String.fromCharCode(this.file.charCodeAt(0) + 1);
      if (new Square().validate(this.file + this.ranks.next)) {
        this.captureSqs.push(this.file + this.ranks.next);
      }
    } catch (e) {

    }

    return this;
  }

  // public sqs(): string[] {
  //   let sqs = [];
  //   for (let sq of this.mobility) {
  //     if (this.board.getSqEval().free.includes(sq)) {
  //       sqs.push(sq);
  //     } else {
  //       break;
  //     }
  //   }

  //   for (let sq of this.captureSqs) {
  //     if (this.board.getSqEval().used[this.getOppColor()].includes(sq)) {
  //       sqs.push(sq);
  //     }
  //   }

  //   if (this.board.getLastHistory() && 
  //       this.board.getLastHistory().move.id === Piece.P && 
  //       this.board.getLastHistory().move.color === this.getOppColor()) {
  //     if (this.color === Color.W) {
  //       if (Number(this.sq[1]) === 5) {
  //         let captureSquare = this.board.getLastHistory().move.sq.next[0] + 
  //         (this.board.getLastHistory().move.sq.next[1] + 1);
  //         if (this.captureSqs.includes(captureSquare)) {
  //           this.enPassantSq = this.board.getLastHistory().move.sq.next;
  //           sqs.push(captureSquare);
  //         }
  //       }
  //     } else if (this.color === Color.B) {
  //       if (Number(this.sq[1]) === 4) {
  //         let captureSquare = this.board.getLastHistory().move.sq.next[0] + 
  //         (this.board.getLastHistory().move.sq.next[1] - 1);
  //         if (this.captureSqs.includes(captureSquare)) {
  //           this.enPassantSq = this.board.getLastHistory().move.sq.next;
  //           sqs.push(captureSquare);
  //         }
  //       }
  //     }
  //   }

  //   return sqs;
  // }

  // public defendedSqs(): string[] {
  //   let sqs = [];
  //   for (let sq of this.captureSqs) {
  //     if (this.board.getSqEval().used[this.getColor()].includes(sq)) {
  //       sqs.push(sq);
  //     }
  //   }

  //   return sqs;
  // }

  // public getRanks(): PawnRanks {
  //   return this.ranks;
  // }

  // public getCapturedSqs(): string[] {
  //   return this.captureSqs;
  // }

  // public getEnPassantSqs(): string {
  //   return this.enPassantSq;
  // }

  // public isPromoted(): boolean {
  //   return (this.move.newId && Number(this.getMove().sq.next[1]) === this.ranks.promotion);
  // }
}

export default Pawn;