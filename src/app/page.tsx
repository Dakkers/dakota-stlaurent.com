import Image from "next/image";
import meImg from './me.jpg'
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
  <>
        <h1 className="text-7xl font-semibold mb-4">Dakota St. Laurent</h1>
        <div className="mb-8 text-2xl">Senior Software Developer | Composer, Producer | Language Activist</div>
        <div className="flex justify-between gap-16">
          <p className="text-lg">
              She:kon / Shekólih! My name is Dakota and this is my website. Click <Link className="underline" href="/about">here</Link>{" "}
              to learn more about me. TL;DR: I&lsquo;m knowledgeable about web development and making music 🤓 I am a language activist 🐢
              and I have a couple of miniature pig rescues. 🐷
            </p>

          <div>
            <Image
              alt=""
              className="rounded-full max-w-none h-[300px] w-[300px]"
              src={meImg}
            />
          </div>
        </div>
    </>
  );
}
