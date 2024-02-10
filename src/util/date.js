//2024-02-07  yyyy-mm-dd 형태로 날짜를 변경해준다
export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};
