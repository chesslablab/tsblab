import CastlingAbility from '../FEN/field/CastlingAbility';
import Castle from '../PGN/AN/Castle';
import Color from '../PGN/AN/Color';
import Piece from '../PGN/AN/Piece';
import AbstractPiece from './AbstractPiece';
import B from "./B";
import R from "./R";
import RShape from "./RShape";
import RType from "./RType";

interface MobilityShape {
  up?: string,
  down?: string,
  left?: string,
  right?: string,
  upLeft?: string,
  upRight?: string,
  downLeft?: string,
  downRight?: string
}

class K extends AbstractPiece {
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

  protected mobility: MobilityShape = {
    up: '',
    down: '',
    left: '',
    right: '',
    upLeft: '',
    upRight: '',
    downLeft: '',
    downRight: ''
  };

  private rook: R;

  private bishop: B;

  constructor(color: string, sq: string) {
    super(color, sq, Piece.K);
    this.rook = new R(color, sq, RType.SLIDER);
    this.bishop = new B(color, sq);
    this.calcMobility();
  }

  protected calcMobility(): AbstractPiece {
    const queenMobility = {
      ...this.rook.getMobility(),
      ...this.bishop.getMobility()
    };
    const entries = Object.entries(queenMobility).forEach((val, key) => {
      val[1] = val[1][0];
      if (val[1]) {
        this.mobility[val[0]] = val[1];
      } else {
        delete this.mobility[val[0]];
      }
    });

    return this;
  }

  sqs(): Array<string> {
    let sqs = [
      ...this.sqsKing(),
      ...this.sqsCaptures(),
      ...[this.sqCastleLong()],
      ...[this.sqCastleShort()]
    ];

    return sqs;
  }

  defendedSqs(): Array<string> {
    let sqs = [];

    // TODO

    return sqs;
  }

  protected sqsKing(): Array<string> {
    let sqsKing = this.board.getSqEval().free.filter((sq) => {
      for (let key in this.mobility) {
        if (this.mobility[key].includes(sq)) {
          return true;
        }
      }
    }).filter(sq => !this.board.getSpaceEval()[this.oppColor()].includes(sq));

    return sqsKing;
  }

  protected sqsCaptures(): Array<string> {
    let sqsCaptures = this.board.getSqEval().used[this.oppColor()].filter((sq) => {
      for (let key in this.mobility) {
        if (this.mobility[key].includes(sq)) {
          return true;
        }
      }
    }).filter(sq => !this.board.getDefenseEval()[this.oppColor()].includes(sq));

    return sqsCaptures;
  }

  sqCastleShort(): null|string {
    const rule = K.CASTLING_RULE[this.getColor()][Piece.K][Castle.SHORT];
    if (new CastlingAbility().short(this.board.getCastlingAbility(), this.getColor())) {
      const arrayDiff = this.board.getSqEval().free.filter(sq => rule['sqs'].includes(sq));
      const arrayIntersect = this.board.getSpaceEval()[this.oppColor()].filter(sq => rule['sqs'].includes(sq));
      if (arrayDiff.length === 0 && arrayIntersect.length === 0) {
        return rule['sq']['next'];
      }
    }

    return null;
  }

  sqCastleLong(): null|string {
    const rule = K.CASTLING_RULE[this.getColor()][Piece.K][Castle.LONG];
    if (new CastlingAbility().long(this.board.getCastlingAbility(), this.getColor())) {
      const arrayDiff = this.board.getSqEval().free.filter(sq => rule['sqs'].includes(sq));
      const arrayIntersect = this.board.getSpaceEval()[this.oppColor()].filter(sq => rule['sqs'].includes(sq));
      if (arrayDiff.length === 0 && arrayIntersect.length === 0) {
        return rule['sq']['next'];
      }
    }

    return null;
  }

  getCastleRook(entries: any): RShape|null {
    const rule = K.CASTLING_RULE[this.getColor()][Piece.R];
    for (let [key, piece] of entries) {
      if (
        piece.getId() === Piece.R &&
        piece.getSq() === rule[this.getMove().pgn]['sq']['current']
      ) {
        return {
          key: key,
          value: piece
        }
      }
    }

    return null;
  }
}

export default K;
