import { useAuth } from "@/hooks/useAuth";
import useOverlay from "@/hooks/useOverlay";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DOT_COUNT = 3;

const ProfileTitle = () => (
  <div className="Profile-title relative w-fit">
    <span>Profile</span>
    <div className="absolute w-full h-0.5 top-10 left-0 bg-blue-500" />
  </div>
);

type EditButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const EditButton = ({ className, ...props }: EditButtonProps) => (
  <button
    {...props}
    className={cn(
      "w-5 h-5 flex flex-col justify-center items-center gap-1 cursor-pointer",
      className,
    )}
  >
    {Array.from({ length: DOT_COUNT }, (_, index) => (
      <div key={index} className="w-1 h-1 rounded-full bg-white" />
    ))}
  </button>
);

type ProfileDetailsProps = {
  onEdit: () => void;
};

const ProfileDetails = ({ onEdit }: ProfileDetailsProps) => {
  const { name, avatar } = useAuth();
  const username = name.replaceAll(" ", "_").toLowerCase();

  return (
    <div className="Profile-details flex gap-4">
      <div className="img w-20 h-20">
        <img className="rounded-full" src={avatar} alt={name} />
      </div>
      <div className="name flex flex-col justify-center items-start">
        <div className="cap-name text-2xl font-semibold">
          <span>{name}</span>
        </div>
        <div className="username text-base font-normal">
          <span>@{username}</span>
        </div>
      </div>
      <div className="edit ml-4 flex flex-col justify-center items-center">
        <EditButton onClick={onEdit} />
      </div>
    </div>
  );
};

type SettingsProps = {
  onClose: () => void;
};

const Settings = ({ onClose }: SettingsProps) => {
  const { name, avatar } = useAuth();
  const [nextName, setNextName] = useState(name);
  const [nextAvatar, setNextAvatar] = useState(avatar);

  const onSave = useCallback(() => {
    // updateProfile({ name: nextName, avatar: nextAvatar });
    alert(
      "The edit profile is in progress, don't worry we will add this feature",
    );
    onClose();
  }, [onClose]);

  return (
    <div className="fixed z-99 w-full h-screen top-0 left-0 bg-black/25 flex justify-center items-center">
      <div className="card w-full md:w-3xl max-h-screen bg-zinc-800 p-6 rounded-lg flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <Button variant="ghost" onClick={onClose}>
            X
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              value={nextName}
              onChange={(e) => setNextName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Avatar URL</label>
            <Input
              value={nextAvatar}
              onChange={(e) => setNextAvatar(e.target.value)}
            />
          </div>
          <div className="flex gap-4 justify-end pt-4">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onSave}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const { panel, open, close } = useOverlay();

  return (
    <>
      <div className="py-4 md:py-6 text-2xl font-semibold w-full">
        <ProfileTitle />
        <div className="main-profile mt-12 py-4 md:py-6 w-full">
          <ProfileDetails onEdit={() => open("settings")} />
        </div>
      </div>
      {panel === "settings" && <Settings onClose={close} />}
    </>
  );
};

export default Profile;
