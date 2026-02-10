import type { GameClock } from "../shared/types";

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function daysInMonth(year: number, month: number): number {
  switch (month) {
    case 2:
      return isLeapYear(year) ? 29 : 28;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    default:
      return 31;
  }
}

export function advanceHours(clock: GameClock, hours: number): GameClock {
  let newHour = clock.hour + hours;
  let newDay = clock.day;
  let newMonth = clock.month;
  let newYear = clock.year;

  // If hour exceeds 22 (end of workday), advance to next day at 9am plus remaining hours
  while (newHour >= 22) {
    const hoursOverflow = newHour - 22; // Hours past end of day
    newHour = 9 + hoursOverflow; // Start next day at 9am plus overflow
    newDay++;
    
    const maxDay = daysInMonth(newYear, newMonth);
    if (newDay > maxDay) {
      newDay = 1;
      newMonth++;
      if (newMonth > 12) {
        newMonth = 1;
        newYear++;
      }
    }
  }

  return {
    ...clock,
    year: newYear,
    month: newMonth,
    day: newDay,
    hour: newHour,
    speed: "PAUSED"
  };
}

export function advanceDay(clock: GameClock): GameClock {
  const maxDay = daysInMonth(clock.year, clock.month);
  if (clock.day < maxDay) {
    return {
      ...clock,
      day: clock.day + 1,
      hour: 9,
      speed: "PAUSED"
    };
  }
  const nextMonth = clock.month === 12 ? 1 : clock.month + 1;
  const nextYear = clock.month === 12 ? clock.year + 1 : clock.year;
  return {
    ...clock,
    year: nextYear,
    month: nextMonth,
    day: 1,
    hour: 9,
    speed: "PAUSED"
  };
}
