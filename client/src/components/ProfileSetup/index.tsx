import { useState } from "react";
import Button from "../Button";

type UserDetails = {
  username: string;
  fullName: string;
  profile: File | null;
};

const AccountDetails: React.FC = () => {
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
          Enter your profile details
        </h4>
        <div className="w-full flex justify-center items-center flex-col gap-4">
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
          <div className="input-box flex justify-center items-center cursor-pointer">
            <label
              htmlFor="profile"
              className="flex justify-between flex-col w-full h-full gap-2 cursor-pointer"
            >
              <p className="text-left">Upload your Avatar</p>
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
                className="text-lg/loose cursor-pointer pl-6 bg-zinc-800 rounded-lg w-[18rem] h-12 duration-200 outline-0 py-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center flex-col gap-5">
        <Button
          className="w-[11.12rem]"
          onClick={() => console.log("Profile Setup")}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AccountDetails;
