type Props = {
  value: string;
  onChange: (value: string) => void;
};

const UsernameInput = ({ value, onChange }: Props) => {
  return (
    <label htmlFor="username" className="flex flex-col gap-2 cursor-pointer">
      <p>Pick a username</p>
      <input
        id="username"
        type="text"
        minLength={3}
        maxLength={12}
        placeholder="johndoe"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-lg pl-6 bg-zinc-800 rounded-lg w-[18rem] h-12 outline-0"
      />
    </label>
  );
};

export default UsernameInput;
