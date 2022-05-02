import Castle from '../PGN/AN/Castle';
import Color from '../PGN/AN/Color';
import Piece from '../PGN/AN/Piece';

class King {
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
}

export default King;
