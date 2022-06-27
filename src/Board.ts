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
import Bishop from './piece/Bishop';
import King from './piece/King';
import Knight from './piece/Knight';
import Pawn from './piece/Pawn';
import PieceShape from './piece/PieceShape';
import Queen from './piece/Queen';
import Rook from './piece/Rook';
import RookType from './piece/RookType';

interface HistoryShape {
  castlingAbility: string,
  sq: string,
  move: MoveShape
}

class Board extends Map {
  private turn: string;

  private history: Array<HistoryShape>;

  private castlingAbility: string;

  private pressureEval: object;

  private spaceEval: object;

  private sqEval: object;

  constructor() {
    super();
    this.set(0, new Rook(Color.W, 'a1', RookType.CASTLE_LONG));
    this.set(1, new Knight(Color.W, 'b1'));
    this.set(2, new Bishop(Color.W, 'c1'));
    this.set(3, new Queen(Color.W, 'd1'));
    this.set(4, new King(Color.W, 'e1'));
    this.set(5, new Bishop(Color.W, 'f1'));
    this.set(6, new Knight(Color.W, 'g1'));
    this.set(7, new Rook(Color.W, 'h1', RookType.CASTLE_SHORT));
    this.set(8, new Pawn(Color.W, 'a2'));
    this.set(9, new Pawn(Color.W, 'b2'));
    this.set(10, new Pawn(Color.W, 'c2'));
    this.set(11, new Pawn(Color.W, 'd2'));
    this.set(12, new Pawn(Color.W, 'e2'));
    this.set(13, new Pawn(Color.W, 'f2'));
    this.set(14, new Pawn(Color.W, 'g2'));
    this.set(15, new Pawn(Color.W, 'h2'));
    this.set(16, new Rook(Color.B, 'a8', RookType.CASTLE_LONG));
    this.set(17, new Knight(Color.B, 'b8'));
    this.set(18, new Bishop(Color.B, 'c8'));
    this.set(19, new Queen(Color.B, 'd8'));
    this.set(20, new King(Color.B, 'e8'));
    this.set(21, new Bishop(Color.B, 'f8'));
    this.set(22, new Knight(Color.B, 'g8'));
    this.set(23, new Rook(Color.B, 'h8', RookType.CASTLE_SHORT));
    this.set(24, new Pawn(Color.B, 'a7'));
    this.set(25, new Pawn(Color.B, 'b7'));
    this.set(26, new Pawn(Color.B, 'c7'));
    this.set(27, new Pawn(Color.B, 'd7'));
    this.set(28, new Pawn(Color.B, 'e7'));
    this.set(29, new Pawn(Color.B, 'f7'));
    this.set(30, new Pawn(Color.B, 'g7'));
    this.set(31, new Pawn(Color.B, 'h7'));
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

  public getPiecesByColor = (color: string): AbstractPiece[] => {
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

  private pickPiece(move: MoveShape): Array<AbstractPiece>
  {
    let found = [];
    for (let piece of this.getPiecesByColor(move.color)) {
      if (piece.getId() === move.id) {
        if (piece.getId() === Piece.K) {
          return [piece.setMove(move)];
        } else if (piece.getSq().match(new RegExp('^' + move.sq.current + '$'))) {
          found.push(piece.setMove(move));
        }
      }
    }
    if (!found) {
      throw new BoardError;
    }

    return found;
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
    if (piece instanceof King) {
      const lastCastlingAbility = this.castlingAbility;
      if (
        piece.getMove().type === Move.CASTLE_SHORT ||
        piece.getMove().type === Move.CASTLE_LONG
      ) {
          this.castle(piece);
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
    }

    return leavesInCheck;
  }

  private move(piece: AbstractPiece): boolean {
    // TODO

    return true;
  }

  private castle(king: King): boolean {
    const rook = king.getCastleRook(this.entries());
    if (rook) {
      let pieceBySq = this.getPieceBySq(king.getSq());
      this.delete(pieceBySq.key);
      this.set(
        pieceBySq.key,
        new King(
          king.getColor(),
          King.CASTLING_RULE[king.getColor()][Piece.K][king.getMove().pgn]['sq']['next']
        )
      );
      this.delete(rook.key);
      this.set(
        rook.key,
        new Rook(
          rook.value.getColor(),
          King.CASTLING_RULE[king.getColor()][Piece.R][king.getMove().pgn]['sq']['next'],
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
    // TODO

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
      } else if (pieceMoved instanceof Rook) {
        if (pieceMoved.getType() === RookType.CASTLE_SHORT) {
            this.castlingAbility = castlingAbility.remove(
            this.castlingAbility,
            this.turn,
            [Piece.K]
          );
        } else if (pieceMoved.getType() === RookType.CASTLE_LONG) {
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
          King.CASTLING_RULE[oppColor][Piece.R][Castle.SHORT]['sq']['current']
        ) {
          this.castlingAbility = castlingAbility.remove(
            this.castlingAbility,
            oppColor,
            [Piece.K]
          );
        } else if (
          pieceMoved.getMove().sq.next ===
          King.CASTLING_RULE[oppColor][Piece.R][Castle.LONG]['sq']['current']
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
          piece instanceof King &&
          piece.getMove().type === Move.CASTLE_SHORT &&
          piece.sqCastleShort()
        ) {
          isLegalMove = this.castle(piece);
        } else if (
          piece instanceof King &&
          piece.getMove().type === Move.CASTLE_LONG &&
          piece.sqCastleLong()
        ) {
          isLegalMove = this.castle(piece);
        } else {
          isLegalMove = this.move(piece);
        }
      }
    }

    return isLegalMove;
  }
}

export default Board;
