type Props = {
  onChange: (file: File) => void;
};

const AvatarInput = ({ onChange }: Props) => {
  return (
    <label
      htmlFor="avatar"
      className="flex flex-col gap-2 cursor-pointer"
    >
      <p className="text-left">Upload your avatar</p>
      <input
        id="avatar"
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onChange(file);
        }}
        className="text-lg/loose cursor-pointer pl-6 bg-zinc-800 rounded-lg w-[18rem] h-12 duration-200 outline-0 py-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </label>
  );
};

export default AvatarInput;
