import UnknownNotationError from "../../error/UnknownNotationError";
import ValidationInterface from "../ValidationInterface";


class PiecePlacement implements ValidationInterface{
  validate = (value: string): string => {
    const fields=value.split("/");
    const count=fields.length;
    if(count===8){
      return value;
    }

    throw new UnknownNotationError;
  }
    
}

export default PiecePlacement;

