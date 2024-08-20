import React from "react";

type Props = { heading: string; heading1?:string;paragraph1?: string; paragraph: string; icon: React.ReactNode };

export default function Contactitems({ heading1,heading, paragraph, icon,paragraph1 }: Props) {
    return (
        <div>
           <h1 className='font-bold text-[24px] ml-9'>{ heading1}</h1>
           <p className="ml-9">{paragraph1}</p>
            <div className="flex gap-4 items-center">
                <span className="bg-[#c9c1ec] hover:bg-[grey]  rounded-full h-[45px] w-[45px] flex items-center justify-center text-[#621940]">{icon}</span>
                <div className="flex flex-col leading-relaxed mt-2">
                    <h1 className="text-[18px] font-bold text-[#0b032d] ">{heading}</h1>
                    <p className="text-[grey] leading-10">{paragraph}</p>
                </div>
            </div>
        </div>
    );
}