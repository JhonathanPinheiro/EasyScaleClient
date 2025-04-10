export function highlightText(text: string, term: string) {
  const regex = new RegExp(`(${term})`, 'gi')
  const textParts = text.split(regex)

  return textParts.map((part, index) =>
    part.toLowerCase() === term.toLowerCase() ? (
      <span key={part || index}>{part}</span>
    ) : (
      part
    )
  )
}
