import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const pData = 123;
    expect.assertions(1);
    expect(resolveValue(pData)).resolves.toBe(pData);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const myMessage = 'Error message';
    expect(() => {
      throwError(myMessage);
    }).toThrow(myMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => {
      throwError();
    }).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => {
      throwCustomError();
    }).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect.assertions(1);
    expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
