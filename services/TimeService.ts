import {
  endOfToday, endOfYesterday,
  startOfMonth, startOfYear, startOfWeek, endOfWeek,
} from 'date-fns';

// convert minute to milliseconds
export const convertMinToMilliSeconds = (minute: number): number => (1000 * 60 * minute);

export function generateLast100Years(): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];

  for (let i = 0; i < 100; i += 1) {
    years.push(currentYear - i);
  }
  return years;
}

export function formatDate(
  dateString: Date | string,
  options?: Intl.DateTimeFormatOptions,
  fallback?: string,
): string {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return fallback || '';
  }

  // render date as it is for time not zoned
  if (typeof dateString === 'string' && !dateString.includes('Z')) {
    return dateString;
  }

  const defaultFormat: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  // Use 'en-CA' for ISO-like formatting (YYYY-MM-DD)
  const formattedDate = date.toLocaleDateString('en-CA', options || defaultFormat);

  return formattedDate;
}

export function addOneMonth(date: Date) {
  // Create a new date object to avoid mutating the original date
  const newDate = new Date(date.getTime());

  // Get the current month and year
  const month = newDate.getMonth();
  const year = newDate.getFullYear();

  // Set the new date to one month ahead
  newDate.setMonth(month + 1);

  // Handle year change if month is December
  if (newDate.getMonth() < month) {
    newDate.setFullYear(year + 1);
  }
  return newDate;
}

export function subtractOneMonth(date: Date) {
  // Create a new date object to avoid mutating the original date
  const newDate = new Date(date.getTime());

  // Get the current month and year
  const month = newDate.getMonth();
  const year = newDate.getFullYear();

  // Set the new date to one month prior
  newDate.setMonth(month - 1);

  // Handle year change if month is January
  if (newDate.getMonth() > month) {
    newDate.setFullYear(year - 1);
  }
  return newDate;
}

export function changeCalendarYear(date: Date, newYear: number): Date {
  const month = date.getMonth(); // getMonth returns 0-indexed month
  const day = date.getDate();
  return new Date(newYear, month, day);
}

export function formatUploadedDate(date: Date): string {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  // Get components of the date
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // Format hours for AM/PM
  // Convert 0 to 12 for midnight and adjust 24-hour time to 12-hour
  const formattedHours = hours % 12 || 12;
  const period = hours >= 12 ? 'pm' : 'am';

  return `${month} ${day}, ${year} at ${formattedHours}:${minutes} ${period}`;
}

export function isArrayCustomDate(dates: string[]): boolean {
  if (dates.length !== 2) {
    return false;
  }
  return dates.every((dateStr) => {
    const date = new Date(dateStr);
    return !Number.isNaN(date.getTime()); // Checks if the date is valid
  });
}

// returns two objects, filter_key_start, filter_key_end
export function convertDateToTimeRange<T extends string>(filterKey: T, dateRange: string[]) {
  if (!dateRange.length) {
    return null;
  }

  let startDate = '';
  let endDate = '';

  if (isArrayCustomDate(dateRange)) {
    startDate = (new Date(dateRange[0])).toISOString().slice(0, 10);
    endDate = (new Date(dateRange[1])).toISOString().slice(0, 10);
  } else {
    const currentDate = new Date();
    switch (dateRange[0]) {
      case 'Today':
        startDate = endOfToday().toISOString().slice(0, 10);
        endDate = endOfToday().toISOString().slice(0, 10);
        break;

      case 'Yesterday':
        startDate = endOfYesterday().toISOString().slice(0, 10);
        endDate = endOfYesterday().toISOString().slice(0, 10);
        break;

      case 'Last Week':
        startDate = startOfWeek(currentDate, { weekStartsOn: 1 }).toISOString().slice(0, 10);
        endDate = endOfWeek(currentDate, { weekStartsOn: 1 }).toISOString().slice(0, 10);
        break;

      case 'This Week':
        startDate = startOfWeek(currentDate, { weekStartsOn: 1 }).toISOString().slice(0, 10);
        endDate = endOfToday().toISOString().slice(0, 10); // End date is today
        break;

      case 'This Month':
        startDate = startOfMonth(currentDate).toISOString().slice(0, 10);
        endDate = endOfToday().toISOString().slice(0, 10); // End date is today
        break;

      case 'This Year':
        startDate = startOfYear(currentDate).toISOString().slice(0, 10);
        endDate = endOfToday().toISOString().slice(0, 10); // End date is today
        break;
      default:
        throw new Error(`Unknown date range: ${dateRange[0]}`);
    }
  }

  return {
    [`${filterKey}_start`]: startDate,
    [`${filterKey}_end`]: endDate,
  } as {
      [K in `${T}_start` | `${T}_end`]: string;
    };
}

export function formatTimeToNoon(date: Date): string {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + 12);
  return newDate.toISOString();
}

export function formatToDateTime(isoString: string) {
  const date = new Date(isoString);

  // Get date parts in the user's local time zone
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function formatDocumentDateString(dateString?: string): string {
  const date = dateString ? new Date(dateString) : new Date();

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  const formatted = new Intl.DateTimeFormat('en-US', options).format(date);

  return formatted
    .replace(/,\s(\d{4}),/, ', $1 at')
    .toLowerCase()
    .replace(/(\d{1,2}:\d{2})\s(am|pm)/, (_, time, period) => `${time} ${period}`)
    .replace(/^(\w)/, (match) => match.toUpperCase());
}
