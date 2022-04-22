import UnknownNotationError from '../../error/UnknownNotationError';
import ValidationInterface from '../ValidationInterface';

class Square implements ValidationInterface {
  private regex: string = '[a-h]{1}[1-8]{1}';

  validate = (value: string): string => {
    if (!new RegExp(this.regex).test(value)) {
      throw new UnknownNotationError;
    }

    return value;
  };
}

export default Square;
