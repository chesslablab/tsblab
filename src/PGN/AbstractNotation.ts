abstract class AbstractNotation {
  values = (): string[] => {
    let constants = [];
    Object.getOwnPropertyNames(this).forEach((item) => {
      const descriptor = Object.getOwnPropertyDescriptor(this, item);
      if (typeof descriptor.value === 'string') {
        constants.push(descriptor.value);
      }
    });

    return constants;
  }
}

export default AbstractNotation;
