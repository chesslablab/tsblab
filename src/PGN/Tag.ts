import UnknownNotationError from "../error/UnknownNotationError";
import AbstractNotation from "./AbstractNotation";

class Tag extends AbstractNotation{

  public static readonly EVENT = 'Event';
	public static readonly SITE = 'Site';
	public static readonly DATE = 'Date';
	public static readonly ROUND = 'Round';
	public static readonly WHITE = 'White';
	public static readonly BLACK = 'Black';
	public static readonly RESULT = 'Result';

  public static readonly FICS_GAMES_DB_GAME_NO = 'FICSGamesDBGameNo';

	public static readonly WHITE_TITLE = 'WhiteTitle';
	public static readonly BLACK_TITLE = 'BlackTitle';
	public static readonly WHITE_ELO = 'WhiteElo';
	public static readonly BLACK_ELO = 'BlackElo';
	public static readonly WHITE_USCF = 'WhiteUSCF';
	public static readonly BLACK_USCF = 'BlackUSCF';
	public static readonly WHITE_NA = 'WhiteNA';
	public static readonly BLACK_NA = 'BlackNA';
	public static readonly WHITE_TYPE = 'WhiteType';
	public static readonly BLACK_TYPE = 'BlackType';

	public static readonly EVENT_DATE = 'EventDate';
	public static readonly EVENT_SPONSOR = 'EventSponsor';
	public static readonly SECTION = 'Section';
	public static readonly STAGE = 'Stage';
	public static readonly BOARD = 'Board';

	public static readonly OPENING = 'Opening';
	public static readonly VARIATION = 'Variation';
	public static readonly SUB_VARIATION = 'SubVariation';
	public static readonly ECO = 'ECO';
	public static readonly NIC = 'NIC';

	public static readonly TIME = 'Time';
  public static readonly TIME_CONTROL = 'TimeControl';
	public static readonly UTC_TIME = 'UTCTime';
	public static readonly UTC_DATE = 'UTCDate';

  public static readonly WHITE_CLOCK = 'WhiteClock';
  public static readonly BLACK_CLOCK = 'BlackClock';

	public static readonly SET_UP = 'SetUp';
	public static readonly FEN = 'FEN';

	public static readonly TERMINATION = 'Termination';

	public static readonly ANNOTATOR = 'Annotator';
	public static readonly MODE = 'Mode';
	public static readonly PLY_COUNT = 'PlyCount';
  public static readonly WHITE_RD = 'WhiteRD';
  public static readonly BLACK_RD = 'BlackRD';

  validate = (tag: string): Object => {
    let isValid = false;
    for (let val of Array(this.values)) {
      if (tag.match(new RegExp('^\[' + val + ' \"(.*)\"\]$'))) {
        isValid = true;
      }
    }

    if (!isValid) {
      throw new UnknownNotationError;
    }

    let exploded = tag.split(' "'); 
    let result = {
      name: exploded[0].slice(1),
      value: exploded[1].slice(0, -2)
    };
    return result;
  }

  public static mandatory = (): string[] => {
    return [
      Tag.EVENT,
      Tag.SITE,
      Tag.DATE,
      Tag.WHITE,
      Tag.BLACK,
      Tag.RESULT
    ]
  }

  public static loadable = (): string[] => {
    return [
      Tag.EVENT,
      Tag.SITE,
      Tag.DATE,
      Tag.FEN,
      Tag.WHITE,
      Tag.BLACK,
      Tag.RESULT,
      Tag.WHITE_ELO,
      Tag.BLACK_ELO,
      Tag.ECO
    ]
  }

  values = (): string[] => {
    return [
      Tag.EVENT,
      Tag.SITE,
      Tag.DATE,
      Tag.ROUND,
      Tag.WHITE,
      Tag.BLACK,
      Tag.RESULT,
      Tag.FICS_GAMES_DB_GAME_NO,
      Tag.WHITE_TITLE,
      Tag.BLACK_TITLE,
      Tag.WHITE_ELO,
      Tag.BLACK_ELO,
      Tag.WHITE_USCF,
      Tag.BLACK_USCF,
      Tag.WHITE_NA,
      Tag.BLACK_NA,
      Tag.WHITE_TYPE,
      Tag.BLACK_TYPE,
      Tag.EVENT_DATE,
      Tag.EVENT_SPONSOR,
      Tag.SECTION,
      Tag.STAGE,
      Tag.BOARD,
      Tag.OPENING,
      Tag.VARIATION,
      Tag.SUB_VARIATION,
      Tag.NIC,
      Tag.ECO,
      Tag.TIME,
      Tag.TIME_CONTROL,
      Tag.UTC_TIME,
      Tag.UTC_DATE,
      Tag.WHITE_CLOCK,
      Tag.BLACK_CLOCK,
      Tag.SET_UP,
      Tag.FEN,
      Tag.TERMINATION,
      Tag.ANNOTATOR,
      Tag.MODE,
      Tag.PLY_COUNT,
      Tag.WHITE_RD,
      Tag.BLACK_RD
    ]
  }
  
}