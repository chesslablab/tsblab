import UnknownNotationError from '../../error/UnknownNotationError';
import Color from '../../PGN/AN/Color';
import Piece from '../../PGN/AN/Piece';
import ValidationInterface from '../ValidationInterface';


class CastlingAbility implements ValidationInterface {
  public static readonly START: string = 'KQkq';

  public static readonly NEITHER: string = '-';

  validate = (value: string): string => {
    if (CastlingAbility.NEITHER === value) {
      return value;
    } else if (value && value.match(/^K?Q?k?q?$/)) {
      return value;
    }

    throw new UnknownNotationError;
  }

  remove = (castlingAbility: string, color: string, ids: string[]): string => {
    if (color === Color.B) {
      ids = ids.map(id => id.toLowerCase());
    }
    castlingAbility = castlingAbility.replace(new RegExp(ids.join('|'),'g'),'');
    if (!castlingAbility) {
      castlingAbility=CastlingAbility.NEITHER;
    }

    return castlingAbility;
  }

  castle = (castlingAbility: string,color: string): string => {
    castlingAbility = this.remove(
      castlingAbility,
      color,
      [Piece.K, Piece.Q]
    );

    return castlingAbility;
  }

  long = (castlingAbility: string, color: string): string => {
    let id = Piece.Q;
    if (color === Color.B) {
      id = id.toLowerCase();
    }

    return castlingAbility.substring(
      castlingAbility.search(id) === -1 ? 0 : castlingAbility.search(id)
    );
  }

  short = (castlingAbility: string, color: string): string => {
    let id = Piece.K;
    if (color === Color.B) {
      id = id.toLowerCase();
    }

    return castlingAbility.substring(
      castlingAbility.search(id) === -1 ? 0 : castlingAbility.search(id)
    );
  }

  can = (castlingAbility: string, color: string): string => {
    return this.long(castlingAbility,color) || this.short(castlingAbility,color);
  }
}

export default CastlingAbility;
