import { Skeleton } from "@/components/ui/skeleton";

export default function LoginLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-6 w-32" />
        <div className="text-center text-sm">
          <Skeleton className="h-4 w-48 inline-block" />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="text-balance text-center text-xs text-muted-foreground">
        <Skeleton className="h-3 w-64 inline-block" />
      </div>
    </div>
  );
}
