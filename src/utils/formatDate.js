function getNext15DaysInISOFormat() {
  const now = new Date();

  const days = [];
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const daysInCurrentMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  for (let i = 0; i < 15; i++) {
    let day = now.getDate() + i;
    let monthToUse = currentMonth;
    let yearToUse = currentYear;

    if (day > daysInCurrentMonth) {
      day -= daysInCurrentMonth;
      monthToUse += 1;

      if (monthToUse > 11) {
        monthToUse = 0;
        yearToUse += 1;
      }
    }

    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(monthToUse + 1).padStart(2, "0");

    days.push(`${yearToUse}-${formattedMonth}-${formattedDay}`);
  }

  return days;
}

export default getNext15DaysInISOFormat;
