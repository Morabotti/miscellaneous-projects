export const getWeekNumber = (d: any) => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  const yearStart: any = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 3) / 7)
  return [d.getUTCFullYear(), weekNo]
}