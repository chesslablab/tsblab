import UnknownNotationError from "../error/UnknownNotationError";
import King from "../piece/King";
import AbstractNotation from "./AbstractNotation";
import MoveJson from "./MoveJson";
import ValidationInterface from "./ValidationInterface";
import Castle from "./AN/Castle";
import Check from "./AN/Check";
import Color from "./AN/Color";
import Piece from "./AN/Piece";
import Square from "./AN/Square";

class Move extends AbstractNotation implements ValidationInterface {

  public static readonly CASTLE_SHORT: string = Castle.SHORT + Check.REGEX;
  public static readonly CASTLE_LONG: string = Castle.LONG + Check.REGEX;
  public static readonly KING = 'K' + Square.REGEX + Check.REGEX;
  public static readonly KING_CAPTURES = 'Kx' + Square.REGEX + Check.REGEX;
  public static readonly PIECE = '[BRQ]{1}[a-h]{0,1}[1-8]{0,1}' + Square.REGEX + Check.REGEX;
  public static readonly PIECE_CAPTURES = '[BRQ]{1}[a-h]{0,1}[1-8]{0,1}x' + Square.REGEX + Check.REGEX;
  public static readonly KNIGHT = 'N[a-h]{0,1}[1-8]{0,1}' + Square.REGEX + Check.REGEX;
  public static readonly KNIGHT_CAPTURES = 'N[a-h]{0,1}[1-8]{0,1}x' + Square.REGEX + Check.REGEX;
  public static readonly PAWN = Square.REGEX + Check.REGEX;
  public static readonly PAWN_CAPTURES = '[a-h]{1}x' + Square.REGEX + Check.REGEX;
  public static readonly PAWN_PROMOTES = '[a-h]{1}(1|8){1}' + '[=]{0,1}[NBRQ]{0,1}' + Check.REGEX;
  public static readonly PAWN_CAPTURES_AND_PROMOTES = '[a-h]{1}x' + '[a-h]{1}(1|8){1}' + '[=]{0,1}[NBRQ]{0,1}' + Check.REGEX;

  validate = (value: string): string => {
    switch (true) {
      case value.match(new RegExp('^' + Move.KING + '$')) !== null:
        return value
      case value.match(new RegExp('^' + Move.CASTLE_SHORT + '$')) !== null:
        return value
      case value.match(new RegExp('^' + Move.CASTLE_LONG + '$')) !== null:
        return value
      case value.match(new RegExp('^' + Move.KING_CAPTURES + '$')) !== null:
        return value
      case value.match(new RegExp('^' + Move.PIECE + '$')) !== null:
        return value
      case value.match(new RegExp('^' + Move.PIECE_CAPTURES + '$')) !== null:
        return value
      case value.match(new RegExp('^' + Move.KNIGHT + '$')) !== null:
        return value
      case value.match(new RegExp('^' + Move.KNIGHT_CAPTURES + '$')) !== null:
        return value
      case value.match(new RegExp('^' + Move.PAWN + '$')) !== null:
        return value
      case value.match(new RegExp('^' + Move.PAWN_CAPTURES + '$')) !== null:
        return value
      case value.match(new RegExp('^' + Move.PAWN_PROMOTES + '$')) !== null:
        return value
      case value.match(new RegExp('^' + Move.PAWN_CAPTURES_AND_PROMOTES + '$')) !== null:
        return value
    }

    throw new UnknownNotationError;
  }

  static toObj = (color: string, pgn: string): MoveJson => {
    const isCheck = pgn.slice(-1) === '+' || pgn.slice(-1) === '#'
    const validatedColor = new Color().validate(color)
    if (pgn.match(new RegExp('^' + Move.KING + '$'))) {
      return {
          pgn: pgn,
          isCapture: false,
          isCheck: isCheck,
          type: Move.KING,
          color: validatedColor,
          id: Piece.K,
          sq: {
            current: '',
            next: pgn.slice(-2)
          }
      };
    } else if (pgn.match(new RegExp('^' + Move.CASTLE_SHORT + '$'))) {
      return {
        pgn: pgn,
        isCapture: false,
        isCheck: isCheck,
        type: Move.CASTLE_SHORT,
        color: validatedColor,
        id: Piece.K,
        sq: King.CASTLING_RULE[color][Piece.K][Castle.SHORT]['sq']
      };
    } else if (pgn.match(new RegExp('^' + Move.CASTLE_LONG + '$'))) {
      return {
        pgn: pgn,
        isCapture: false,
        isCheck: isCheck,
        type: Move.CASTLE_LONG,
        color: validatedColor,
        id: Piece.K,
        sq: King.CASTLING_RULE[color][Piece.K][Castle.LONG]['sq']
      };
    } else if (pgn.match(new RegExp('^' + Move.KING_CAPTURES + '$'))) {
      return {
        pgn: pgn,
        isCapture: true,
        isCheck: isCheck,
        type: Move.KING_CAPTURES,
        color: validatedColor,
        id: Piece.K,
        sq: {
          current: '',
          next: pgn.slice(-2)
        }
      };
    } else if (pgn.match(new RegExp('^' + Move.PIECE + '$'))) {
      return {
        pgn: pgn,
        isCapture: false,
        isCheck: isCheck,
        type: Move.PIECE,
        color: validatedColor,
        id: pgn.slice(0, 1),
        sq: {
          current: isCheck ? pgn.slice(0, -3).slice(1) : pgn.slice(0, -2).slice(1),
          next: isCheck ? pgn.slice(0, -1).slice(-2) : pgn.slice(-2)
        }
      };
    } else if (pgn.match(new RegExp('^' + Move.PIECE_CAPTURES + '$'))) {
      return {
        pgn: pgn,
        isCapture: true,
        isCheck: isCheck,
        type: Move.PIECE_CAPTURES,
        color: validatedColor,
        id: pgn.slice(0, 1),
        sq: {
          current: isCheck ? pgn.slice(0, -4).slice(1) : pgn.slice(0, -3).slice(1),
          next: isCheck ? pgn.slice(-3, -1) : pgn.slice(-2)
        }
      };
    } else if (pgn.match(new RegExp('^' + Move.KNIGHT + '$'))) {
      return {
        pgn: pgn,
        isCapture: false,
        isCheck: isCheck,
        type: Move.KNIGHT,
        color: validatedColor,
        id: Piece.N,
        sq: {
          current: isCheck ? pgn.slice(0, -3).slice(1) : pgn.slice(0, -2).slice(1),
          next: isCheck ? pgn.slice(0, -1).slice(-2) : pgn.slice(-2)
        }
      };
    } else if (pgn.match(new RegExp('^' + Move.KNIGHT_CAPTURES + '$'))) {
      return {
        pgn: pgn,
        isCapture: true,
        isCheck: isCheck,
        type: Move.KNIGHT_CAPTURES,
        color: validatedColor,
        id: Piece.N,
        sq: {
          current: isCheck ? pgn.slice(0, -4).slice(1) : pgn.slice(0, -3).slice(1),
          next: isCheck ? pgn.slice(-3, -1) : pgn.slice(-2)
        }
      };
    } else if (pgn.match(new RegExp('^' + Move.PAWN_PROMOTES + '$'))) {
      return {
        pgn: pgn,
        isCapture: false,
        isCheck: isCheck,
        type: Move.PAWN_PROMOTES,
        color: validatedColor,
        id: Piece.P,
        newId: isCheck ? pgn.slice(-2, -1) : pgn.slice(-1),
        sq: {
          current: '',
          next: pgn.slice(0, 2)
        }
      };
    } else if (pgn.match(new RegExp('^' + Move.PAWN_CAPTURES_AND_PROMOTES + '$'))) {
      return {
        pgn: pgn,
        isCapture: true,
        isCheck: isCheck,
        type: Move.PAWN_CAPTURES_AND_PROMOTES,
        color: validatedColor,
        id: Piece.P,
        newId: isCheck ? pgn.slice(-2, -1) : pgn.slice(-1),
        sq: {
          current: '',
          next: pgn.slice(2, 4)
        }
      };
    } else if (pgn.match(new RegExp('^' + Move.PAWN + '$'))) {
      return {
        pgn: pgn,
        isCapture: false,
        isCheck: isCheck,
        type: Move.PAWN,
        color: validatedColor,
        id: Piece.P,
        sq: {
          current: pgn.slice(0, 1),
          next: isCheck ? pgn.slice(0, -1) : pgn
        }
      };
    } else if (pgn.match(new RegExp('^' + Move.PAWN_CAPTURES + '$'))) {
      return {
        pgn: pgn,
        isCapture: true,
        isCheck: isCheck,
        type: Move.PAWN_CAPTURES,
        color: validatedColor,
        id: Piece.P,
        sq: {
          current: pgn.slice(0, 1),
          next: isCheck ? pgn.slice(-3, -1) : pgn.slice(-2)
        }
      };
    }

    throw new UnknownNotationError;
  }

  values = (): string[] => {
    throw new Error("Method not implemented.");
  }

}

export default Move;
