import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios', () => {
  const originalModule = jest.requireActual('axios');

  return {
    ...originalModule,
    create: () => ({
      get: () => {
        return Promise.resolve({ data: 'str' });
      },
    }),
  };
});

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  beforeEach(() => jest.resetModules());
  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');
    const baseURL = 'https://jsonplaceholder.typicode.com';

    await throttledGetDataFromApi('path');
    jest.runOnlyPendingTimers();
    expect(createSpy).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const relPath = 'path';
    const getMock = jest.fn(() => {
      return Promise.resolve({ data: 'sr' });
    });
    jest
      .spyOn(axios, 'create')
      .mockReturnValue({ get: getMock } as unknown as AxiosInstance);
    await throttledGetDataFromApi(relPath);
    jest.runOnlyPendingTimers();
    expect(getMock).toHaveBeenCalledWith(relPath);
  });

  test('should return response data', async () => {
    const relPath = 'path';
    const data = 'some returned data';
    const getMock = jest.fn(() => {
      return Promise.resolve({ data });
    });
    jest
      .spyOn(axios, 'create')
      .mockReturnValueOnce({ get: getMock } as unknown as AxiosInstance);
    const res = await throttledGetDataFromApi(relPath);
    jest.runOnlyPendingTimers();

    expect(res).toBe(data);
  });
});
