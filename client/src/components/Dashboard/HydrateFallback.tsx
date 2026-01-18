import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { memo } from "react";

type WithClassName = {
  className?: string;
};

type RepeatedSkeletonsProps = {
  count: number;
  className: string;
};

const MemberAvatarSkeleton = memo(({ className }: WithClassName) => {
  return (
    <Skeleton
      className={cn(
        "absolute h-9 w-9 rounded-full bg-neutral-800",
        className,
      )}
    />
  );
});

const RepeatedSkeletons = memo(
  ({ count, className }: RepeatedSkeletonsProps) => {
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <Skeleton key={index} className={className} />
        ))}
      </>
    );
  },
);

const AVATAR_POSITIONS = [
  { top: "top-0", left: "left-0" },
  { top: "top-5", left: "left-5" },
] as const;

const Card = memo(({ className }: WithClassName) => {
  return (
    <div
      className={cn(
        "flex h-46 min-w-73 flex-col justify-between rounded-2xl bg-neutral-900 p-5",
        className,
      )}
    >
      <Skeleton className="h-4 w-full bg-neutral-800" />

      <div className="flex justify-start gap-12">
        <div className="relative h-15 w-15">
          {AVATAR_POSITIONS.map(({ top, left }, index) => (
            <MemberAvatarSkeleton
              key={index}
              className={cn(top, left)}
            />
          ))}
        </div>

        <div className="flex w-full flex-col justify-around">
          <RepeatedSkeletons
            count={2}
            className="h-4 w-2/3 bg-neutral-800"
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Skeleton className="h-6 w-10 bg-neutral-800" />
      </div>
    </div>
  );
});

const CARD_COUNT = 24;

const HydrateFallback = () => {
  return (
    <div className="flex h-full w-full flex-wrap gap-10 overflow-hidden">
      {Array.from({ length: CARD_COUNT }).map((_, index) => (
        <Card key={index} className="flex-1" />
      ))}
    </div>
  );
};

export default HydrateFallback;
