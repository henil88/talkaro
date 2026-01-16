interface Member {
  name: string;
  avatar?: string;
}

interface CardProps {
  title: string;
  members: Member[];
  count?: number;
}

const MAX_VISIBLE_MEMBERS = 2;

function MemberAvatar({
  member,
  positionClass,
}: {
  member: Member;
  positionClass: string;
}) {
  return (
    <div
      className={`absolute ${positionClass} w-9 h-9 rounded-full overflow-hidden`}
    >
      <img
        onContextMenu={() => false}
        className="w-full h-full rounded-full object-cover"
        src={member.avatar}
        alt={member.name}
      />
    </div>
  );
}

function MemberName({ member }: { member: Member }) {
  return (
    <div className="name text-white font-normal">
      <span>{member.name || "User"} </span>
      <span> 💬</span>
    </div>
  );
}

function RoomPreviewCard({
  title,
  members,
  count,
  ...props
}: React.ComponentProps<"div"> & CardProps) {
  const visibleMembers = members.slice(0, MAX_VISIBLE_MEMBERS);

  return (
    <div
      className="bg-neutral-900 w-73 h-46 rounded-2xl p-5 select-none flex flex-col justify-between"
      {...props}
    >
      <div className="room-title text-white text-base mb-2.5 font-semibold">
        <span>{title}</span>
      </div>

      <div className="members flex justify-start gap-10.5">
        <div className="members-img relative w-15 h-15">
          {visibleMembers[0] && (
            <MemberAvatar
              member={visibleMembers[0]}
              positionClass="top-0 left-0"
            />
          )}
          {visibleMembers[1] && (
            <MemberAvatar
              member={visibleMembers[1]}
              positionClass="top-5 left-5"
            />
          )}
        </div>

        <div className="members-name flex flex-col h-full flex-1">
          {visibleMembers.map((member, index) => (
            <MemberName key={index} member={member} />
          ))}
        </div>
      </div>

      <div className="count flex justify-end">
        <div className="people-count text-neutral-300 font-bold">
          <span>{count ?? members.length} </span>
          <span> 👤</span>
        </div>
      </div>
    </div>
  );
}

export default RoomPreviewCard;
