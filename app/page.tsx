import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "@/public/images/hero.png";
import Logo from "@/public/images/logo.png";
import Content from "@/public/images/content.png";
import TeamCeo from "@/public/images/team-ceo.png";
import TeamDev from "@/public/images/team-dev.png";
import TeamMarket from "@/public/images/team-market.png";
import Contact from "@/public/images/contact-us.png";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-max-screen overflow-x-hidden">
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <header className="w-full py-4  bg-white">
          <nav className="flex h-20  items-center justify-between max-w-5xl px-4 mx-auto">
            <Image src={Logo} alt="logo" height={55} />
            <div className="flex space-x-4">
              <Button variant="ghost">
                <Link href="#intro">Introduction</Link>
              </Button>
              <Button variant="ghost">Team</Button>
              <Button variant="ghost">Crowd Funding</Button>
              <Button variant="ghost">Connect Us</Button>
            </div>
          </nav>
        </header>
        <main className="flex flex-col items-center justify-center flex-1 px-4 text-white bg-[#6CCABF] w-dvw">
          <div className="container mx-auto grid grid-cols-[2fr_5fr] gap-10 py-20">
            <div className="space-y-4 flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-white">
                나만의 투자분석 최고
              </h1>
              <p className="text-white">Beta 버전 이용하러 가기</p>
              <Button className="bg-white text-[#00B4AA]" variant="secondary">
                Get started
              </Button>
            </div>
            <div>
              <Image src={Hero} alt="hero" sizes="100vw" />
            </div>
          </div>
        </main>
      </div>
      <div className="w-full flex flex-col items-center pt-20">
        <div id="intro">
          <Image src={Content} width={1080} alt="content" />
        </div>
        <Image src={TeamCeo} width={1080} alt="TeamCeo" />
        <Image src={TeamDev} width={1080} alt="TeamDev" />
        <Image src={TeamMarket} width={1080} alt="TeamMarket" />
        <Image src={Contact} width={1080} alt="Contact" />
      </div>
    </div>
  );
}
