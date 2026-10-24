// Converts an image to ASCII art string for terminal display.
// Density ramp: darkest -> lightest, mapped so dark pixels become spaces
// (invisible on the black terminal bg) and bright pixels become dense chars.
const DENSITY = ' .:-=+*#%@'

/**
 * Loads an image and converts it to an ASCII string.
 * Returns a promise that resolves to the ASCII art (or '' on failure).
 * `width` is the character width; height is adjusted for character aspect ratio.
 */
export function loadImageAsAscii(src: string, width = 70): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      const aspect = img.height / img.width
      const canvasWidth = width
      const canvasHeight = Math.max(1, Math.floor(canvasWidth * aspect * 0.5))

      const canvas = document.createElement('canvas')
      canvas.width = canvasWidth
      canvas.height = canvasHeight

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        resolve('')
        return
      }

      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight)
      const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
      const data = imageData.data

      let result = ''
      for (let y = 0; y < canvasHeight; y++) {
        for (let x = 0; x < canvasWidth; x++) {
          const i = (y * canvasWidth + x) * 4
          const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3
          const index = Math.min(DENSITY.length - 1, Math.floor((brightness / 255) * (DENSITY.length - 1)))
          result += DENSITY[index]
        }
        result += '\n'
      }

      resolve(result)
    }
    img.onerror = () => resolve('')
  })
}
