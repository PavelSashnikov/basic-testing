import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  const balance = 1212;
  let acc: BankAccount;
  let accForTranfer: BankAccount;

  beforeEach(() => {
    acc = getBankAccount(balance);
    accForTranfer = getBankAccount(balance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    expect(acc.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      acc.withdraw(balance + 1);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      acc.transfer(balance + 1, accForTranfer);
    }).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      acc.transfer(balance, acc);
    }).toThrow();
  });

  test('should deposit money', () => {
    const depSum = 10;
    acc.deposit(depSum);

    expect(acc.getBalance()).toBe(balance + depSum);
  });

  test('should withdraw money', () => {
    const wdSum = 10;
    acc.withdraw(wdSum);

    expect(acc.getBalance()).toBe(balance - wdSum);
  });

  test('should transfer money', () => {
    expect.assertions(2);
    const amount = balance / 10;
    acc.transfer(amount, accForTranfer);

    expect(acc.getBalance()).toEqual(balance - amount);
    expect(accForTranfer.getBalance()).toEqual(balance + amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    expect.assertions(1);
    jest.spyOn(lodash, 'random').mockReturnValue(0.123);

    expect(acc.fetchBalance()).resolves.toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const random = 0.123;
    expect.assertions(1);
    jest.spyOn(lodash, 'random').mockReturnValue(random);

    return acc.synchronizeBalance().then(() => {
      return expect(acc.getBalance()).toEqual(random);
    });
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const random = 0;
    expect.assertions(1);
    jest.spyOn(lodash, 'random').mockReturnValue(random);

    await expect(acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
