import Square from "../PGN/AN/Square";

class Knight {
  constructor(color: string, sq: string) {
    // super(color,sq)
    this.mobility()
  }
  protected mobility = (): Object => {
    try {
      let file = String.fromCharCode("this.sq[0]".charCodeAt(0) - 1);
      let rank = "this.sq[1]".charCodeAt(0) - 2;
      if (new Square().validate(file + rank)) {
        //this.mobility.push(file + rank)
      }
    } catch (e) {
      
    }
    try {
      let file = String.fromCharCode("this.sq[0]".charCodeAt(0) - 2);
      let rank = "this.sq[1]".charCodeAt(0) + 1;
      if (new Square().validate(file + rank)) {
        //this.mobility.push(file + rank)
      }
    } catch (e) {
      
    }
    try {
      let file = String.fromCharCode("this.sq[0]".charCodeAt(0) - 2);
      let rank = "this.sq[1]".charCodeAt(0) - 1;
      if (new Square().validate(file + rank)) {
        //this.mobility.push(file + rank)
      }
    } catch (e) {
      
    }
    try {
      let file = String.fromCharCode("this.sq[0]".charCodeAt(0) - 1);
      let rank = "this.sq[1]".charCodeAt(0) - 2;
      if (new Square().validate(file + rank)) {
        //this.mobility.push(file + rank)
      }
    } catch (e) {
      
    }
    try {
      let file = String.fromCharCode("this.sq[0]".charCodeAt(0) + 1);
      let rank = "this.sq[1]".charCodeAt(0) - 2;
      if (new Square().validate(file + rank)) {
        //this.mobility.push(file + rank)
      }
    } catch (e) {
      
    }
    try {
      let file = String.fromCharCode("this.sq[0]".charCodeAt(0) + 2);
      let rank = "this.sq[1]".charCodeAt(0) - 1;
      if (new Square().validate(file + rank)) {
        //this.mobility.push(file + rank)
      }
    } catch (e) {
      
    }
    try {
      let file = String.fromCharCode("this.sq[0]".charCodeAt(0) + 2);
      let rank = "this.sq[1]".charCodeAt(0) + 1;
      if (new Square().validate(file + rank)) {
        //this.mobility.push(file + rank)
      }
    } catch (e) {
      
    }
    try {
      let file = String.fromCharCode("this.sq[0]".charCodeAt(0) + 1);
      let rank = "this.sq[1]".charCodeAt(0) + 2;
      if (new Square().validate(file + rank)) {
        //this.mobility.push(file + rank)
      }
    } catch (e) {
      
    }

    return this
  }
}

export default Knight;