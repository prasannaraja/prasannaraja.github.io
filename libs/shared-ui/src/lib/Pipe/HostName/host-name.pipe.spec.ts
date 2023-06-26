import { HostNamePipe } from './host-name.pipe';

describe('HostNamePipe', () => {
  it('create an instance', () => {
    const pipe = new HostNamePipe();
    expect(pipe).toBeTruthy();
  });
});
