import Button from "../../../components/Button";
import IndiaFlagIcon from "../../../components/icons/IndiaFlag";

const index = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-xl bg-zinc-900 py-6 rounded-md px-8 flex flex-col gap-6">
        <div className="flex flex-col">
          <h4 id="phone" className="text-xl font-normal font-roboto pb-3">
            Enter you phone number
          </h4>
          <div className="input-box bg-zinc-800 rounded-sm flex pl-2 justify-center items-center w-[10.75rem]">
            <label id="phone">
              <IndiaFlagIcon size={16} />
            </label>
            <input
              type="text"
              className="text-sm outline-0 px-2 py-2 w-full"
              id="phone"
            />
          </div>
        </div>
        <div className="w-full">
          <Button onClick={() => console.log("Hello")}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default index;
