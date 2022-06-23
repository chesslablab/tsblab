import Board from '../Board';
import Piece from '../PGN/AN/Piece';

abstract class AbstractEval {
  protected board: Board;

  protected result: object;

  protected value: object;

  public constructor(board: Board) {
    this.board = board;
    this.value = {
      [Piece.P]: 1,
      [Piece.N]: 3.2,
      [Piece.B]: 3.33,
      [Piece.K]: 4,
      [Piece.R]: 5.1,
      [Piece.Q]: 8.8
    };
  }
}

export default AbstractEval;