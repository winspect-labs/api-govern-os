'use client'

import Image from 'next/image'

type LogoProps = {
  productName: string
  logo?: string | React.ReactNode
}

/**
 * Renders logo from theme config.
 * - logo as string (path): <img>
 * - logo as ReactNode: render as-is
 * - no logo: default icon + productName
 */
export function Logo({ productName, logo }: LogoProps) {
  if (logo === undefined || logo === null) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-800 dark:from-slate-500 dark:to-slate-700 rounded-lg flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-sm">
            {productName.slice(0, 2).toUpperCase()}
          </span>
        </div>
        <span className="font-semibold text-lg">{productName}</span>
      </div>
    )
  }

  if (typeof logo === 'string') {
    return (
      <div className="flex items-center gap-2">
        <Image
          src={logo}
          alt={productName}
          width={32}
          height={32}
          className="shrink-0"
        />
        <span className="font-semibold text-lg">{productName}</span>
      </div>
    )
  }

  return <>{logo}</>
}
