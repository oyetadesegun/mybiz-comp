import { useState } from 'react';

import Calendar from '@/components/ui/calendar';
import SvgIcons from '@/icons/SvgIcons';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { formatDate, formatTimeToNoon } from '@/services/TimeService';
import useWindowProperties from '@/hooks/useWindowProperties';

type DatePickerType = {
  error?: string
  labelText: string
  showYear?: boolean
  selectedDate: Date | string,
  disabled?: boolean,
  onDateSelect: (date: string) => void,
  className?: string;
  showPlaceholder?: boolean;
  datePickerSide?: 'left' | 'top' | 'right' | 'bottom'
};

export default function DatePicker({
  className,
  error,
  labelText,
  showYear,
  selectedDate,
  onDateSelect,
  disabled,
  showPlaceholder,
  datePickerSide,
}: DatePickerType) {
  const [isFocused, setIsFocused] = useState(false);

  const { isTab, isDesktop } = useWindowProperties({});

  const isLargeScreen = isTab || isDesktop;

  const generateTriggerDynamicClasses = () => {
    if (isFocused) {
      return 'border-[2px] border-prly-black focus:border-prly-black';
    }
    if (error) {
      return 'border border-prly-error';
    }
    return 'border-[#79747E] border';
  };

  const generateLabelDynamicClasses = () => {
    if (isFocused || selectedDate) {
      return 'bg-white text-prly-black -translate-y-[27px] text-sm font-normal';
    }
    if (selectedDate) {
      return 'text-prly-black';
    }
    return 'text-[#808080]';
  };

  return (
    <div className={`w-full mb-5 relative ${className}`}>
      <Popover open={isFocused} onOpenChange={(openStatus) => { setIsFocused(openStatus); }}>
        <PopoverTrigger
          id="date-trigger"
          name="popover"
          disabled={disabled}
          className={`flex relative items-center rounded-md border justify-between cursor-pointer pl-4 pr-0 w-full py-1 h-12 ${disabled && 'disabled:cursor-not-allowed disabled:opacity-50'}  ${generateTriggerDynamicClasses()}`}
        >
          {/* Translate label if date picker is focused or a value has been chosen */}
          {(selectedDate || !showPlaceholder) ? (
            <span className={`px-1 text-normal font-light transition-all duration-300 ${generateLabelDynamicClasses()}`}>
              {showPlaceholder ? ' ' : labelText}
            </span>
          ) : null}
          {selectedDate
            ? (
              <h3 className="absolute left-[18px] top-3 text-normal font-light">
                {formatDate(
                  selectedDate,
                  {
                    year: showYear ? 'numeric' : undefined, month: '2-digit', day: '2-digit',
                  },
                  labelText,
                )}
              </h3>
            )
            : <span className={`font-light text-normal ${!showPlaceholder && 'hidden'}`}>{labelText}</span>}
          <SvgIcons.DatePickerIcon className="mr-4" />
        </PopoverTrigger>
        <PopoverContent side={isLargeScreen ? datePickerSide : 'bottom'} align="start" className="p-0 w-fit">
          <Calendar
            disabled={disabled}
            onDateSelect={(date) => {
              if (date) {
                const formattedTime = formatTimeToNoon(date);
                setIsFocused(false);
                onDateSelect(formattedTime);
              }
            }}
            onSelectChange={(date) => {
              const formattedTime = formatTimeToNoon(date);
              onDateSelect(formattedTime);
            }}
            showYear={showYear}
            // Close popover if cancel button is clicked
            onCancel={() => { setIsFocused(false); }}
          />
        </PopoverContent>
      </Popover>
      {error ? <span className="text-prly-error text-sm absolute -bottom-5 left-2">{error}</span> : null}
    </div>
  );
}
