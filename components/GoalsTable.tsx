import { loadGoals, loadFeatures, loadBacklog } from '@/lib/loadData'
import { DataTable } from './DataTable'

export function GoalsTable() {
  const goals = loadGoals()
  const features = loadFeatures()
  const backlog = loadBacklog()

  const getGoalProgress = (goalId: string) => {
    const featureCount = features.filter((f) => f.goal_ids?.includes(goalId)).length
    const backlogCount = backlog.filter((b) => b.goal_ids?.includes(goalId)).length
    const shippedFeatures = features.filter(
      (f) => f.goal_ids?.includes(goalId) && f.status === 'shipped'
    ).length
    const total = featureCount + backlogCount
    const done = shippedFeatures
    return { total, done, featureCount, backlogCount }
  }

  if (goals.length === 0) {
    return (
      <DataTable>
        <div className="p-10 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No goals in <code className="rounded bg-slate-200/80 dark:bg-slate-700/80 px-1.5 py-0.5">data/goals.yaml</code>. Add entries to see them here.
          </p>
        </div>
      </DataTable>
    )
  }

  return (
    <DataTable>
      <div className="divide-y divide-slate-200 dark:divide-slate-700/60">
      {goals.map((goal) => {
        const { total, done, featureCount, backlogCount } = getGoalProgress(goal.id)
        const isAccomplished = goal.status === 'accomplished'

        return (
          <div
            key={goal.id}
            className={`px-6 py-4 transition-colors ${
              isAccomplished
                ? 'bg-green-50/50 dark:bg-green-900/20'
                : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'
            }`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium text-slate-900 dark:text-slate-100">
                    {goal.title}
                  </h3>
                  <span
                    className={`whitespace-nowrap rounded-md px-2.5 py-0.5 text-xs font-medium ${
                      isAccomplished
                        ? 'bg-green-200/80 dark:bg-green-800/50 text-green-800 dark:text-green-200'
                        : 'bg-cyan-100/80 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300'
                    }`}
                  >
                    {goal.status}
                  </span>
                  {goal.target_date && (
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {goal.target_date}
                    </span>
                  )}
                </div>
                {goal.description && (
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {goal.description}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span>
                    {featureCount} feature{featureCount !== 1 ? 's' : ''}
                  </span>
                  <span>
                    {backlogCount} backlog item{backlogCount !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:shrink-0">
                {goal.links?.map((link) => (
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
              </div>
            </div>
            {total > 0 && (
              <div className="mt-3">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isAccomplished
                        ? 'bg-green-500 dark:bg-green-400'
                        : 'bg-cyan-500 dark:bg-cyan-400'
                    }`}
                    style={{ width: `${total > 0 ? (done / total) * 100 : 0}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {done} of {total} items shipped
                </p>
              </div>
            )}
          </div>
        )
      })}
      </div>
    </DataTable>
  )
}
