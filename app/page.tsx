import { Button } from "@/app/components/button";
import Image from "next/image";
import Hero from "@/public/images/hero.png";
import Content from "@/public/images/content.png";
import Team from "@/public/images/team.png";
import Contact from "@/public/images/contact-us.png";
import AiPoint from "@/public/images/ai-point.png";
import Link from "next/link";
import LinkButton from "./components/link-button";
import NavBar from "./components/nav-bar";

export default function Home() {
  return (
    <div className="w-max-screen overflow-x-hidden">
      <div className="flex flex-col items-center justify-center min-h-[95vh] ">
        <NavBar />
        <main
          id=""
          className="mt-10 flex flex-col items-center justify-center flex-1 px-4 text-white bg-[#6CCABF] w-dvw"
        >
          <div className="lg:container mx-auto grid lg:grid-cols-[2fr_5fr] lg:grid-rows-none grid-rows-[1fr_1fr] gap-10 lg:py-20">
            <div className="space-y-4 flex flex-col justify-center items-center lg:items-stretch">
              <div className="relative w-fit">
                <h1 className="lg:text-4xl text-3xl font-bold text-white drop-shadow-md pb-2">
                  <span className="text-black">나만의</span> 투자분석
                  <span className="text-black"> 친구</span>
                </h1>
                <Image
                  className="absolute top-0 right-0 translate-x-full -translate-y-2/4 lg:max-w-16 max-w-12"
                  src={AiPoint}
                  alt={"AI 강조"}
                />
              </div>
              <LinkButton
                className="bg-white text-[#00B4AA]"
                href={"https://fingoo.app"}
              >
                Beta 버전 이용하러 가기
              </LinkButton>
            </div>
            <div>
              <Image src={Hero} alt="hero" className="w-auto object-fill" />
            </div>
          </div>
        </main>
      </div>
      <div className="w-full flex flex-col items-center pt-20">
        <div id="intro">
          <Image
            src={Content}
            alt="content"
            sizes="(max-width: 1200px) 100vw, 56vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
        <div id="team">
          <Image
            src={Team}
            alt="Team"
            sizes="(max-width: 1200px) 100vw, 80vw"
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
