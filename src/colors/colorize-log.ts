/**
 * Colorizes a log message using ANSI escape codes.
 * @param {string} text - The log message to colorize.
 * @param {Object} [foreground] - The foreground color in RGB object format.
 * @param {Object} [background] - The background color in RGB object format.
 * @returns {string} The colorized log message.
 */
export function colorizeLog(
  text: string,
  foreground?: { r: number; g: number; b: number },
  background?: { r: number; g: number; b: number },
): string {
  const RESET_ALL_ATTRIBUTES = '\x1b[0m'

  let ansiAttributes = ''
  if (foreground) {
    const ansiForeground = `\x1b[38;2;${foreground.r};${foreground.g};${foreground.b}m`
    ansiAttributes += `${ansiForeground}`
  }
  if (background) {
    const ansiBackground = `\x1b[48;2;${background.r};${background.g};${background.b}m`
    ansiAttributes += `${ansiBackground}`
  }
  return `${ansiAttributes}${text}${RESET_ALL_ATTRIBUTES}`
}
