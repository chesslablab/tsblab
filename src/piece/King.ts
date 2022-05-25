import Castle from '../PGN/AN/Castle';
import Color from '../PGN/AN/Color';
import Piece from '../PGN/AN/Piece';
import AbstractPiece from './AbstractPiece';
import Bishop from "./Bishop";
import Rook from "./Rook";
import RookType from "./RookType";

class King extends AbstractPiece {
  public static readonly CASTLING_RULE: object = {
    [Color.W]: {
      [Piece.K]: {
        [Castle.SHORT]: {
          'sqs': [ 'f1', 'g1' ],
          'sq': {
            'current': 'e1',
            'next': 'g1'
          }
        },
        [Castle.LONG]: {
          'sqs': [ 'b1', 'c1', 'd1' ],
          'sq': {
            'current': 'e1',
            'next': 'c1'
          }
        }
      },
      [Piece.R]: {
        [Castle.SHORT]: {
          'sq': {
            'current': 'h1',
            'next': 'f1'
          }
        },
        [Castle.LONG]: {
          'sq': {
            'current': 'a1',
            'next': 'd1'
          }
        }
      },
    },
    [Color.B]: {
      [Piece.K]: {
        [Castle.SHORT]: {
          'sqs': [ 'f8', 'g8' ],
          'sq': {
            'current': 'e8',
            'next': 'g8'
          }
        },
        [Castle.LONG]: {
          'sqs': [ 'b8', 'c8', 'd8' ],
          'sq': {
            'current': 'e8',
            'next': 'c8'
          }
        }
      },
      [Piece.R]: {
        [Castle.SHORT]: {
          'sq': {
            'current': 'h8',
            'next': 'f8'
          }
        },
        [Castle.LONG]: {
          'sq': {
            'current': 'a8',
            'next': 'd8'
          }
        }
      }
    }
  }

  private rook: Rook;

  private bishop: Bishop;

  constructor(color: string, sq: string) {
    super(color, sq);
    this.rook = new Rook(color, sq, RookType.SLIDER);
    this.bishop = new Bishop(color, sq);
    this.calcMobility();
  }

  protected calcMobility(): AbstractPiece {
    this.mobility = {};
    const queenMobility = {
      ...this.rook.getMobility(),
      ...this.bishop.getMobility()
    };
    const entries = Object.entries(queenMobility).forEach(item => {
      item[1] = item[1][0];
      if (item[1]) {
        this.mobility[item[0]] = item[1]
      }
    });

    return this;
  }
}

export default King;
