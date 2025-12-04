import Button from "../Button";
import UsernameInput from "./UsernameInput";
import AvatarInput from "./AvatarInput";
import { useProfileDetails } from "./hooks/useProfileDetails";

const ProfileSetup: React.FC = () => {
  const { details, updateField, handleSubmit } = useProfileDetails();

  return (
    <form
      className="w-xl bg-zinc-900 py-10 rounded-2xl px-8 flex flex-col gap-10"
    >
      <div className="flex flex-col gap-10.5">
        <h4 className="text-2xl text-center font-roboto">
          Enter your profile details
        </h4>

        <div className="flex flex-col gap-4 items-center">
          <UsernameInput
            value={details.username}
            onChange={(val) => updateField("username", val)}
          />

          <AvatarInput onChange={(file) => updateField("avatar", file)} />
        </div>
      </div>

      <div className="flex justify-center">
        <Button className="w-[11.12rem]" onClick={handleSubmit}>Next</Button>
      </div>
    </form>
  );
};

export default ProfileSetup;
