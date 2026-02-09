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
