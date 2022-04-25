import UnknownNotationError from '../../error/UnknownNotationError';
import AbstractNotation from '../AbstractNotation';
import ValidationInterface from '../ValidationInterface';

class Color extends AbstractNotation implements ValidationInterface {
  public static readonly W: string = 'w';

  public static readonly B: string = 'b';

  values = (): string[] => {
    return [
      Color.W,
      Color.B
    ];
  }

  validate = (value: string): string => {
    if (!this.values().includes(value)) {
      throw new UnknownNotationError;
    }

    return value;
  };

  opp = (color: string): string => {
    if (color === Color.W) {
      return Color.B;
    }

    return Color.W;
  };
}

export default Color;
