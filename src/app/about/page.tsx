import Image from "next/image";
import pigsImg from './pigs.jpg'
import Link from "next/link";

export default function About() {
  return (
    <>
      <h1 className="text-7xl font-semibold mb-4">About</h1>
      <div className="flex flex-col text-lg gap-4">
        <p>
          I&lsquo;m currently a senior software developer on <a className="underline" href="https://www.applyboard.com/">ApplyBoard</a>&lsquo;s UI Engineering team.
          My team&lsquo;s primary role is maintaining ApplyBoard&lsquo;s design system, <b>Crystal</b>, enabling other developers to create accessible, responsive, and intuitive product features
          at a rapid pace.
        </p>

        <p>
          I am also currently enrolled in the <a className="underline" href="https://www.fanshawec.ca/programs/oni1-oneida-language-immersion-culture-and-teaching/next#">Oneida language program</a> at Fanshawe College.
          Oneida is a critically endangered language and I am working to help revitalize through the creation of <a className="underline" href="https://learn-oneida.com/">learn-oneida.com</a>, which is how I spend
          a good chunk of my time. I hope to eventually expand it to include the other Haudenosaunee languages (Mohawk, Cayuga, Tuscarora, Seneca, and Onondaga). I myself am mixed Kanien&lsquo;kehá:ka (turtle clan) and
          settler so this project is near and dear to my heart. I personally feel that it is my responsibility to use the skills I&lsquo;ve learned in the software industry to help these endangered languages
          continue on.
        </p>

        <p>
          My free time outside of my full-time job, my college program, and my commitment to revitalizing indigenous languages
          is quite limited. However, I spend what time I can on my music: I make music under a couple different monikers
          in a variety of styles. (I&lsquo;ll put links here at some point!) I have an interest in game development but am
          not currently working on any projects, excluding making music for other people&lsquo;s games. At this point I do not
          work on any programming projects aside from this website and learn-oneida.com. I am definitely no longer one of
          those devs that spends all my free time coding!
        </p>

        <p>
          The last thing I&lsquo;ll put here is that I have a couple of miniature pigs, all of which are rescues.
          Check out their <a className="underline" href="https://www.instagram.com/pigs_of_scotland/">dedicated Instagram page</a>!
        </p>
      </div>

      <div className="flex justify-center mt-8">
        <figure>
          <Image
            alt="Some of my minuature pigs"
            className="rounded max-w-none h-[400px] w-[500px]"
            src={pigsImg}
          />
          <figcaption>From left: Poppy, Lulu, Berta</figcaption>
        </figure>
      </div>
    </>
  );
}
