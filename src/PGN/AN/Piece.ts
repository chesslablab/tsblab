import AbstractNotation from '../AbstractNotation';

class Piece extends AbstractNotation {
  public static readonly B: string = 'B';
  public static readonly K: string = 'K';
  public static readonly N: string = 'N';
  public static readonly P: string = 'P';
  public static readonly Q: string = 'Q';
  public static readonly R: string = 'R';

  values = (): string[] => {
    return [
      Piece.B,
      Piece.K,
      Piece.N,
      Piece.P,
      Piece.Q,
      Piece.R
    ];
  }
}

export default Piece;
