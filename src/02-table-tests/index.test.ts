import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Substract, expected: 1 },
  { a: 1, b: 5, action: Action.Substract, expected: -4 },
  { a: 2, b: 2, action: Action.Substract, expected: 0 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 8, b: 4, action: Action.Divide, expected: 2 },
  { a: 2, b: 4, action: Action.Divide, expected: 0.5 },
  { a: 2, b: 4, action: Action.Multiply, expected: 8 },
  { a: 4, b: 4, action: Action.Multiply, expected: 16 },
  { a: 0, b: 4, action: Action.Multiply, expected: 0 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 2, b: 1, action: Action.Exponentiate, expected: 2 },
  { a: 1, b: 4, action: Action.Exponentiate, expected: 1 },
  { a: 'NaN', b: 4, action: Action.Exponentiate, expected: null },
  { a: 'NaN', b: 'string', action: Action.Divide, expected: null },
  { a: 5, b: 'string', action: Action.Substract, expected: null },
  { a: 4, b: 4, action: 'unknownAction', expected: null },
  { a: 4, b: 4, action: 5, expected: null },
  { a: 4, b: 4, action: true, expected: null },
];

describe.each(testCases)(
  'simpleCalculator table test for $a $action $b',
  ({ a, b, action, expected }) => {
    test(`should return ${expected}`, () => {
      expect(simpleCalculator({ a, b, action })).toEqual(expected);
    });
  },
);
