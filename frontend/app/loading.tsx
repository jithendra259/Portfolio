export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading page"
      className="min-h-screen bg-background px-6 py-8 text-foreground sm:px-10"
    >
      <div className="mx-auto flex min-h-[80vh] max-w-7xl flex-col gap-10">
        <div className="flex items-center justify-between border-b border-border pb-5">
          <div className="h-4 w-36 animate-pulse rounded bg-muted" />
          <div className="h-9 w-24 animate-pulse rounded-full bg-muted" />
        </div>

        <section className="flex flex-1 flex-col justify-center gap-6">
          <div className="h-4 w-28 animate-pulse rounded bg-muted" />
          <div className="h-12 max-w-2xl animate-pulse rounded bg-muted sm:h-16" />
          <div className="h-4 max-w-xl animate-pulse rounded bg-muted" />
          <div className="h-4 max-w-md animate-pulse rounded bg-muted" />
          <div className="mt-3 flex gap-3">
            <div className="h-10 w-32 animate-pulse rounded-full bg-muted" />
            <div className="h-10 w-28 animate-pulse rounded-full bg-muted" />
          </div>
        </section>
      </div>
    </main>
  );
}
