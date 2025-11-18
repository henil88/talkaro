import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-between items-center px-12 py-4">
      <button
        onClick={() => navigate("/")}
        className="Logo cursor-pointer flex items-center gap-2"
      >
        <div className="Icon"></div>
        <span className="text-4xl font-bitcount">Talkaro</span>
      </button>
    </div>
  );
};

export default Navbar;
