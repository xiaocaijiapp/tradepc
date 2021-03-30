export const handlePhone = (val, retain = 4) => {
  if (!Number(val) || String(val).length !== 11 || retain === 0) { return val }
  const digit = 11 - 3 - retain
  const reg = new RegExp(`^(\\d{3})\\d{${digit}}(\\d{${retain}})$`)
  return String(val).replace(reg, `$1${'*'.repeat(digit)}$2`)
}
export const handleIdCard = (card) => {
  if (String(card).length !== 18) { return card }
  return card.replace(/^(.{4})(?:\d+)(.{4})$/, '$1******$2')
}
