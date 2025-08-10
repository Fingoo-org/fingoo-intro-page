"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "./sheet";

import { Button } from "@/app/components/button";
import {
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import LinkButton from "./link-button";
import Logo from "@/public/images/logo.png";
import Web from "@/public/images/web.png";

export default function NavBar() {
  const handleDownloadIR = () => {
    const link = document.createElement("a");
    link.href = "/docs/fingoo-ir.pdf";
    link.download = "FINGOO_IR자료_2024년-9월호.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="fixed z-50 top-4 left-0 w-full flex justify-center pointer-events-none">
      <nav className="pointer-events-auto w-[90%] mx-auto flex lg:h-[75px] h-16 items-center justify-between px-5 shadow-lg rounded-xl bg-white/70 backdrop-blur-lg">
        <Link href="#">
          <Image
            src={Logo}
            alt="logo"
            className="object-contain w-auto h-8 lg:h-10"
          />
        </Link>

        {/* 모바일 메뉴 */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <HamburgerMenuIcon className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <Image
                  src={Logo}
                  alt="logo"
                  className="object-contain w-auto h-8"
                />
                <SheetDescription>나만의 투자분석 친구</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col divide-y *:py-6 mt-4">
                <LinkButton href="#">About Us</LinkButton>
                <LinkButton
                  href="https://forms.gle/dW6my1QBRT5kdtXD8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Recruit
                </LinkButton>
                <LinkButton
                  href="https://coherent-beak-abf.notion.site/Our-Team-2401d4287d7480b9ac1dcfb960cfb562?source=copy_link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Our Team
                </LinkButton>
                <LinkButton
                  href="http://pf.kakao.com/_XQSKn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  고객센터
                </LinkButton>
                <LinkButton
                  href="https://fingoo.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  웹으로 이용
                </LinkButton>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* 데스크탑 메뉴 */}
        <div className="hidden md:flex space-x-5">
          <LinkButton href="#">About Us</LinkButton>
          <LinkButton
            href="https://forms.gle/dW6my1QBRT5kdtXD8"
            target="_blank"
            rel="noopener noreferrer"
          >
            Recruit
          </LinkButton>
          <LinkButton
            href="https://coherent-beak-abf.notion.site/Our-Team-2401d4287d7480b9ac1dcfb960cfb562?source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Our Team
          </LinkButton>
          <LinkButton
            href="http://pf.kakao.com/_XQSKn"
            target="_blank"
            rel="noopener noreferrer"
          >
            고객센터
          </LinkButton>

          <button
            onClick={() => window.open("https://fingoo.app", "_blank")}
            className="inline-flex items-center gap-1 md:gap-2 bg-[#63c8bc] text-white text-lg lg:text-xl font-bold lg:px-4 px-3.5 py-1.5 lg:py-2 rounded-lg transition"
          >
            <Image
              src={Web}
              alt="WebLogo"
              className="object-contain w-auto h-5 lg:h-6"
            />
            웹으로 이용
          </button>
        </div>
      </nav>
    </header>
  );
}
