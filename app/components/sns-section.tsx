import React from 'react'

const SnsSection = () => {
  return (
    <div
        id="contact"
        className="flex flex-col items-center justify-center min-h-[100vh] bg-white"
      >
        <div className="flex flex-col items-center justify-center flex-1 pt-44 pb-20 md:py-20 lg:py-0 px-4 w-dvw">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-[1fr_1px_3fr] gap-10 md:gap-5">
            {/* Instagram */}
            <div className="flex flex-col px-0 xs:px-20 md:px-0 items-center">
              <h2 className="relative mb-8 text-lg font-semibold text-[#333] after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-[6px] after:bg-fingoo-main">
                인스타그램
              </h2>
              <div className="aspect-[1/2.1] max-h-[565px] md:aspect-[1/2] w-auto md:min-h-[490px] md:max-h-[535px] xl:min-h-[535px] xl:max-h-[550px] border rounded-md">
                <iframe
                  src="https://www.instagram.com/p/DMhyZqJpaN3/embed"
                  className="w-full h-full rounded-xl border-none"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-[0.5px] h-full bg-slate-300" />
            <div className="block md:hidden w-full h-[0.5px] bg-slate-300" />

            {/* YouTube */}
            <div className="flex flex-col items-center justify-center">
              <h2 className="relative mb-8 text-lg font-semibold text-[#333] after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-[6px] after:bg-fingoo-main">
                유튜브
              </h2>
              <div className="flex-1 w-full flex items-center justify-center">
                <div className="w-full max-w-[100%] aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/S5CCowo6Jzw?si=sPruugOf5azdq9u_"
                    title="YouTube video"
                    className="w-full h-full rounded-xl border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default SnsSection