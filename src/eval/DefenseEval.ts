import Board from '../Board';
import Color from '../PGN/AN/Color';
import AbstractEval from './AbstractEval';

class DefenseEval extends AbstractEval {
  static NAME: string = 'Defense';

  constructor(board: Board) {
    super(board);
    this.result = {
      [Color.B]: [],
      [Color.W]: []
    };
  }

  public eval = (): any => {
    this.board.forEach((piece, key) => {
      this.result[piece.getColor()] = [
        ...this.result[piece.getColor()],
        ...piece.defendedSqs()
      ];
    });
    this.result[Color.W].sort();
    this.result[Color.B].sort();

    return this.result;
  }
}

export default DefenseEval;