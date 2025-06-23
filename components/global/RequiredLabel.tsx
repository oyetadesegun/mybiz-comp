import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type LabelProp = {
  children: ReactNode,
  className?: string,
  asterisksClassName?: string
};

function Asterisk({ className }: { className?: string }) {
  return (
    <span className={cn('text-[#AE1313] text-base mr-[1px]', className)}>*</span>
  );
}

export default function RequiredLabel(
  {
    children,
    className,
    asterisksClassName,
  }: LabelProp,
) {
  return (
    <div className={cn('mb-2', className)}>
      <Asterisk className={asterisksClassName} />
      {children}
    </div>
  );
}

export function FormLabel(
  {
    children,
    className,
    asterisksClassName,
  }: LabelProp,
) {
  return (
    <div className={cn('mb-2', className)}>
      <Asterisk className={cn('mr-0 opacity-0', asterisksClassName)} />
      {children}
    </div>
  );
}
