// Global type declarations for the Meta (Facebook) Pixel.
export {}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
  }
}
