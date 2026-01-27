import Image from "next/image";
import pigsImg from "./pigs.jpg";
import { Link } from "@/components/Link";
import { PageTitle } from "@/components/PageTitle";

export default function About() {
  return (
    <div>
      <PageTitle>About</PageTitle>
      <div className="flex flex-col text-lg gap-4 mt-4">
        <p>
          I&lsquo;m currently the lead UX/UI developer at{" "}
          <Link href="https://www.guardrail.ai/">Guardrail</Link>. I've written
          almost the entire customer-facing web application by myself. My work
          is split between implementing new features, improvements to existing
          features, and crafting a frontend codebase that is suitable to scale.
          It's fun!
        </p>

        <p>
          I spend a good chunk of my time working on home renovations, and much
          of that is animal-related: I have a couple of miniature pigs, all of
          which are rescues. Check out their{" "}
          <Link href="https://www.instagram.com/pigs_of_scotland/">
            dedicated Instagram page
          </Link>
          !
        </p>

        <p>
          The time I have leftover goes towards music-related activities. I'll
          put links to my music here... eventually!
        </p>
      </div>

      <div className="flex justify-center mt-8">
        <figure>
          <Image
            alt="Some of my minuature pigs"
            className="rounded max-w-none h-[200px] w-[250px] md:h-[400px] md:w-[500px]"
            src={pigsImg}
          />
          <figcaption>From left: Poppy, Lulu, Berta</figcaption>
        </figure>
      </div>
    </div>
  );
}
