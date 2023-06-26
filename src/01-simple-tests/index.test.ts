// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Add })).toBe(8);
  });

  test('should substract two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Substract })).toBe(2);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Multiply })).toBe(15);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Divide })).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Exponentiate })).toBe(
      125,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 3, b: 1, action: 'invalid' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 'w', b: '3', action: Action.Add })).toBeNull();
  });
});
