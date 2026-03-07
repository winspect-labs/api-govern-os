/**
 * Central theme configuration for Product OS.
 * Fork this repo? Customize branding and theme here.
 */

import type { ReactNode } from 'react'

export type BrandingConfig = {
  /** Product/company name shown in nav, footer, metadata */
  productName: string
  /**
   * Logo: image path (e.g. '/logo.svg') or React node.
   * If string, renders <img>. Omit to use default Product OS icon + productName.
   */
  logo?: string | ReactNode
  /** Favicon path (e.g. '/favicon.ico'). Optional. */
  favicon?: string
  /**
   * Footer subscript, e.g. "Powered by Product OS" for forks.
   * Shown below main footer text when set.
   */
  subscript?: string
}

export type ThemeColors = {
  /** Hue 0-360 for primary color */
  primaryHue?: number
  /** Saturation 0-100 */
  primarySaturation?: number
  /** Light mode background as rgb(r,g,b) */
  backgroundLight?: string
  /** Dark mode background as rgb(r,g,b) */
  backgroundDark?: string
}

export type ThemeConfig = {
  /** Path to custom CSS file (relative to project root). Injected after base theme. */
  customCSS?: string
  /** Override CSS variables. Merged with defaults. */
  colors?: ThemeColors
}

export const defaultBranding: BrandingConfig = {
  productName: 'Product OS',
}

export const defaultTheme: ThemeColors = {
  primaryHue: 220,
  primarySaturation: 80,
  backgroundLight: '250,250,250',
  backgroundDark: '17,17,17',
}
