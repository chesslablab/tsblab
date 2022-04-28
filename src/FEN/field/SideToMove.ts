import ValidationInterface from '../ValidationInterface';
import Color from '../../PGN/AN/Color';

class SideToMove implements ValidationInterface {
  validate = (value: string): string => {
    return new Color().validate(value);
  };
}

export default SideToMove;
