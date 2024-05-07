import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00b4b6]">
      <header className="w-full py-4 bg-white">
        <nav className="flex items-center justify-between max-w-5xl px-4 mx-auto">
          <h1 className="text-3xl font-bold">FINGOO</h1>
          <div className="flex space-x-4">
            <Button variant="ghost">Introduction</Button>
            <Button variant="ghost">Team</Button>
            <Button variant="ghost">Crowd Funding</Button>
            <Button variant="ghost">Connect Us</Button>
          </div>
        </nav>
      </header>
      <main className="flex flex-col items-center justify-center flex-1 px-4 text-white"></main>
    </div>
  );
}
