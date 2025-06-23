import { useNavigation } from 'react-day-picker';

import { Button } from './button';
import {
  generateLast100Years, formatDate, changeCalendarYear,
  addOneMonth, subtractOneMonth,
} from '@/services/TimeService';
import SvgIcons from '@/icons/SvgIcons';

type CalendarOptionType = {
  displayDate: Date
  setIsOpened: (value: React.SetStateAction<boolean>) => void
  isMonthOpened: boolean
  showYear: boolean
  setDisplayDate: (value: React.SetStateAction<Date>) => void

};
export default function CalendarCaption({
  displayDate, setIsOpened, setDisplayDate, showYear, isMonthOpened,
}: CalendarOptionType) {
  const { goToMonth } = useNavigation();
  const last100years = generateLast100Years();
  return (
    <div className="px-2">
      <h3 className="w-full text-[#49454F] -ml-2 -mt-1 font-medium text-base">Select Date</h3>
      <div className="mt-2">
        <h2 className="text-[#1D1B20] pl-2 -ml-4 w-[calc(100%+32px)] border-b border-calendar-border pb-2 text-3xl">
          {formatDate(
            displayDate,
          )}
        </h2>
        <div className="flex items-center mt-0.5 justify-between">
          {showYear ? (
            <Button onClick={() => { setIsOpened(((prev) => !prev)); }} size="sm" variant="ghost" className="bg-transparent  justify-start px-2 h-7 -ml-2 mt-1 flex items-center hover:bg-transparent hover:border hover:border-calendar-border">
              <span className="-ml-1">
                {formatDate(
                  displayDate,
                )}
              </span>
              <SvgIcons.ChevronDownFill className={`ml-2 transition-all duration-1000 ${isMonthOpened ? 'rotate-180' : ''}`} />
            </Button>
          ) : null}
          <div className={`flex items-center ${showYear ? 'w-[100px]  pl-3' : 'w-full'}  relative border justify-between`}>
            <button
              type="button"
              aria-label="previous month"
              onClick={() => {
                const previousMonth = subtractOneMonth(displayDate);
                setDisplayDate(previousMonth);
                goToMonth(previousMonth);
                setIsOpened(false);
              }}
              className="h-8 w-8 flex items-center justify-center rounded-full hover:border border-calendar-border"
            >
              <SvgIcons.BackCalendarArrow className="shrink-0 scale-[120%] hover:scale-[140%] transition-all duration-200" />
            </button>
            <button
              type="button"
              aria-label="next month"
              onClick={() => {
                const nextMonth = addOneMonth(displayDate);
                setDisplayDate(nextMonth);
                goToMonth(nextMonth);
                setIsOpened(false);
              }}
              className="h-8 w-8 flex items-center justify-center rounded-full hover:border border-calendar-border"
            >
              <SvgIcons.BackCalendarArrow className="rotate-180 shrink-0 scale-[120%] hover:scale-[140%] transition-all duration-200" />
            </button>
          </div>
        </div>
      </div>
      {(isMonthOpened && showYear) ? (
        <div className="absolute bg-[#EAEBFE] px-3 pt-23 pb-2 z-40 backdrop-blur-lg h-full left-0 right-0 overflow-scroll  top-[122px] flex items-center flex-wrap">
          {last100years.map((year) => {
            const isYearActive = displayDate.getFullYear() === year;
            return (
              <div key={year} className="w-4/12 mb-3">
                <Button
                  onClick={() => {
                    const newYearDate = changeCalendarYear(displayDate, year);
                    setDisplayDate(newYearDate);
                    goToMonth(newYearDate);
                    setIsOpened(false);
                  }}
                  variant={isYearActive ? 'default' : 'ghost'}
                  className={`h-9 rounded-full ${!isYearActive && 'text-[#1D1B20]'} px-3 mx-auto block`}
                >
                  {year}
                </Button>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
