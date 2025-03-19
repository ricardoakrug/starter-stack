import { Skeleton } from "@/components/ui/skeleton";

export default function VerifyLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-12 w-12 rounded-md" />
        <Skeleton className="h-6 w-48" />
        <div className="text-center text-sm">
          <Skeleton className="h-4 w-72 inline-block" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-10 w-full" />
        <div className="text-center text-sm">
          <Skeleton className="h-4 w-48 inline-block" />
        </div>
      </div>
    </div>
  );
}
