import path from 'path';
import fs from 'fs';
import { readFile } from 'fs/promises';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const to = jest.spyOn(global, 'setTimeout');
    expect.assertions(2);
    const cb = jest.fn();
    const timer = 1000;

    doStuffByTimeout(cb, timer);
    expect(to).toHaveBeenCalledTimes(1);
    expect(to).toHaveBeenLastCalledWith(cb, timer);
  });

  test('should call callback only after timeout', () => {
    expect.assertions(2);
    const cb = jest.fn();
    const timer = 2000;

    doStuffByTimeout(cb, timer);
    expect(cb).not.toBeCalled();

    jest.runOnlyPendingTimers();

    expect(cb).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const int = jest.spyOn(global, 'setInterval');
    expect.assertions(2);
    const cb = jest.fn();
    const timer = 1000;

    doStuffByInterval(cb, timer);
    expect(int).toHaveBeenCalledTimes(1);
    expect(int).toHaveBeenLastCalledWith(cb, timer);
  });

  test('should call callback multiple times after multiple intervals', () => {
    expect.assertions(2);
    const cb = jest.fn();
    const timer = 2000;
    const calls = 3;

    doStuffByInterval(cb, timer);
    expect(cb).not.toBeCalled();
    jest.advanceTimersByTime(timer * calls);

    expect(cb).toBeCalledTimes(calls);
  });
});

describe('readFileAsynchronously', () => {
  const fileContent = 'testing file content access';

  afterEach(() => {
    jest.resetAllMocks();
  });
  test('should call join with pathToFile', async () => {
    expect.assertions(1);
    const pathToFile = 'file.ts';
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(joinSpy).toBeCalledWith(expect.any(String), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    expect.assertions(1);
    const pathToFile = 'nonExisting.someFile';
    expect(readFileAsynchronously(pathToFile)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    expect.assertions(1);

    (<jest.Mock>fs.existsSync).mockReturnValue(true);
    (<jest.Mock>readFile).mockResolvedValue(fileContent);

    const pathToFile = 'somepath.txt';
    expect(readFileAsynchronously(pathToFile)).resolves.toBe(fileContent);
  });
});
