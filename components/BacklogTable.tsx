import { loadBacklog, loadGoals } from '@/lib/loadData'
import { PriorityBadge } from './PriorityBadge'
import { ICEBar } from './ICEBar'
import { DataTable } from './DataTable'

export function BacklogTable() {
  const items = loadBacklog()
  const goals = loadGoals()

  if (items.length === 0) {
    return (
      <DataTable>
        <div className="p-10 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No backlog items in <code className="rounded bg-slate-200/80 dark:bg-slate-700/80 px-1.5 py-0.5">data/backlog.yaml</code>. Add entries to see them here.
        </p>
        </div>
      </DataTable>
    )
  }

  return (
    <DataTable>
      <div className="divide-y divide-slate-200 dark:divide-slate-700/60">
      {items.map((item, i) => (
        <div
          key={item.id}
          className="group flex flex-col gap-4 px-6 py-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex min-w-0 flex-1 items-start gap-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-600 dark:text-slate-400">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-slate-900 dark:text-slate-100">
                {item.title}
              </h3>
              {item.description && (
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:shrink-0">
              {item.links?.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center whitespace-nowrap rounded border border-slate-200 dark:border-slate-600/80 px-2 py-1 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {link.label} →
                </a>
              ))}
              <PriorityBadge priority={item.priority as 'P0' | 'P1' | 'P2' | 'P3'} />
              <span className="whitespace-nowrap rounded-md bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-medium capitalize text-slate-600 dark:text-slate-400">
                {item.status}
              </span>
              {item.goal_ids && item.goal_ids.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.goal_ids.map((gid) => {
                    const goal = goals.find((g) => g.id === gid)
                    return goal ? (
                      <span
                        key={gid}
                        className="rounded bg-violet-100/80 dark:bg-violet-900/30 px-1.5 py-0.5 text-xs text-violet-700 dark:text-violet-300"
                      >
                        {goal.title.split(' ')[0]}
                      </span>
                    ) : null
                  })}
                </div>
              )}
              {item.ice && (
                <div className="flex items-center gap-2">
                  <ICEBar ice={item.ice} />
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    I·C·E
                  </span>
                </div>
              )}
          </div>
        </div>
      ))}
      </div>
    </DataTable>
  )
}
