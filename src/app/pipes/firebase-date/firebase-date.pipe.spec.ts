import { FirebaseDatePipe } from './firebase-date.pipe';

describe('FirebaseDatePipe', () => {
  let pipe: FirebaseDatePipe;

  beforeEach(() => {
    pipe = new FirebaseDatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert Firebase timestamp to Date', () => {
    const firebaseTimestamp = { _seconds: 1609459200 }; // 2021-01-01T00:00:00.000Z
    const date = new Date(1609459200 * 1000);
    expect(pipe.transform(firebaseTimestamp)).toEqual(date);
  });

  it('should return the value if it is not a Firebase timestamp', () => {
    const value = 'not a Firebase timestamp';
    expect(pipe.transform(value)).toBe(value);
  });
});
