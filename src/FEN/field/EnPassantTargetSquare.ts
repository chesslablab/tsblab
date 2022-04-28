import ValidationInterface from '../ValidationInterface';
import Square from '../../PGN/AN/Square';

class EnPassantTargetSquare implements ValidationInterface {
  validate = (value: string): string => {
    return new Square().validate(value);
  };
}

export default EnPassantTargetSquare;
