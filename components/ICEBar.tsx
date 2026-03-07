type ICE = { impact: number; confidence: number; ease: number }

const max = 10

export function ICEBar({ ice }: { ice: ICE }) {
  const avg = ((ice.impact + ice.confidence + ice.ease) / 3).toFixed(1)
  const segmentWidth = 100 / 3
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-2.5 w-28 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
        title={`Impact: ${ice.impact} · Confidence: ${ice.confidence} · Ease: ${ice.ease}`}
      >
        <div
          className="bg-cyan-500 dark:bg-cyan-400 transition-all"
          style={{ width: `${(ice.impact / max) * segmentWidth}%` }}
        />
        <div
          className="bg-violet-500 dark:bg-violet-400 transition-all"
          style={{ width: `${(ice.confidence / max) * segmentWidth}%` }}
        />
        <div
          className="bg-amber-500 dark:bg-amber-400 transition-all"
          style={{ width: `${(ice.ease / max) * segmentWidth}%` }}
        />
      </div>
      <span className="min-w-[2ch] text-right text-xs font-semibold tabular-nums text-slate-600 dark:text-slate-400">
        {avg}
      </span>
    </div>
  )
}
