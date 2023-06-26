import { RemoveHttpPrefixPipe } from './remove-http-prefix.pipe';

describe('RemoveHttpPrefixPipe', () => {
  it('create an instance', () => {
    const pipe = new RemoveHttpPrefixPipe();
    expect(pipe).toBeTruthy();
  });
});
