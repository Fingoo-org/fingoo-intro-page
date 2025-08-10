import {
  BuildingOffice2Icon,
  ChatBubbleOvalLeftEllipsisIcon,
  EnvelopeIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

import Ceo from "@/public/images/ceo.png";
import Cmo from "@/public/images/cmo.png";
import Cto from "@/public/images/cto.png";
import Image from "next/image";
import Logo from "@/public/images/logo.png";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] bg-[#f7f7f7]">
        <div className="flex flex-col items-center flex-1 px-4 w-dvw">
          <div className="flex flex-col md:flex-row md:flex-1 items-center gap-10 py-20 lg:py-0 px-8 w-full max-w-[1200px]">
            <div className="flex-1 min-w-0">
              <Image
                src={Cto}
                alt="Info"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
            <div className="flex-1 min-w-0">
              <Image
                src={Ceo}
                alt="Info"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
            <div className="flex-1 min-w-0">
              <Image
                src={Cmo}
                alt="Info"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          <div className="md:px-4 px-0 pb-10 w-full max-w-[1200px]">
            <div className="bg-white w-full h-full rounded-lg gap-3 md:gap-0 flex flex-col md:flex-row py-5 px-4 sm:px-6 md:px-7 items-center justify-between">
              {/* 로고 및 회사 정보 */}
              <div className="flex flex-col items-center md:items-start gap-2">
                <Image src={Logo} alt="Logo" className="w-auto h-8 md:h-6" />
                <div className="flex items-center gap-1 text-xs text-[#333]">
                  <span>상호 : 핀구</span>
                  <div className="w-[0.5px] h-5 bg-slate-300"></div>
                  <span>대표 : 김도경</span>
                </div>
              </div>

              {/* 사업자 정보 */}
              <div className="flex flex-col md:flex-row text-[#333] items-center text-xs gap-2 md:gap-4 lg:gap-6">
                <div className="flex flex-col gap-2 items-center md:items-start md:gap-4">
                  <div className="flex items-center gap-1">
                    <BuildingOffice2Icon className="text-teal-500 w-4 h-4" />
                    <span>사업자등록번호 : 218-44-01152</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChatBubbleOvalLeftEllipsisIcon className="text-yellow-500 w-4 h-4" />
                    <span>고객센터 : </span>
                    <a
                      href="https://pf.kakao.com/_XQSKn"
                      className="text-inherit no-underline hover:cursor-pointer"
                    >
                      https://pf.kakao.com/_XQSKn
                    </a>
                  </div>
                </div>

                <div className="hidden md:block w-[0.5px] h-12 bg-slate-300"></div>

                <div className="flex flex-col gap-2 items-center md:items-start md:gap-4">
                  <div className="flex items-center gap-1">
                    <EnvelopeIcon className="text-teal-500 w-4 h-4" />
                    <span>통신판매업 신고번호 : 2025-화성동부-0898</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="text-teal-500 w-4 h-4" />
                    <span className='flex gap-1'>
                      주소 : 경기도 화성시 효행로 1068, 6층 603-D64호
                      <span className="hidden lg:block">(병점동, 리더스프라자)</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Footer