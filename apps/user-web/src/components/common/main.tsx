import { cn } from '@swifty/shared-lib';
import { forwardRef } from 'react';

const Main = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <main
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-start w-full',
          className,
        )}
        {...rest}
      />
    );
  },
);

export default Main;
