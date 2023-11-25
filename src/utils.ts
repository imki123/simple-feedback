// 숫자를 입력받아서 소수점 1자리까지 고정으로 표시하는 함수
export const toFixed1 = (num: number | string) => {
  num = Number(num)
  return num.toFixed(1)
}
