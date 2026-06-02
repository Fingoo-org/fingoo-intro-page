"use client";

import NavBar from "./components/nav-bar";
import {
  HeroSection,
  ValueProposition,
  BrandStory,
  GamificationSection,
  AppFeatures,
  CareerSection,
  PageFooter,
} from "./components/sections";

export default function Home() {
  const handleScrollToFeatures = () => {
    document.getElementById("brand")?.scrollIntoView({ behavior: "smooth" });
  };

  const openLink = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="w-full overflow-x-hidden bg-neutral-950">
      <NavBar />

      <HeroSection onScrollToFeatures={handleScrollToFeatures} openLink={openLink} />
      <ValueProposition />
      {/* <BrandStory /> */}
      <GamificationSection />
      <AppFeatures />
      <CareerSection />
      <PageFooter />
    </div>
  );
}
