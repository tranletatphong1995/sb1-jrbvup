import moment from 'moment';

const LUNAR_MONTH_DAYS = [
  [384, 355, 354, 384, 354, 354, 384, 354, 354, 384, 354, 354],  // 2023
  [384, 354, 354, 384, 355, 354, 384, 354, 354, 384, 354, 354],  // 2024
  [354, 384, 354, 354, 384, 355, 354, 384, 354, 354, 384, 354],  // 2025
];

const LUNAR_YEAR_DAYS = LUNAR_MONTH_DAYS.map(year => year.reduce((a, b) => a + b, 0));

export function solarToLunar(date: string): string {
  const solarDate = moment(date);
  const year = solarDate.year();
  const yearIndex = year - 2023;
  
  if (yearIndex < 0 || yearIndex >= LUNAR_YEAR_DAYS.length) {
    throw new Error('Year out of supported range');
  }

  let daysPassed = solarDate.diff(moment(`${year}-01-01`), 'days');
  let lunarYear = year;
  let lunarMonth = 0;
  let lunarDay = 0;

  if (daysPassed < 0) {
    lunarYear--;
    daysPassed += LUNAR_YEAR_DAYS[yearIndex - 1];
  }

  while (daysPassed >= LUNAR_MONTH_DAYS[yearIndex][lunarMonth]) {
    daysPassed -= LUNAR_MONTH_DAYS[yearIndex][lunarMonth];
    lunarMonth++;
  }

  lunarDay = daysPassed + 1;

  return `${lunarYear}-${(lunarMonth + 1).toString().padStart(2, '0')}-${lunarDay.toString().padStart(2, '0')}`;
}

export function calculateCanChi(date: string, time: string) {
  const solarDate = moment(date);
  const year = solarDate.year();
  const month = solarDate.month() + 1;
  const day = solarDate.date();
  const hour = parseInt(time.split(':')[0]);

  const canYear = (year - 3) % 10;
  const chiYear = (year - 3) % 12;
  const canMonth = (year * 12 + month + 3) % 10;
  const chiMonth = (month + 1) % 12;
  const canDay = Math.floor((solarDate.unix() + 1 + 9) / 86400) % 10;
  const chiDay = Math.floor((solarDate.unix() + 1) / 86400) % 12;
  const canHour = (canDay * 2 + Math.floor(hour / 2)) % 10;
  const chiHour = Math.floor((hour + 1) / 2) % 12;

  const canNames = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  const chiNames = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

  return {
    year: `${canNames[canYear]} ${chiNames[chiYear]}`,
    month: `${canNames[canMonth]} ${chiNames[chiMonth]}`,
    day: `${canNames[canDay]} ${chiNames[chiDay]}`,
    hour: `${canNames[canHour]} ${chiNames[chiHour]}`,
  };
}