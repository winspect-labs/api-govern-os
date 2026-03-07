/**
 * B2B-style data table wrapper.
 * Ensures consistent spacing, alignment, and typography for dashboard tables.
 */

export function DataTable({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`mt-8 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900/40 shadow-sm ${className}`}
    >
      {children}
    </div>
  )
}
