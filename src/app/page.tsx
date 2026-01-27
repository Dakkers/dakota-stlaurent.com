import Image from "next/image";
import meImg from "./me.jpg";
import React from "react";
import { Link } from "@/components/Link";
import { PageTitle } from "@/components/PageTitle";

export default function Home() {
  return (
    <div className="flex xs:flex-col flex-row items-center justify-center gap-4">
      <div>
        <PageTitle>Dakota St. Laurent</PageTitle>

        <div className="flex flex-col mb-8 text-lg md:text-xl mt-4 sm:flex-row sm:gap-1 sm:justify-center md:justify-start">
          <span>Senior Software Developer</span>
          <span className="hidden sm:block">|</span>
          <span>Composer, Producer</span>
        </div>

        <div className="flex justify-between gap-8 md:gap-16 flex-col-reverse sm:flex-row">
          <p className="text-lg">
            Howdy! My name is Dakota and this is my website. Click{" "}
            <Link href="/about">here</Link> to learn more about me. TL;DR:
            I&lsquo;m knowledgeable about web development and making music 🤓
            and I have a couple of miniature pig rescues. 🐷
          </p>
        </div>
      </div>

      <div className="mx-auto md:mx-0">
        <Image
          alt=""
          className="rounded-full max-w-none h-[175px] w-[175px] md:h-[300px] md:w-[300px]"
          src={meImg}
        />
      </div>
    </div>
  );
}
