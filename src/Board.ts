import BoardError from './error/BoardError';
import PressureEval from './eval/PressureEval';
import SpaceEval from './eval/SpaceEval';
import SqEval from './eval/SqEval';
import CastlingAbility from './FEN/field/CastlingAbility';
import Castle from './PGN/AN/Castle';
import Color from './PGN/AN/Color';
import Piece from './PGN/AN/Piece';
import Move from './PGN/Move';
import MoveShape from './PGN/MoveShape';
import AbstractPiece from './piece/AbstractPiece';
import B from './piece/B';
import K from './piece/K';
import N from './piece/N';
import P from './piece/P';
import PieceShape from './piece/PieceShape';
import Q from './piece/Q';
import R from './piece/R';
import RType from './piece/RType';

interface CaptureShape {
  capturing: {
    id: string,
    sq: string,
    type: null|string
  },
  captured: {
    key: number,
    id: string,
    sq: string,
    type: null|string
  }
}

interface HistoryShape {
  castlingAbility: string,
  sq: string,
  move: MoveShape
}

class Board extends Map {
  private turn: string;

  private captures: Array<CaptureShape>;

  private history: Array<HistoryShape>;

  private castlingAbility: string;

  private pressureEval: object;

  private spaceEval: object;

  private sqEval: object;

  constructor() {
    super();
    this.set(0, new R(Color.W, 'a1', RType.CASTLE_LONG));
    this.set(1, new N(Color.W, 'b1'));
    this.set(2, new B(Color.W, 'c1'));
    this.set(3, new Q(Color.W, 'd1'));
    this.set(4, new K(Color.W, 'e1'));
    this.set(5, new B(Color.W, 'f1'));
    this.set(6, new N(Color.W, 'g1'));
    this.set(7, new R(Color.W, 'h1', RType.CASTLE_SHORT));
    this.set(8, new P(Color.W, 'a2'));
    this.set(9, new P(Color.W, 'b2'));
    this.set(10, new P(Color.W, 'c2'));
    this.set(11, new P(Color.W, 'd2'));
    this.set(12, new P(Color.W, 'e2'));
    this.set(13, new P(Color.W, 'f2'));
    this.set(14, new P(Color.W, 'g2'));
    this.set(15, new P(Color.W, 'h2'));
    this.set(16, new R(Color.B, 'a8', RType.CASTLE_LONG));
    this.set(17, new N(Color.B, 'b8'));
    this.set(18, new B(Color.B, 'c8'));
    this.set(19, new Q(Color.B, 'd8'));
    this.set(20, new K(Color.B, 'e8'));
    this.set(21, new B(Color.B, 'f8'));
    this.set(22, new N(Color.B, 'g8'));
    this.set(23, new R(Color.B, 'h8', RType.CASTLE_SHORT));
    this.set(24, new P(Color.B, 'a7'));
    this.set(25, new P(Color.B, 'b7'));
    this.set(26, new P(Color.B, 'c7'));
    this.set(27, new P(Color.B, 'd7'));
    this.set(28, new P(Color.B, 'e7'));
    this.set(29, new P(Color.B, 'f7'));
    this.set(30, new P(Color.B, 'g7'));
    this.set(31, new P(Color.B, 'h7'));
    this.castlingAbility = CastlingAbility.START;

    this.refresh();
  }

  refresh(): void {
    this.turn = new Color().opp(this.turn);

    this.sqEval = {
      [SqEval.TYPE_FREE]: new SqEval(this).eval(SqEval.TYPE_FREE),
      [SqEval.TYPE_USED]: new SqEval(this).eval(SqEval.TYPE_USED)
    };

    this.spaceEval = new SpaceEval(this).eval();
  }

  getTurn(): string {
    return this.turn;
  }

  setTurn(color: string): Board {
    this.turn = new Color().validate(color);

    return this;
  }

  private pushCapture(color: string, capture: any): Board {
      this.captures[color].push(capture);

      return this;
  }

  private popCapture(color: string): Board {
    this.captures[color].pop();

    return this;
  }

  private pushHistory(piece: AbstractPiece): Board
  {
    this.history.push({
      'castlingAbility': this.castlingAbility,
      'sq': piece.getSq(),
      'move': piece.getMove()
    });

    return this;
  }

  private popHistory(): Board
  {
    this.history.pop();

    return this;
  }

  getCastlingAbility(): string {
    return this.castlingAbility;
  }

  getSpaceEval(): object {
    return this.spaceEval;
  }

  getSqEval(): object {
    return this.sqEval;
  }

  getPiecesByColor(color: string): Array<AbstractPiece> {
    let pieces = [];
    this.forEach((piece, key) => {
      if (piece.getColor() === color) {
        pieces.push(piece);
      }
    });

    return pieces;
  }

  getPieceBySq(sq: string): PieceShape|null {
    for (let [key, piece] of this.entries()) {
      if (piece.getSq() === sq) {
        return {
          key: key,
          value: piece
        }
      }
    }

    return null;
  }

  getPiece(color: string, id: string): PieceShape|null {
    for (let [key, piece] of this.entries()) {
      if (piece.getColor() === color && piece.getId() === id) {
        return {
          key: key,
          value: piece
        }
      }
    }

    return null;
  }

  play(color: string, pgn: string): boolean {
    const obj = Move.toObj(color, pgn);

    return this.isValidMove(obj) && this.isLegalMove(obj);
  }

  private pickPiece(move: MoveShape): Array<AbstractPiece> {
    let found = [];
    for (let piece of this.getPiecesByColor(move.color)) {
      if (piece.getId() === move.id) {
        if (piece.getId() === Piece.K) {
          return [piece.setMove(move)];
        } else if (piece.getSq().match(move.sq.current)) {
          found.push(piece.setMove(move));
        }
      }
    }
    if (!found) {
      throw new BoardError;
    }

    return found;
  }

  private capture(piece: AbstractPiece): Board {
    piece.sqs(); // creates the enPassantSquare property if the piece is a pawn
    const pieceBySq = this.getPieceBySq(piece.getMove().sq.next);
    let captured, capturingData, capturedData, capture;
    if (piece instanceof P && piece.getEnPassantSq() && !pieceBySq) {
      captured = this.getPieceBySq(piece.getEnPassantSq());
      if (captured) {
        const capturedData = {
          key: captured.key,
          id: captured.value.getId(),
          sq: piece.getEnPassantSq()
        };
      }
    } else {
      captured = this.getPieceBySq(piece.getMove().sq.next);
      if (captured) {
        capturedData = {
          key: captured.key,
          id: captured.value.getId(),
          sq: captured.value.getSq(),
          type: (<R>captured.value).getType()
        };
      }
    }
    if (captured) {
      capturingData = {
        id: piece.getId(),
        sq: piece.getSq(),
        type: (<R>piece).getType()
      };
      capture = {
        capturing: capturingData,
        captured: capturedData,
      };
      this.pushCapture(piece.getColor(), capture);
      this.delete(captured.key);
    }

    return this;
  }

  private promote(pawn: P): Board {
    const pieceBySq = this.getPieceBySq(pawn.getMove().sq.next);
    this.delete(pieceBySq.key);
    switch (pawn.getMove().newId) {
      case Piece.N:
        this.set(
          pieceBySq.key,
          new N(pawn.getColor(), pawn.getMove().sq.next)
        );
        break;
      case Piece.B:
        this.set(
          pieceBySq.key,
          new B(pawn.getColor(), pawn.getMove().sq.next)
        );
        break;
      case Piece.R:
        this.set(
          pieceBySq.key,
          new R(pawn.getColor(), pawn.getMove().sq.next, RType.PROMOTED)
        );
        break;
      default:
        this.set(
          pieceBySq.key,
          new Q(pawn.getColor(), pawn.getMove().sq.next)
        );
        break;
    }

    return this;
  }

  private isValidMove(move: MoveShape): boolean {
    if (move.color !== this.turn) {
      return false;
    } else if (
      move.isCapture &&
      move.id !== Piece.P &&
      !this.getPieceBySq(move.sq.next)
    ) {
      return false;
    } else if (!move.isCapture && this.getPieceBySq(move.sq.next)) {
      return false;
    }

    return true;
  }

  private leavesInCheck(piece: AbstractPiece): boolean {
    let leavesInCheck = false;
    const lastCastlingAbility = this.castlingAbility;
    if (
      piece.getMove().type === Move.CASTLE_SHORT ||
      piece.getMove().type === Move.CASTLE_LONG
    ) {
        this.castle(<K>piece);
        const king = this.getPiece(piece.getColor(), Piece.K);
        leavesInCheck = this.pressureEval[king.value.oppColor()].includes(king.value.getSq());
        this.undoCastle();
    } else {
        this.move(piece);
        const king = this.getPiece(piece.getColor(), Piece.K);
        leavesInCheck = this.pressureEval[king.value.oppColor()].includes(king.value.getSq());
        this.undoMove();
    }
    this.castlingAbility = lastCastlingAbility;

    return leavesInCheck;
  }

  private move(piece: AbstractPiece): boolean {
    if (piece.getMove().isCapture) {
      this.capture(piece);
    }
    const pieceBySq = this.getPieceBySq(piece.getSq());
    this.delete(pieceBySq.key);
    this.set(
      pieceBySq.key,
      this.createPiece(
        piece.getId(),
        piece.getColor(),
        piece.getMove().sq.next,
        (<R>piece).getType()
      )
    );
    if ((<P>piece).isPromoted()) {
      this.promote(<P>piece);
    }
    this.updateCastle(piece).pushHistory(piece).refresh();

    return true;
  }

  private undoMove(): Board {
    const last = this.history[this.history.length - 1];
    if (last) {
      const piece = this.getPieceBySq(last.move.sq.next);
      this.delete(piece.key);
      if (
        last.move.type === Move.PAWN_PROMOTES ||
        last.move.type === Move.PAWN_CAPTURES_AND_PROMOTES
      ) {
        const pieceUndone = new P(last.move.color, last.sq);
        this.set(piece.key, pieceUndone);
      } else {
        const pieceUndone = this.createPiece(
          piece.value.getId(),
          piece.value.getColor(),
          piece.value.getMove().sq.next,
          (<R>piece.value).getType()
        );
        this.set(piece.key, pieceUndone);
      }
      const capture = this.captures[last.move.color][this.captures[last.move.color] - 1];
      if (last.move.isCapture && capture) {
        const pieceCaptured = this.createPiece(
          capture.captured.id,
          last.move.color === Color.W ? Color.B : Color.W,
          capture.captured.sq,
          capture.captured.id === Piece.R ? capture.captured.type : null
        );
        this.set(capture.captured.key, pieceCaptured);
        this.popCapture(last.move.color);
      }
      this.popHistory().refresh();
    }

    return this;
  }

  private castle(king: K): boolean {
    const rook = king.getCastleRook(this.entries());
    if (rook) {
      let pieceBySq = this.getPieceBySq(king.getSq());
      this.delete(pieceBySq.key);
      this.set(
        pieceBySq.key,
        new K(
          king.getColor(),
          K.CASTLING_RULE[king.getColor()][Piece.K][king.getMove().pgn]['sq']['next']
        )
      );
      this.delete(rook.key);
      this.set(
        rook.key,
        new R(
          rook.value.getColor(),
          K.CASTLING_RULE[king.getColor()][Piece.R][king.getMove().pgn]['sq']['next'],
          rook.value.getType()
        )
      );
      this.castlingAbility = new CastlingAbility().castle(this.castlingAbility, this.turn);
      this.pushHistory(king).refresh();
      return true;
    }

    return false;
  }

  private undoCastle(): Board {
    const last = this.history[this.history.length - 1];
    const king = this.getPieceBySq(last.move.sq.next);
    const kingUndone = new K(last.move.color, last.sq);
    this.delete(king.key);
    this.set(king.key, kingUndone);
    if (Move.CASTLE_SHORT === last.move.type) {
      const rook = this.getPieceBySq(
        K.CASTLING_RULE[last.move.color][Piece.R][Castle.SHORT]['sq']['next']
      );
      const rookUndone = new R(
        last.move.color,
        K.CASTLING_RULE[last.move.color][Piece.R][Castle.SHORT]['sq']['current'],
        (<R>rook.value).getType()
      );
      this.delete(rook.key);
      this.set(rook.key, rookUndone);
    } else if (Move.CASTLE_LONG === last.move.type) {
      const rook = this.getPieceBySq(
        K.CASTLING_RULE[last.move.color][Piece.R][Castle.LONG]['sq']['next']
      );
      const rookUndone = new R(
        last.move.color,
        K.CASTLING_RULE[last.move.color][Piece.R][Castle.LONG]['sq']['current'],
        (<R>rook.value).getType()
      );
      this.delete(rook.key);
      this.set(rook.key, rookUndone);
    }
    this.popHistory().refresh();

    return this;
  }

  private updateCastle(pieceMoved: AbstractPiece): Board {
    const castlingAbility = new CastlingAbility();
    if (castlingAbility.can(this.castlingAbility, this.turn)) {
      if (pieceMoved.getId() === Piece.K) {
        this.castlingAbility = castlingAbility.remove(
          this.castlingAbility,
          this.turn,
          [Piece.K, Piece.Q]
        );
      } else if (pieceMoved instanceof R) {
        if (pieceMoved.getType() === RType.CASTLE_SHORT) {
            this.castlingAbility = castlingAbility.remove(
            this.castlingAbility,
            this.turn,
            [Piece.K]
          );
        } else if (pieceMoved.getType() === RType.CASTLE_LONG) {
          this.castlingAbility = castlingAbility.remove(
            this.castlingAbility,
            this.turn,
            [Piece.Q]
          );
        }
      }
    }
    const oppColor = new Color().opp(this.turn);
    if (castlingAbility.can(this.castlingAbility, oppColor)) {
      if (pieceMoved.getMove().isCapture) {
        if (pieceMoved.getMove().sq.next ===
          K.CASTLING_RULE[oppColor][Piece.R][Castle.SHORT]['sq']['current']
        ) {
          this.castlingAbility = castlingAbility.remove(
            this.castlingAbility,
            oppColor,
            [Piece.K]
          );
        } else if (
          pieceMoved.getMove().sq.next ===
          K.CASTLING_RULE[oppColor][Piece.R][Castle.LONG]['sq']['current']
        ) {
          this.castlingAbility = castlingAbility.remove(
            this.castlingAbility,
            oppColor,
            [Piece.Q]
          );
        }
      }
    }

    return this;
  }

  private isLegalMove(move: MoveShape): boolean {
    let isLegalMove = false;
    const pieces = this.pickPiece(move);
    const piece = pieces[0];
    if (pieces.length > 1) {
      for (let piece of pieces) {
        if (piece.isMovable() && !this.leavesInCheck(piece)) {
          return this.move(piece);
        }
      }
    } else if (piece) {
      if (piece.isMovable() && !this.leavesInCheck(piece)) {
        if (
          piece.getMove().type === Move.CASTLE_SHORT &&
          (<K>piece).sqCastleShort()
        ) {
          isLegalMove = this.castle(<K>piece);
        } else if (
          piece.getMove().type === Move.CASTLE_LONG &&
          (<K>piece).sqCastleLong()
        ) {
          isLegalMove = this.castle(<K>piece);
        } else {
          isLegalMove = this.move(piece);
        }
      }
    }

    return isLegalMove;
  }

  // TODO
  // This is a workaround method to be replaced with a one-liner.
  // Find out how to dynamically create an object from a string.
  private createPiece(
    id: string,
    color: string,
    sq: string,
    type?: string
  ): AbstractPiece {
    switch (id) {
      case 'P':
        return new P(color, sq);
      case 'N':
        return new N(color, sq);
      case 'B':
        return new B(color, sq);
      case 'Q':
        return new Q(color, sq);
      case 'K':
        return new K(color, sq);
      case 'R':
        return new R(color, sq, type);
      default:
        return null;
    }
  }
}

export default Board;
