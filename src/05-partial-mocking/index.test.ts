import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: jest.fn(() => ({})),
    mockTwo: jest.fn(() => ({})),
    mockThree: jest.fn(() => ({})),
  };
});

describe('partial mocking', () => {
  let spyLog: jest.SpyInstance;
  beforeEach(() => {
    spyLog = jest.spyOn(console, 'log').mockImplementation();
  });
  afterAll(() => {
    jest.unmock('./index');
    spyLog.mockRestore();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();
    expect(spyLog).not.toBeCalled();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();
    expect(spyLog).toBeCalled();
  });
});
