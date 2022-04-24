import UnknownNotationError from '../../error/UnknownNotationError';
import AbstractNotation from '../AbstractNotation';
import ValidationInterface from '../ValidationInterface';

class Color extends AbstractNotation implements ValidationInterface {
  private readonly w: string = 'w';

  private readonly b: string = 'b';

  validate = (value: string): string => {
    if (!this.values().includes(value)) {
      throw new UnknownNotationError;
    }

    return value;
  };

  opp = (color: string): string => {
    if (color === this.w) {
      return this.b;
    }

    return this.w;
  };
}

export default Color;
