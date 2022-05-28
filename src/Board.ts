import Color from './PGN/AN/Color';
import Bishop from './piece/Bishop';
import King from './piece/King';
import Knight from './piece/Knight';
import Queen from './piece/Queen';
import Rook from './piece/Rook';
import RookType from './piece/RookType';

class Board extends Map {
  private turn: string = '';
  private captures: object = {
    [Color.W]: [],
    [Color.B]: []
  };
  private history: any[] = [];
  private castlingAbility: string;
  private observers: any[];
  private defenseEval: object;
  private pressureEval: object;
  private spaceEval: object;
  private sqEval: object;

  constructor() {
    super();
    this.set(0, new Rook(Color.W, 'a1', RookType.CASTLE_LONG));
    this.set(1, new Knight(Color.W, 'b1'));
    this.set(2, new Bishop(Color.W, 'c1'));
    this.set(3, new Queen(Color.W, 'd1'));
    this.set(4, new King(Color.W, 'e1'));
    this.set(5, new Bishop(Color.W, 'f1'));
    this.set(6, new Knight(Color.W, 'g1'));
    this.set(7, new Rook(Color.W, 'h1', RookType.CASTLE_SHORT));
  }

  public getSqEval(): object {
    return this.sqEval;
  }

  public getLastHistory(): object {
    if (this.history.length !== 0) {
      return this.history[this.history.length - 1];
    }

    return null;
  }
}

export default Board;
