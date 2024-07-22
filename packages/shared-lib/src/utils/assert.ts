const assert = (condition: boolean, message?: string): void => {
  if (!condition) {
    throw new Error(message || 'assert 에러!');
  }
};

export default assert;
