function getRemainingHoursToday() {
  const now = new Date();

  // Rus tilidagi oylar
  const months = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ];

  const currentDay = now.getDate(); // Hozirgi kun
  const currentMonth = now.getMonth(); // Joriy oy
  const month = months[currentMonth]; // Ruscha oy
  const days = [];

  const daysInCurrentMonth = new Date(now.getFullYear(), currentMonth + 1, 0).getDate(); // Joriy oyda nechta kun bor

  // 10 kunni hisoblash
  for (let i = 0; i < 15; i++) {
    let day = currentDay + i;
    let monthToUse = month;

    // Agar kun joriy oyda tugasa, keyingi oydan boshlash
    if (day > daysInCurrentMonth) {
      day -= daysInCurrentMonth; // Yangi oy boshlanishi
      monthToUse = months[currentMonth + 1] || months[0]; // Agar oydan keyin yangi oyga o'tsa, uni to'g'ri aniqlash
    }

    days.push(`${day} ${monthToUse}`);
  }

  return days;
}

export default getRemainingHoursToday;
