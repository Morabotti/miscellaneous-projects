export const getWeekNumber = (d: Date) => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  // Normally +2 but +3 used
  const weekNo = Math.ceil((((Number(d) - Number(yearStart)) / 86400000) + 3) / 7)

  return {
    year: d.getUTCFullYear(),
    week: weekNo,
    date: d.getDate(),
    month: d.getMonth() + 1,
    day: d.getDay() + 1
  }
}
