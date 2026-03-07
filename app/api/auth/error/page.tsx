'use client'

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-8">
      <div className="w-full max-w-md rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/40 p-8 shadow-lg">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
          <svg
            className="h-6 w-6 text-amber-600 dark:text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Access Denied
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          You signed in with GitHub, but this site is restricted to members of a
          specific organization. Your account is not in that organization, so
          you cannot access the content.
        </p>
        <div className="mt-6 rounded-lg bg-slate-100 dark:bg-slate-800/60 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            When does this happen?
          </p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            When auth is enabled (e.g. <code className="rounded bg-slate-200/80 dark:bg-slate-700/80 px-1">NEXT_PUBLIC_AUTH_ENABLED=true</code>), only GitHub users in the configured org can view the site. If you&apos;re not in that org, you&apos;ll see this page after signing in.
          </p>
        </div>
        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
          If you believe this is an error, contact the repository owner.
        </p>
      </div>
    </div>
  )
}
