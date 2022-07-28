import MovetextError from '../error/MovetextError';
import Termination from './AN/Termination';
import Move from './Move';

interface MovetextShape {
  n: string[],
  moves: string[]
}

class Movetext {
  private movetext: MovetextShape;

  constructor(text: string) {
    this.movetext = {
      'n': [],
      'moves': []
    };

    this.filter(text);
  }

  public getMovetext = (): object => {
    return this.movetext;
  }

  public validate = (): string => {
    if (!this.isOrdered()) {
      throw new MovetextError();
    }

    this.movetext.moves.forEach(move => {
      new Move().validate(move)
    });

    return this.join();
  }

  protected join = (): string => {
    let text = '';
    this.movetext.moves.forEach((val, key) => {
      if (key % 2 === 0) {
        text = text + ((key / 2) + 1) + `.${this.movetext.moves[key]}`;
      } else {
        text = text + ` ${this.movetext.moves[key]} `;
      }
    });

    return text.trim();
  }

  protected filter = (text: string): void => {
    new Termination().values().forEach(value => {
      text = text.replace(value, '');
    });
    
    text = text.replace(/\{[^)]+\}/, '');
    text = text.replace(/\([^)]+\)/, '');
    text = text.replace(/0-0/, 'O-O');
    text = text.replace(/0-0-0/, 'O-O-O');
    text = text.replace(/\s+\./, '.');
    text.split(' ').forEach(move => {
      if (move.match(/^[1-9][0-9]*\.(.*)$/)) {
        let exploded = move.split('.');
        this.movetext.n.push(exploded[0]);
        this.movetext.moves.push(exploded[1]);
      } else {
        this.movetext.moves.push(move);
      }
    });

  }

  protected isOrdered = (): boolean => {
    let isOrdered = 1;
    for (let i = 0; i < this.movetext.n.length; i++) {
      isOrdered *= Number(this.movetext.n[i] == String(i + 1));
    }

    return Boolean(isOrdered);
  }

  public sequence = (): string[] => {
    let sequence = [];
    for (let i = 0; i < this.movetext.n.length; i++) {
      const j = 2 * i;
      if (this.movetext.moves[j+1]) {
        const item = ((sequence.length > 0) ? sequence[sequence.length - 1] : '') +
        ` ${this.movetext.n[i]}.${this.movetext.moves[j]} ${this.movetext.moves[j+1]}`;
        sequence.push(item.trim());
      }
    }

    return sequence;
  }
}

export default Movetext;