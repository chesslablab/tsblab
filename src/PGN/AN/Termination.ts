import AbstractNotation from '../AbstractNotation';

class Termination extends AbstractNotation {
  public static readonly WHITE_WINS: string = '1-0';
  public static readonly BLACK_WINS: string = '0-1';
  public static readonly DRAW: string = '1/2-1/2';
  public static readonly UNKNOWN: string = '*';

  values = (): string[] => {
    return [
      Termination.WHITE_WINS,
      Termination.BLACK_WINS,
      Termination.DRAW,
      Termination.UNKNOWN
    ]
  }
}

export default Termination;
