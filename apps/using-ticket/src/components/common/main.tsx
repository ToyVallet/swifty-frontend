import { cn } from '@swifty/shared-lib';
import { forwardRef } from 'react';

const Main = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <main
        ref={ref}
        className={cn(
          'px-10 flex flex-col justify-center items-center gap-5',
          className,
        )}
        {...rest}
      />
    );
  },
);

export default Main;
