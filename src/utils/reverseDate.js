export function convertToISODate(dateString) {
  const months = {
    январь: "01",
    февраль: "02",
    март: "03",
    апрель: "04",
    май: "05",
    июнь: "06",
    июль: "07",
    август: "08",
    сентябрь: "09",
    октябрь: "10",
    ноябрь: "11",
    декабрь: "12",
  };

  // Matnni bo'laklarga ajratish
  const parts = dateString.toLowerCase().split(" "); // "23 январь"

  // Olingan oydan raqam olish
  const day = parts[0].padStart(2, "0"); // Kunni 2 xonali formatga o‘tkazish
  const month = months[parts[1]]; // Oy nomi asosida raqam olish
  const year = new Date().getFullYear(); // Hozirgi yilni olish

  // Yig'ilgan sanani qaytarish
  return `${year}-${month}-${day}`;
}

export function convertDatetime(engFormat) {
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

  const engDatetime = new Date(engFormat);
  const day = engDatetime.getDate();
  const month = months[engDatetime.getMonth()];

  if (isNaN(engDatetime.getHours()) || isNaN(engDatetime.getMinutes())) {
    return `${day} ${month}`;
  } else {
    const hours = String(engDatetime.getHours()).padStart(2, "0");
    const minutes = String(engDatetime.getMinutes()).padStart(2, "0");
    return `${day} ${month} ${hours}:${minutes}`;
  }
}
