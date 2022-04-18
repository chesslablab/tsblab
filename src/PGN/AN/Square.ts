class Square {
  static readonly regex = '[a-h]{1}[1-8]{1}';
  
  public static validate = (value: string) => {
    if (new RegExp(Square.regex).test(value)) {
      return true;
    }

    return false;
  };
}

export default Square;
