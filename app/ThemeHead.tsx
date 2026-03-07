/**
 * Server-rendered replacement for Nextra Head to avoid hydration errors.
 * Injects the same theme CSS variables and meta tags that nextra/components Head provides.
 */
import themeConfig from '../theme.config'
import { defaultTheme } from '../lib/theme'

const themeColors = (themeConfig as { themeConfig?: { colors?: { primaryHue?: number; primarySaturation?: number; backgroundLight?: string; backgroundDark?: string } } }).themeConfig?.colors ?? {}
const hue = themeColors.primaryHue ?? (themeConfig as { primaryHue?: number }).primaryHue ?? defaultTheme.primaryHue ?? 212
const saturation = themeColors.primarySaturation ?? (themeConfig as { primarySaturation?: number }).primarySaturation ?? defaultTheme.primarySaturation ?? 80
const lightnessLight = 45
const lightnessDark = 55
const bgLight = themeColors.backgroundLight ?? '250,250,250'
const bgDark = themeColors.backgroundDark ?? '17,17,17'

const themeStyle = `
:root {
  --nextra-primary-hue: ${hue}deg;
  --nextra-primary-saturation: ${saturation}%;
  --nextra-primary-lightness: ${lightnessLight}%;
  --nextra-bg: ${bgLight};
  --nextra-content-width: 90rem;
}
.dark {
  --nextra-primary-hue: ${hue}deg;
  --nextra-primary-saturation: ${saturation}%;
  --nextra-primary-lightness: ${lightnessDark}%;
  --nextra-bg: ${bgDark};
}
::selection {
  background: hsla(var(--nextra-primary-hue),var(--nextra-primary-saturation),var(--nextra-primary-lightness),.3);
}
html {
  background: rgb(var(--nextra-bg));
}
`

export function ThemeHead() {
  const customCSS = (themeConfig as { themeConfig?: { customCSS?: string } }).themeConfig?.customCSS

  return (
    <head>
      <style dangerouslySetInnerHTML={{ __html: themeStyle.trim() }} />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content={`rgb(${bgLight})`} />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content={`rgb(${bgDark})`} />
      {customCSS && (
        <link rel="stylesheet" href={customCSS.startsWith('/') ? customCSS : `/${customCSS}`} />
      )}
    </head>
  )
}
