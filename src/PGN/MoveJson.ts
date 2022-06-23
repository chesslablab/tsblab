interface MoveJson {
  pgn: string,
  isCapture: boolean,
  isCheck: boolean,
  type: string,
  color: string,
  id: string,
  newId?: string,
  sq: {
    current: string,
    next: string
  }
}

export default MoveJson;
