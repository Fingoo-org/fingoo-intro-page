import { Button } from "@/app/components/button";
import Link from "next/link";
import Logo from "@/public/images/logo.png";
import Image from "next/image";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function NavBar() {
  return (
    <header className="fixed z-10 overflow-hidden top-0 w-full lg:py-4 py-3  bg-white">
      <nav className="flex lg:h-20 h-8  items-center justify-between max-w-5xl px-4 mx-auto">
        <Link href="#">
          <Image
            src={Logo}
            alt="logo"
            className="object-contain w-auto h-8 lg:h-14"
          />
        </Link>
        <div className="lg:hidden">as</div>
        <div className="hidden lg:flex space-x-4">
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
  );
}
