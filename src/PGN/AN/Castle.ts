import AbstractNotation from '../AbstractNotation';

class Castle extends AbstractNotation {
  public static readonly SHORT: string = 'O-O';

  public static readonly LONG: string = 'O-O-O';

  values = (): string[] => {
    return [
      Castle.SHORT,
      Castle.LONG
    ];
  }
}

export default Castle;
