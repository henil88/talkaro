import AudioPlayer from "@/components/tools/AudioPlayer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocalState } from "@/hooks/useLocalState";
import { useWebRTC } from "@/hooks/useWebRTC";

import { ArrowLeft, MicOff } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="w-full py-12">
      <div className="headings flex items-center">
        <Link className="p-3 cursor-pointer" to="/app">
          <ArrowLeft size={16} />
        </Link>
        <div className="relative">
          <span>All voice rooms</span>
          <div className="w-1/2 h-0.5 absolute -bottom-2 left-0 bg-blue-500"></div>
        </div>
      </div>
    </header>
  );
};

const TopHeader = () => {
  const topic = useLocalState((state) => state.room?.topic);

  return (
    <div className="w-full flex justify-between py-6 px-5">
      <div className="topic">
        <span>{topic}</span>
      </div>
    </div>
  );
};

const UserHandler = ({
  name,
  avatar,
  id,
}: {
  name: string;
  avatar: string;
  id?: string;
}) => {
  return (
    <>
      <div className="w-full h-auto mb-9 flex flex-col justify-between items-center gap-2">
        <div className="image rounded-full w-22.5 h-22.5">
          <img
            className="w-full h-full rounded-full object-cover bg-cover"
            src={avatar}
            alt={name}
          />
        </div>
        <span className="text-center w-22.5">
          {name
            .toLowerCase()
            .replace(/^./, (c) => c.toUpperCase())
            .replace(/^(.{8}).+$/, "$1...")}
        </span>
      </div>
      {id && <AudioPlayer id={id} />}
    </>
  );
};

const Controls = () => {
  return (
    <div className="absolute pointer-events-none bottom-0 left-0 w-full mb-8 flex justify-center px-4">
      <div className="max-w-[824px] w-full pointer-events-auto bg-neutral-950 rounded-lg px-7 py-4 grid grid-cols-[auto_1fr_auto] items-center gap-x-7.5 gap-y-4 md:grid-cols-[auto_1fr_auto]">
        {/* Mic Button */}
        <MicOff className="bg-neutral-800 w-14 h-14 p-4 cursor-pointer rounded-full text-white" />

        {/* Mic Select */}
        <div className="col-span-3 md:col-span-1 md:col-start-2">
          <Select defaultValue="sm7b">
            <SelectTrigger className="h-14 w-full max-w-full md:max-w-85 bg-neutral-800 border-none text-white rounded-lg px-4 focus:ring-0">
              <SelectValue placeholder="Select microphone" />
            </SelectTrigger>

            <SelectContent
              className="bg-neutral-900 border-neutral-800 text-white"
              position="popper"
            >
              <SelectItem value="sm7b">Shure SM7B Microphone</SelectItem>
              <SelectItem value="rode">Rode NT-USB</SelectItem>
              <SelectItem value="blue">Blue Yeti</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* End */}
        <div className="text-red-500 font-medium cursor-pointer justify-self-end col-start-3 row-start-1">
          The end
        </div>
      </div>
    </div>
  );
};

const PeerList = () => {
  const ps = useWebRTC((state) => state.peerSettings);
  const us = useLocalState((state) => state.userSettings);
  const members = useMemo(
    () =>
      Object.keys(ps).map((key) => {
        return { id: key, avatar: ps[key].avatar, name: ps[key].username };
      }),
    [ps],
  );

  useEffect(() => console.log(ps, us), [ps, us]);

  return (
    <>
      {/* Current User */}
      <UserHandler name={us.username} avatar={us.avatar} />
      {/* Other Users */}
      {members.map((member) => (
        <UserHandler {...member} key={member.id} />
      ))}
    </>
  );
};

const Room = () => {
  return (
    <section className="flex h-full w-full flex-col">
      <Header />
      <main className="w-full min-h-0 h-full flex-1 bg-zinc-900 rounded-t-lg flex flex-col relative">
        <TopHeader />
        <div className="parent w-full h-full hide-scrollbar px-4 py-8">
          <div className="w-full h-auto grid gap-x-5 grid-cols-[repeat(auto-fit,minmax(5.625rem,1fr))] mb-36">
            <PeerList />
          </div>
        </div>
        <Controls />
      </main>
    </section>
  );
};

export default Room;

export const Component = Room;
