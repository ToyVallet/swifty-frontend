/**
 * @name formatPhoneNumber
 * @description 전화번호를 포맷팅합니다.
 * @param value 전화번호
 * @returns 포맷팅된 전화번호
 */
export function formatPhoneNumber(value: string) {
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,3})(\d{0,4})(\d{0,4})$/);

  if (match) {
    return [match[1], match[2], match[3]].filter(Boolean).join('-');
  }

  return value;
}
