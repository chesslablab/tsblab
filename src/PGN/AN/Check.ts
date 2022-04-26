import AbstractNotation from '../AbstractNotation';

class Check extends AbstractNotation {
  public static readonly REGEX: string = '[\+\#]{0,1}';

  values = (): string[] => {
    return [
      Check.REGEX
    ];
  }
}

export default Check;
