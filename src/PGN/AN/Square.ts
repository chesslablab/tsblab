import UnknownNotationError from '../../error/UnknownNotationError';
import AbstractNotation from '../AbstractNotation';
import ValidationInterface from '../ValidationInterface';

class Square extends AbstractNotation implements ValidationInterface {
  public static readonly REGEX: string = '[a-h]{1}[1-8]{1}';

  values = (): string[] => {
    return [
      Square.REGEX
    ];
  }

  validate = (value: string): string => {
    if (!new RegExp(Square.REGEX).test(value)) {
      throw new UnknownNotationError;
    }

    return value;
  };
}

export default Square;
