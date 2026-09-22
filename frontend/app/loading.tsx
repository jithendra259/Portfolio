export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading page"
      className="bg-background text-foreground min-h-screen px-6 py-8 sm:px-10"
    >
      <div className="mx-auto flex min-h-[80vh] max-w-7xl flex-col gap-10">
        <div className="border-border flex items-center justify-between border-b pb-5">
          <div className="bg-muted h-4 w-36 animate-pulse rounded" />
          <div className="bg-muted h-9 w-24 animate-pulse rounded-full" />
        </div>

        <section className="flex flex-1 flex-col justify-center gap-6">
          <div className="bg-muted h-4 w-28 animate-pulse rounded" />
          <div className="bg-muted h-12 max-w-2xl animate-pulse rounded sm:h-16" />
          <div className="bg-muted h-4 max-w-xl animate-pulse rounded" />
          <div className="bg-muted h-4 max-w-md animate-pulse rounded" />
          <div className="mt-3 flex gap-3">
            <div className="bg-muted h-10 w-32 animate-pulse rounded-full" />
            <div className="bg-muted h-10 w-28 animate-pulse rounded-full" />
          </div>
        </section>
      </div>
    </main>
  );
}
