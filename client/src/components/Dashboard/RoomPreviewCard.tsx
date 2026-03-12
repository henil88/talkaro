import { memo, useCallback, type FC } from "react";
import { cn } from "@/libs/utils";
import { useNavigate } from "react-router";

interface Member {
  name: string;
  avatar?: string;
}

interface RoomPreviewCardProps extends React.ComponentPropsWithoutRef<"div"> {
  link: string;
  title: string;
  members: readonly Member[];
  count?: number;
}

const MAX_VISIBLE_MEMBERS = 2;

interface MemberAvatarProps {
  member?: Member;
  positionClass: string;
}

const MemberAvatar: FC<MemberAvatarProps> = ({ member, positionClass }) => {
  if (!member || !member.avatar) return null;

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
        loading="lazy"
        onContextMenu={(e) => e.preventDefault()}
        className="h-full w-full rounded-full object-cover"
      />
    </div>
  );
};

interface MemberNameProps {
  member: Member;
}

const MemberName: FC<MemberNameProps> = ({ member }) => {
  return (
    <div className="text-white font-normal">
      <span>{member.name || "User"} </span>
      <span> 💬</span>
    </div>
  );
};

const RoomPreviewCard: FC<RoomPreviewCardProps> = ({
  link,
  title,
  members,
  count,
  className,
  ...divProps
}) => {
  const visibleMembers = members.slice(0, MAX_VISIBLE_MEMBERS);
  const displayedCount = count ?? members.length;

  const navigate = useNavigate();
  const handleRedirect = useCallback(() => {
    navigate(link);
  }, [link, navigate]);

  return (
    <div
      {...divProps}
      className={cn(
        "flex h-46 min-w-73 max-w-full sm:max-w-80 cursor-pointer select-none flex-col justify-between rounded-2xl bg-neutral-900 p-5",
        className,
      )}
      onClick={handleRedirect}
    >
      <div className="mb-2.5 text-base font-semibold text-white">{title}</div>

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
