import { Skeleton } from "@/components/ui/skeleton";

export default function WaitlistLoading() {
  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm text-center">
        <Skeleton className="h-8 w-48 mx-auto mb-4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4 mx-auto mt-2" />
      </div>
    </div>
  );
}
