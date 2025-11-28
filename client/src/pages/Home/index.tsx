import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="max-w-xl bg-zinc-900 py-6 rounded-md px-8 flex flex-col gap-6">
        <div>
          <h3 className="text-2xl pb-0.5 text-zinc-50">
            Welcome to <span className="font-bitcount text-3xl">Talkaro</span>!
          </h3>
          <p className="w-full text-sm text-zinc-400">
            We’re working hard to get Talkaro ready for everyone! As we put on
            the final touches, we’re gradually welcoming users to ensure a
            smooth and seamless experience.
          </p>
        </div>

        <div className="w-full h-px -mb-1 px-0.5">
          <div className="w-full h-full bg-zinc-400/40"></div>
        </div>

        <div className="w-full">
          <Button onClick={() => navigate("/auth")}>Get Your Username</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
