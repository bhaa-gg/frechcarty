import { FromErrMessagePipe } from './from-err-message.pipe';

describe('FromErrMessagePipe', () => {
  it('create an instance', () => {
    const pipe = new FromErrMessagePipe();
    expect(pipe).toBeTruthy();
  });
});
