import { cn } from '../../src';

describe('cn', () => {
  it('인자가 전달되지 않으면 빈 문자열을 반환해야한다.', () => {
    expect(cn()).toBe('');
  });

  it('빈 문자열이 전달되면 빈 문자열을 반환해야한다.', () => {
    expect(cn('')).toBe('');
  });

  it('하나의 문자열만 전달되면 동일한 문자열을 반환해야한다.', () => {
    expect(cn('foo')).toBe('foo');
  });

  it('두 개 이상의 문자열이 전달되면 공백으로 연결된 문자열을 반환해야한다.', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('세 개 이상의 문자열이 전달되면 공백으로 연결된 문자열을 반환해야한다.', () => {
    expect(cn('foo', 'bar', 'baz')).toBe('foo bar baz');
  });
});
