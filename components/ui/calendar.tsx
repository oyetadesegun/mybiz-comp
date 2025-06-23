import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import CalendarCaption from './CalendarCaption';
import CalendarFooter from './CalendarFooter';

export type CalendarCustomProps = {
  showYear?: boolean,
  onSelectChange?: (date: Date) => void,
  onCancel?: () => void,
  onDateSelect?: (date: Date | undefined) => void
};

export type CalendarProps = React.ComponentProps<typeof DayPicker> & CalendarCustomProps;
type CalendarWithoutMode = Omit<CalendarProps, 'mode'>;

function Calendar({
  className,
  classNames,
  showYear = true,
  selected,
  onSelectChange = () => { },
  onCancel = () => { },
  onDateSelect = () => { },
  ...props
}: CalendarWithoutMode) {
  // State for the selected date
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  // State for the displayed date
  const [displayDate, setDisplayDate] = React.useState<Date>((new Date()));
  // State for month dropdown visibility
  const [isMonthOpened, setIsOpened] = React.useState<boolean>(false);

  return (
    <div className="w-fit border rounded-md px-1 sm:px-2 bg-[#EAEBFE] relative overflow-hidden shadow-sm">
      <DayPicker
        showOutsideDays
        className={cn('p-3', className)}
        mode="single"
        defaultMonth={selectedDate}
        selected={selectedDate}
        onSelect={(date) => {
          if (date) {
            setSelectedDate(date);
            setDisplayDate(date);
            onSelectChange(date);
          }
        }}
        classNames={{
          months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
          month: 'space-y-0',
          caption: 'flex justify-center pt-1 relative items-center',
          caption_label: 'text-sm font-medium',
          nav: 'space-x-1 flex items-center',
          button: 'rounded-full text-[#1D1B20]',
          nav_button: cn(
            buttonVariants({ variant: 'outline' }),
            'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          ),
          nav_button_previous: 'absolute left-1',
          nav_button_next: 'absolute right-1',
          table: 'w-full border-collapse space-y-1',
          head_row: 'flex',
          head_cell:
            'text-muted-foreground rounded-md w-9 sm:w-10 font-normal text-[0.8rem]',
          row: 'flex w-full mt-2 mb-0',
          cell: 'h-9  sm:h-10 h-9 sm:w-10 text-center text-sm p-0 rounded-full relative [&:has([aria-selected].day-range-end)]:rounded-full [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-full last:[&:has([aria-selected])]:rounded-full focus-within:relative focus-within:z-20',
          day: cn(
            buttonVariants({ variant: 'ghost' }),
            'h-9 sm:h-10 w-9 sm:w-10 p-0 rounded-full font-normal  aria-selected:opacity-100',
          ),
          day_range_end: 'day-range-end',
          day_selected:
            'bg-prly-black  hover:bg-prly-black focus:bg-prly-black  hover:text-white focus:text-white text-white hover:shadow-lg transition-all duration-200 focus:shadow-sm ',
          day_today: 'border rounded-full border-prly-black text-grey-200',
          day_outside:
            'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
          day_disabled: 'text-muted-foreground opacity-50',
          day_range_middle:
            'aria-selected:bg-accent aria-selected:text-accent-foreground',
          day_hidden: 'invisible',
          ...classNames,
        }}
        // overwrite calendar header with custom component
        components={{
          // eslint-disable-next-line react/no-unstable-nested-components
          Caption: () => (
            <CalendarCaption
              isMonthOpened={isMonthOpened}
              setDisplayDate={setDisplayDate}
              setIsOpened={setIsOpened}
              showYear={showYear}
              displayDate={displayDate}
            />
          ),
          // eslint-disable-next-line react/no-unstable-nested-components
          Footer: () => (
            <CalendarFooter
              onCancel={onCancel}
              onDateSelect={onDateSelect}
              selectedDate={selectedDate}
            />
          ),
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </div>
  );
}
Calendar.displayName = 'Calendar';

export default Calendar;
