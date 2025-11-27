import { useEffect, useState } from "react";
import Button from "../../../../components/Button";

type Props = {
  goToPreviousStage: () => void;
  goToNextStage: () => void;
};

type UserDetails = {
  username: string;
  fullName: string;
  profile: File | null;
};

const AccountDetails: React.FC<Props> = ({ goToNextStage }) => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    username: "",
    fullName: "",
    profile: null,
  });
  return (
    <div className="w-xl bg-zinc-900 py-22 rounded-2xl px-8 flex flex-col gap-10">
      <div className="flex flex-col gap-10.5">
        <h4
          id="phone"
          className="text-2xl font-normal font-roboto text-center w-full select-none duration-200"
        >
          Enter your email id
        </h4>
        <div className="w-full flex justify-center items-center flex-col gap-4">
          <div className="input-box flex justify-center items-center">
            <label
              htmlFor="full-name"
              className="flex justify-between flex-col w-full h-full gap-2 cursor-pointer"
            >
              <p className="text-left">What's your full name?</p>
              <input
                id="full-name"
                type="text"
                name="fullName"
                placeholder="John Doe"
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    fullName: e.target.value,
                  })
                }
                value={userDetails.fullName}
                className="text-lg/loose pl-6 bg-zinc-800 rounded-lg w-[18rem] h-12 duration-200 outline-0 py-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </label>
          </div>
          <div className="input-box flex justify-center items-center">
            <label
              htmlFor="username"
              className="flex justify-between flex-col w-full h-full gap-2 cursor-pointer"
            >
              <p className="text-left">Pick a username</p>
              <input
                id="username"
                type="text"
                name="userName"
                minLength={3}
                maxLength={12}
                placeholder="johndoe"
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    username: e.target.value,
                  })
                }
                className="text-lg/loose pl-6 bg-zinc-800 rounded-lg w-[18rem] h-12 duration-200 outline-0 py-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </label>
          </div>
          <div className="input-box bg-zinc-800 rounded-lg flex justify-center items-center w-[18rem] h-12">
            <label
              htmlFor="profile"
              className="flex items-center justify-between w-full h-full px-3.5 cursor-pointer"
            >
              <p></p>
              <input
                id="profile"
                type="file"
                name="profile"
                accept="image/*"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    setUserDetails({
                      ...userDetails,
                      profile: files[0],
                    });
                  }
                }}
                className="text-lg/loose duration-200 outline-0 py-2 w-full h-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center flex-col gap-5">
        <Button className="w-[11.12rem]" onClick={goToNextStage}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default AccountDetails;
