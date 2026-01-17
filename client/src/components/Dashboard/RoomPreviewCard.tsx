import { memo, type FC } from "react";
import { cn } from "@/lib/utils";

/* =======================
 * Types
 * ======================= */

interface Member {
  name: string;
  avatar?: string;
}

interface RoomPreviewCardProps
  extends React.ComponentPropsWithoutRef<"div"> {
  title: string;
  members: readonly Member[];
  count?: number;
}

/* =======================
 * Constants
 * ======================= */

const MAX_VISIBLE_MEMBERS = 2;

/* =======================
 * Subcomponents
 * ======================= */

interface MemberAvatarProps {
  member: Member;
  positionClass: string;
}

const MemberAvatar: FC<MemberAvatarProps> = memo(
  ({ member, positionClass }) => {
    if (!member.avatar) return null;

    return (
      <div
        className={cn(
          "absolute h-9 w-9 overflow-hidden rounded-full",
          positionClass,
        )}
      >
        <img
          src={member.avatar}
          alt={member.name}
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          className="h-full w-full rounded-full object-cover"
        />
      </div>
    );
  },
);

MemberAvatar.displayName = "MemberAvatar";

interface MemberNameProps {
  member: Member;
}

const MemberName: FC<MemberNameProps> = memo(({ member }) => {
  return (
    <div className="text-white font-normal">
      <span>{member.name || "User"} </span>
      <span> 💬</span>
    </div>
  );
});

MemberName.displayName = "MemberName";

/* =======================
 * Main Component
 * ======================= */
const RoomPreviewCard: FC<RoomPreviewCardProps> = ({
  title,
  members,
  count,
  className,
  ...divProps
}) => {
  const visibleMembers = members.slice(0, MAX_VISIBLE_MEMBERS);
  const displayedCount = count ?? members.length;

  return (
    <div
      {...divProps}
      className={cn(
        "flex h-46 min-w-73 select-none flex-col justify-between rounded-2xl bg-neutral-900 p-5",
        className,
      )}
    >
      <div className="mb-2.5 text-base font-semibold text-white">
        {title}
      </div>

      <div className="flex justify-start gap-10.5">
        <div className="relative h-15 w-15">
          <MemberAvatar
            member={visibleMembers[0]}
            positionClass="top-0 left-0"
          />
          <MemberAvatar
            member={visibleMembers[1]}
            positionClass="top-5 left-5"
          />
        </div>

        <div className="flex h-full flex-1 flex-col">
          {visibleMembers.map((member) => (
            <MemberName key={member.name} member={member} />
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <div className="font-bold text-neutral-300">
          <span>{displayedCount}</span>
          <span> 👤</span>
        </div>
      </div>
    </div>
  );
};

export default memo(RoomPreviewCard);
