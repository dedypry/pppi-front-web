import { ReactNode } from "react";

import Head from "@/components/Head";

interface Props {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
}
export default function HeaderContent({ children, title, subtitle }: Props) {
  return (
    <>
      <Head description={subtitle} title={title!} />
      <div
        className={`-mt-[60px] flex h-[130px] md:h-[200px] w-full items-end bg-gradient-to-b from-primary-900 to-primary-700 pb-2 md:pb-5 shadow-lg`}
      >
        <div className="container mx-auto px-10">
          {children}
          <div className="container mx-auto flex flex-col md:gap-2">
            <p className="text-[20px] md:text-[30px] font-bold text-white">
              {title}
            </p>
            <p className="italic text-gray-300 text-[12px] md:text-[16px]">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
