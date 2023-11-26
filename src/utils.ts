/**
 * 숫자를 입력받아서 소수점 1자리까지 고정으로 표시하는 함수. default fixed: 1
 */

export const toFixed = (num: number | string, fixed = 1) => {
  num = Number(num)
  return num.toFixed(fixed)
}

/**
 * 숫자와 반올림할 자리수를 입력받아서 반올림하는 함수. default at: 1
 */
export const round = (num: number | string, at = 1) => {
  num = Number(num)
  return Math.round(num * 10 ** at) / 10 ** at
}
