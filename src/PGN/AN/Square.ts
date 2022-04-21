import UnknownNotationError from '../../error/UnknownNotationError';

class Square {
  static readonly regex = '[a-h]{1}[1-8]{1}';

  public static validate = (value: string): string => {
    if (!new RegExp(Square.regex).test(value)) {
      throw new UnknownNotationError;
    }

    return value;
  };
}

export default Square;
