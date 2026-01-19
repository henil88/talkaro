const InputWithLabel = ({
  icon,
  value,
  onChange,
  type,
  placeholder,
}: {
  icon?: React.ReactNode;
  value: string;
  onChange: (val: string) => void;
  type: string;
  placeholder: string;
}) => (
  <div className="w-full flex justify-center items-center">
    <label className="input-box bg-zinc-800 rounded-lg flex justify-center items-center w-[18rem] h-12">
      <label className="flex items-center justify-between w-full h-full px-3.5 cursor-pointer">
        {icon}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={type}
          placeholder={placeholder}
          className="text-lg/loose duration-200 outline-0 pl-3.5 py-2 w-full h-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </label>
    </label>
  </div>
);

export default InputWithLabel;
