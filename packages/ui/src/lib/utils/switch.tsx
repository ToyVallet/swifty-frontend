import {
  Children,
  type PropsWithChildren,
  type ReactNode,
  isValidElement,
} from 'react';

type PropsWithChildrenAndValue = PropsWithChildren<{
  value: unknown;
}>;

export function Choose({ children, value }: PropsWithChildrenAndValue) {
  let match: ReactNode = null;
  let defaultCase: ReactNode = null;

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;

    if (child.type === When && child.props.value === value) {
      match = child;
    }

    if (child.type === Otherwise) {
      defaultCase = child;
    }
  });

  return match || defaultCase || null;
}

export function When({ children }: PropsWithChildrenAndValue) {
  return <>{children}</>;
}

export function Otherwise({ children }: PropsWithChildren) {
  return <>{children}</>;
}
