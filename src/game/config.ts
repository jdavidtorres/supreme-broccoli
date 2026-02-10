export const GAME_CONFIG = {
  contentVersion: 1,
  saveSchemaVersion: 2,
  maxDay: 5479, // 15 years * 365 days + 4 leap days (2012, 2016, 2020, 2024)
  endYear: 2025,
  startYear: 2010,
  economy: {
    endOfDayFixedExpense: 70
  }
} as const;
