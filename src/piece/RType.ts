class RType {
  public static readonly CASTLE_SHORT: string = 'castle short';
  public static readonly CASTLE_LONG: string = 'castle long';
  public static readonly PROMOTED: string = 'promoted';
  public static readonly SLIDER: string = 'slider';

  public static all(): string[] {
    return [
      RType.CASTLE_SHORT,
      RType.CASTLE_LONG,
      RType.PROMOTED,
      RType.SLIDER
    ];
  }
}

export default RType;
