export function formatDate(dateString: Date) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}
