import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { If } from '../../../src/lib';

describe('If 컴포넌트 테스트', () => {
  it('조건이 true일 때 children이 랜더링 되어야한다.', () => {
    const { getByText } = render(
      <If condition={true}>
        <div>hello</div>
      </If>,
    );

    expect(getByText('hello')).toBeInTheDocument();
  });

  it('조건이 false일 때 null을 반환해야한다.', () => {
    const { queryByText } = render(
      <If condition={false}>
        <div>hello</div>
      </If>,
    );

    expect(queryByText('hello')).toBeNull();
  });
});
