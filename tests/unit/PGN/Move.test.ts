import UnknownNotationError from '../../../src/error/UnknownNotationError';
import Move from '../../../src/PGN/Move';
import Piece from '../../../src/PGN/AN/Piece';
import { expect } from 'chai';
import Castle from '../../../src/PGN/AN/Castle';
import K from '../../../src/piece/K';

describe('Move.toObj()', () => {  
  it ('Ua5 throws UnknownNotationError', () => {
    expect(() => Move.toObj('w', 'Ua5')).to.throw(UnknownNotationError)
  });
  it ('foo5 throws UnknownNotationError', () => {
    expect(() => Move.toObj('b', 'foo5')).to.throw(UnknownNotationError)
  });    
  it ('cb3b7 throws UnknownNotationError', () => {
    expect(() => Move.toObj('w', 'cb3b7')).to.throw(UnknownNotationError)
  });
  it ('CASTLE_SHORT throws UnknownNotationError', () => {
    expect(() => Move.toObj('b', 'a-a')).to.throw(UnknownNotationError)
  });
  it ('CASTLE_LONG throws UnknownNotationError', () => {
    expect(() => Move.toObj('w', 'c-c-c')).to.throw(UnknownNotationError)
  });
  it ('a throws UnknownNotationError', () => {
    expect(() => Move.toObj('b', 'a')).to.throw(UnknownNotationError)
  });
  it ('3 throws UnknownNotationError', () => {
    expect(() => Move.toObj('w', '3')).to.throw(UnknownNotationError)
  });
  it ('K3 throws UnknownNotationError', () => {
    expect(() => Move.toObj('b', 'K3')).to.throw(UnknownNotationError)
  });
  it ('Fxa7 throws UnknownNotationError', () => {
    expect(() => Move.toObj('w', 'Fxa7')).to.throw(UnknownNotationError)
  });
  it ('Bg5 is converted to Obj', () => {
    const move = 'Bg5';
    const example = {
      pgn: 'Bg5',
      isCapture: false,
      isCheck: false,
      type: Move.PIECE,
      color: 'w',
      id: Piece.B,
      sq: {
        current: '',
        next: 'g5'  
      }  
    }; 
    expect(Move.toObj('w', move)).to.eql(example)
  });
  it ('Ra5 is converted to Obj', () => {
    const move = 'Ra5';
    const example = {
      pgn: 'Ra5',
      isCapture: false,
      isCheck: false,
      type: Move.PIECE,
      color: 'b',
      id: Piece.R,
      sq: {
        current: '',
        next: 'a5'  
      }  
    };  
    expect(Move.toObj('b', move)).to.eql(example)
  });
  it ('Qbb7 is converted to Obj', () => {
    const move = 'Qbb7';
    const example = {
      pgn: 'Qbb7',
      isCapture: false,
      isCheck: false,
      type: Move.PIECE,
      color: 'b',
      id: Piece.Q,
      sq: {
        current: 'b',
        next: 'b7'  
      }  
    };  
    expect(Move.toObj('b', move)).to.eql(example)
  });
  it ('Ndb4 is converted to Obj', () => {
    const move = 'Ndb4';
    const example = {
      pgn: 'Ndb4',
      isCapture: false,
      isCheck: false,
      type: Move.KNIGHT,
      color: 'b',
      id: Piece.N,
      sq: {
        current: 'd',
        next: 'b4'  
      }  
    };  
    expect(Move.toObj('b', move)).to.eql(example)
  });
  it ('Kg7 is converted to Obj', () => {
    const move = 'Kg7';
    const example = {
      pgn: 'Kg7',
      isCapture: false,
      isCheck: false,
      type: Move.KING,
      color: 'w',
      id: Piece.K,
      sq: {
        current: '',
        next: 'g7'  
      }  
    };  
    expect(Move.toObj('w', move)).to.eql(example)
  });
  it ('Qh8g7 is converted to Obj', () => {
    const move = 'Qh8g7';
    const example = {
      pgn: 'Qh8g7',
      isCapture: false,
      isCheck: false,
      type: Move.PIECE,
      color: 'b',
      id: Piece.Q,
      sq: {
        current: 'h8',
        next: 'g7'  
      }  
    };  
    expect(Move.toObj('b', move)).to.eql(example)
  });
  it ('c3 is converted to Obj', () => {
    const move = 'c3';
    const example = {
      pgn: 'c3',
      isCapture: false,
      isCheck: false,
      type: Move.PAWN,
      color: 'w',
      id: Piece.P,
      sq: {
        current: 'c',
        next: 'c3'  
      }  
    };  
    expect(Move.toObj('w', move)).to.eql(example)
  });
  it ('h4 is converted to Obj', () => {
    const move = 'h4';
    const example = {
      pgn: 'h4',
      isCapture: false,
      isCheck: false,
      type: Move.PAWN,
      color: 'w',
      id: Piece.P,
      sq: {
        current: 'h',
        next: 'h4'  
      }  
    };  
    expect(Move.toObj('w', move)).to.eql(example)
  });
  it ('CASTLE_SHORT is converted to Obj', () => {
    const move = 'O-O';
    const example = {
      pgn: 'O-O',
      isCapture: false,
      isCheck: false,
      type: Move.CASTLE_SHORT,
      color: 'w',
      id: 'K',
      sq: K.CASTLING_RULE['w'][Piece.K][Castle.SHORT]['sq']  
    };  
    expect(Move.toObj('w', move)).to.eql(example)
  });
  it ('CASTLE_LONG is converted to Obj', () => {
    const move = 'O-O-O';
    const example = {
      pgn: 'O-O-O',
      isCapture: false,
      isCheck: false,
      type: Move.CASTLE_LONG,
      color: 'w',
      id: 'K',
      sq: K.CASTLING_RULE['w'][Piece.K][Castle.LONG]['sq']  
    };  
    expect(Move.toObj('w', move)).to.eql(example)
  });
  it ('fxg5 is converted to Obj', () => {
    const move = 'fxg5';
    const example = {
      pgn: 'fxg5',
      isCapture: true,
      isCheck: false,
      type: Move.PAWN_CAPTURES,
      color: 'b',
      id: Piece.P,
      sq: {
        current: 'f',
        next: 'g5'  
      }  
    };  
    expect(Move.toObj('b', move)).to.eql(example)
  });
  it ('Nxe4 is converted to Obj', () => {
    const move = 'Nxe4';
    const example = {
      pgn: 'Nxe4',
      isCapture: true,
      isCheck: false,
      type: Move.KNIGHT_CAPTURES,
      color: 'b',
      id: Piece.N,
      sq: {
        current: '',
        next: 'e4'  
      }  
    };  
    expect(Move.toObj('b', move)).to.eql(example)
  });
  it ('Q7xg7 is converted to Obj', () => {
    const move = 'Q7xg7';
    const example = {
      pgn: 'Q7xg7',
      isCapture: true,
      isCheck: false,
      type: Move.PIECE_CAPTURES,
      color: 'b',
      id: Piece.Q,
      sq: {
        current: '7',
        next: 'g7'  
      }  
    };  
    expect(Move.toObj('b', move)).to.eql(example)
  });                
});
