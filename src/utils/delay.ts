export function delay(callback: () => void, timeout: number): void {
  setTimeout(callback, timeout)
}

export function cancellableDelay(
  callback: () => void,
  timeout: number
): () => void {
  const timeHandle = setTimeout(callback, timeout)

  return () => clearTimeout(timeHandle)
}

export function delayRemoveSheet(callback: () => void) {
  delay(callback, 400)
}
