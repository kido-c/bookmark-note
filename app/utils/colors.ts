function hexToRgb(hex: string): number[] {
  // Hex 값을 RGB 값으로 변환합니다.
  const bigint = parseInt(hex.slice(1), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return [r, g, b]
}

function rgbToHex(r: number, g: number, b: number): string {
  // RGB 값을 Hex 값으로 변환합니다.
  return (
    '#' +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  )
}

function getRandomInt(min: number, max: number): number {
  // min과 max 사이의 랜덤 정수를 반환합니다.
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomDarkColor(): string {
  // 진한 색상을 랜덤으로 생성합니다.
  const r = getRandomInt(0, 150) // R 값 (0-150 사이의 랜덤 값)
  const g = getRandomInt(0, 150) // G 값 (0-150 사이의 랜덤 값)
  const b = getRandomInt(0, 150) // B 값 (0-150 사이의 랜덤 값)

  return rgbToHex(r, g, b)
}

export function lightenColor(hex: string): string {
  const factor = 0.7
  // 색상의 밝기를 증가시킵니다.
  let [r, g, b] = hexToRgb(hex)

  r = Math.min(255, Math.floor(r + (255 - r) * factor))
  g = Math.min(255, Math.floor(g + (255 - g) * factor))
  b = Math.min(255, Math.floor(b + (255 - b) * factor))

  return rgbToHex(r, g, b)
}

export function getRandomLightColor(): string {
  // 밝은 색상을 랜덤으로 생성합니다.
  const r = getRandomInt(150, 255) // R 값 (150-255 사이의 랜덤 값)
  const g = getRandomInt(150, 255) // G 값 (150-255 사이의 랜덤 값)
  const b = getRandomInt(150, 255) // B 값 (150-255 사이의 랜덤 값)

  return rgbToHex(r, g, b)
}
