import { Skeleton } from "@/components/ui/skeleton";

const CenteredCardSkeleton = () => {
  return (
    <div className="flex max-h-screen h-full w-screen items-center justify-center">
      <div className="w-full max-w-lg rounded-2xl bg-neutral-900 px-8 py-10 shadow-lg">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex w-full items-center justify-center gap-4">
            <Skeleton className="h-7 w-7 rounded-full bg-neutral-800" />
            <Skeleton className="h-5 w-1/3 rounded-full bg-neutral-800" />
          </div>
          <div className="flex w-full flex-col items-center space-y-3">
            <Skeleton className="h-4 w-3/4 bg-neutral-800" />
            <Skeleton className="h-3 w-2/3 bg-neutral-800" />
          </div>
          <Skeleton className="h-7 w-1/3 rounded-full bg-neutral-800" />
          <Skeleton className="mt-2 mb-2 h-3 w-2/3 rounded-full bg-neutral-800" />
          <Skeleton className="h-3 w-3/4 rounded-full bg-neutral-800" />
        </div>
      </div>
    </div>
  );
};

export default CenteredCardSkeleton;
