import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "@/public/images/hero.png";
import Logo from "@/public/images/logo.png";
import Content from "@/public/images/content.png";
import TeamCeo from "@/public/images/team-ceo.png";
import TeamDev from "@/public/images/team-dev.png";
import TeamMarket from "@/public/images/team-market.png";
import Contact from "@/public/images/contact-us.png";
import AiPoint from "@/public/images/ai-point.png";
import Link from "next/link";
import LinkButton from "./link-button";

export default function Home() {
  return (
    <div className="w-max-screen overflow-x-hidden">
      <div className="flex flex-col items-center justify-center min-h-[95vh] ">
        <header className="fixed z-10 overflow-hidden top-0 w-full py-4  bg-white">
          <nav className="flex h-20  items-center justify-between max-w-5xl px-4 mx-auto">
            <Link href="#">
              <Image src={Logo} alt="logo" height={55} />
            </Link>
            <div className="flex space-x-4">
              <Button variant="ghost">
                <Link href="#intro">Introduction</Link>
              </Button>
              <Button variant="ghost">
                <Link href="#team">Team</Link>
              </Button>
              <Button variant="ghost">
                <Link href="https://link.tumblbug.com/IYCIxg52rJb">
                  Crowd Funding
                </Link>
              </Button>
              <Button variant="ghost">
                <Link href="#contact">Connect Us</Link>
              </Button>
            </div>
          </nav>
        </header>
        <main
          id=""
          className="mt-10 flex flex-col items-center justify-center flex-1 px-4 text-white bg-[#6CCABF] w-dvw"
        >
          <div className="container mx-auto grid grid-cols-[2fr_5fr] gap-10 py-20">
            <div className="space-y-4 flex flex-col justify-center">
              <div className="relative w-fit">
                <h1 className="text-4xl font-bold text-white drop-shadow-md pb-2">
                  <span className="text-black">나만의</span> 투자분석
                  <span className="text-black"> 친구</span>
                </h1>
                <Image
                  className="absolute top-0 right-0 translate-x-full -translate-y-2/4"
                  src={AiPoint}
                  alt={"AI 강조"}
                />
              </div>
              <LinkButton href={"https://link.tumblbug.com/IYCIxg52rJb"}>
                Beta 버전 이용하러 가기
              </LinkButton>
            </div>
            <div>
              <Image src={Hero} alt="hero" sizes="100vw" />
            </div>
          </div>
        </main>
      </div>
      <div className="w-full flex flex-col items-center pt-20">
        <div id="intro">
          <Image
            src={Content}
            alt="content"
            sizes="56vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
        <div id="team">
          <Image
            src={TeamCeo}
            alt="TeamCeo"
            sizes="56vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
          <Image
            src={TeamDev}
            alt="TeamDev"
            sizes="56vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
          <Image
            src={TeamMarket}
            alt="TeamDev"
            sizes="56vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
        <div id="contact">
          <Image
            src={Contact}
            alt="Contact"
            sizes="56vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}
