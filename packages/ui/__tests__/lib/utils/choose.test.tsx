import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { Choose, Otherwise, When } from '../../../src/lib/utils/choose';

describe('Choose 컴포넌트 테스트', () => {
  it('Choose 내부에 value와 일치하는 When 컴포넌트가 있을 때 해당 컴포넌트를 랜더링한다.', () => {
    const value = 'testString';
    const text = 'some text';

    const { getByText } = render(
      <Choose value={value}>
        <When value="testString">{text}</When>
      </Choose>,
    );

    expect(getByText(text)).toBeInTheDocument();
  });

  it('Choose 내부에 value와 일치하는 When 컴포넌트가 없을 때 Otherwise 컴포넌트를 랜더링한다.', () => {
    const value = 'testString';
    const text = 'some text';

    const { getByText } = render(
      <Choose value={value}>
        <When value="other">{text}</When>
        <Otherwise>{text}</Otherwise>
      </Choose>,
    );

    expect(getByText(text)).toBeInTheDocument();
  });

  it('Choose 내부에 value와 일치하는 When 컴포넌트가 없고 Otherwise 컴포넌트도 없을 때 null을 반환한다.', () => {
    const value = 'testString';
    const text = 'some text';

    const { queryByText } = render(
      <Choose value={value}>
        <When value="other">{text}</When>
      </Choose>,
    );

    expect(queryByText(text)).toBeNull();
  });

  it('Choose 내부에 value와 일치하는 When 컴포넌트가 여러개라면 첫번째로 일치하는 컴포넌트만 랜더링한다.', () => {
    const value = 'testString';
    const text = 'some text';

    const { getAllByText } = render(
      <Choose value={value}>
        <When value="other">{text}</When>
        <When value="testString">{text}</When>
        <When value="testString">{text}</When>
      </Choose>,
    );

    expect(getAllByText(text)).toHaveLength(1);
  });
});
