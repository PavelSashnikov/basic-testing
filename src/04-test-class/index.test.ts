import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  const balance = 1212;
  let acc: BankAccount;
  let accForTranfer: BankAccount;

  beforeEach(() => {
    acc = getBankAccount(balance);
    accForTranfer = getBankAccount(balance);
  });

  test('should create account with initial balance', () => {
    expect(acc.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      acc.withdraw(balance + 1);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw TransferFailedError error when transferring more than balance', () => {
    expect(() => {
      acc.transfer(balance + 1, accForTranfer);
    }).toThrow(TransferFailedError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      acc.transfer(balance, acc);
    }).toThrow();
    // TransferFailedError if description will be changed
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
    const amount = balance / 10;
    acc.transfer(amount, accForTranfer);

    expect(acc.getBalance()).toBe(balance - amount);
    expect(accForTranfer.getBalance()).toBe(balance + amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    expect.assertions(1);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
