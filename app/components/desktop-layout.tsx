"use client";

import App_Store_Badge from "@/public/images/app_store_badge.svg";
import Desktop from "@/public/images/desktop.png";
import GooglePlay_Badge from "@/public/images/googlePlay_badge.png";
import Image from "next/image";
import Web from "@/public/images/web.png";

const DesktopLayout = () => {
  return (
    <>
    {/* 텍스트 영역 (md 이상에서만 표시, sm 이하 숨김) */}
            <div className="hidden md:flex min-w-[210px] md:min-w-[300px] lg:min-w-[410px] xl:min-w-[420px] flex-col justify-center text-center items-center">
              <h2 className="text-[24px] md:text-[35px] lg:text-[45px] xl:text-[50px] font-extrabold text-gray-500">
                검색의 시대는 끝
              </h2>
              <div className="relative mt-3">
                <h1 className="text-[24px] md:text-[35px] lg:text-[45px] xl:text-[50px] font-extrabold text-[#333] z-10 relative">
                  이제 투자분석도 <span className="text-[#333]">AI로</span>
                </h1>
                <div className="absolute bottom-1 left-0 h-2 md:h-4 bg-[#6DD9CD] animate-underline" />
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-3 justify-center lg:justify-between items-center mt-10 w-full lg:w-auto">
                <div className="flex md:flex-row gap-1.5 md:gap-0 flex-col lg:w-auto w-full md:justify-between lg:gap-3 mb-3 lg:mb-0">
                  <Image
                    src={GooglePlay_Badge}
                    alt="Google Play Badge"
                    className="object-contain w-auto h-9 md:h-10 lg:h-9"
                  />
                  <div className="block lg:hidden w-[0.5px] md:h-10 lg:h-9 bg-slate-300" />
                  <Image
                    src={App_Store_Badge}
                    alt="App Store Badge"
                    className="object-contain w-auto h-9 md:h-10 lg:h-9"
                  />
                </div>
                <div className="hidden lg:block w-[0.5px] md:h-10 lg:h-9 bg-slate-300" />
                <button
                  onClick={() => (window.location.href = "https://fingoo.app")}
                  className="inline-flex items-center w-auto md:w-full lg:w-auto justify-center gap-2 bg-[#63c8bc] text-white text-base md:text-lg font-bold px-3 py-1 rounded-lg transition"
                >
                  <Image
                    src={Web}
                    alt="Web Icon"
                    className="object-contain w-auto h-4 md:h-5"
                  />
                  웹으로 이용
                </button>
              </div>
            </div>

            {/* 이미지 B (Desktop) - md 이상에서만 노출 */}
            <div className="hidden md:flex justify-center items-center h-full w-full">
              <Image
                src={Desktop}
                alt="Desktop"
                className="max-w-[80%] md:max-w-full h-auto object-contain"
              />
            </div>
    </>
  )
}

export default DesktopLayout