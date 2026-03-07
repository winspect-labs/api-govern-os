import type { MDXComponents } from 'mdx/types'
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import { StatusBadge, PriorityBadge, FeatureTable, BacklogTable, GoalsTable } from './components'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  const merged = {
    ...components,
    StatusBadge,
    PriorityBadge,
    FeatureTable,
    BacklogTable,
    GoalsTable,
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return getThemeComponents(merged as any) as MDXComponents
}
