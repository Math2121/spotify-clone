import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
interface ISession {
  data: {
    user: {
      image: string;
      name: string;
    };
  };
}

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-yellow-50",
];
function Main() {
  const { data: session }: ISession = useSession();
  const [color, setColor] = useState<string | null>('');

  useEffect(() => {
    setColor(shuffle(colors).pop() as string);
  }, []);
  return (
    <div className="flex-grow relative">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <img
            src={session?.user.image}
            alt=""
            className="rounded-full -w-100 h-10"
          />

          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={` flex items-end space-x-7 bg-gradient-to-b to-black from-red-500 h-80 text-white padding-0`}
      >
        <p>ok</p>
      </section>
    </div>
  );
}

export default Main;
