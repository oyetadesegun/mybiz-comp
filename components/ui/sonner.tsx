import { BadgeInfo } from 'lucide-react';
import { Toaster as Toast } from 'sonner';

import { TOAST_DURATION_IN_MS } from '@/constants/Constants';
import SvgIcons from '@/icons/SvgIcons';

function Toaster() {
  return (
    <Toast
      position="top-center"
      duration={TOAST_DURATION_IN_MS}
      className="toaster group sonner-toast-custom"
      icons={{
        success: <SvgIcons.SuccessCheck />,
        error: <SvgIcons.ErrorIcon />,
        info: <BadgeInfo className="mr-1 scale-75 opacity-75" />,
      }}
      toastOptions={{
        className: 'rounded-2xl pointer-events-auto',
        classNames: {
          error: 'bg-[#FCF5F6] border-2 border-[#D62D2D]',
          success: 'bg-[#edfff7] border-2 border-green-600',
          info: 'border-2',
        },
      }}
    />
  );
}

export default Toaster;
