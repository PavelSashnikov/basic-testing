import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const arr = ['a', 'b', 'c', 'd'];
  const linkedList = {
    value: 'a',
    next: {
      value: 'b',
      next: {
        value: 'c',
        next: { value: 'd', next: { value: null, next: null } },
      },
    },
  };
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList(arr);
    expect(list).toStrictEqual(linkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = generateLinkedList(arr);
    expect(list).toMatchSnapshot();
  });
});
