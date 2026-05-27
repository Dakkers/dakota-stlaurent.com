import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="page-wrap py-12 flex flex-col ">
      <section className="grow flex xs:flex-col flex-row items-center justify-center gap-8">
        <div>
          <h1 className="display-title text-4xl font-bold sm:text-5xl">Dakota St. Laurent</h1>
          <div className="mb-3 text-xl font-bold">
            UX/UI Developer | Producer, Composer, Songwriter
          </div>
          <p className="m-0 max-w-3xl text-lg leading-8 text-[var(--sea-ink-soft)]">
            Howdy! My name is Dakota and this is my website. Click <Link to="/about">here</Link> to
            learn more about me.
          </p>
        </div>

        <div className="mx-auto md:mx-0">
          <img
            alt="Me!"
            src="/me.jpg"
            className="rounded-full max-w-none h-[175px] w-[175px] md:h-[300px] md:w-[300px]"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>
    </main>
  );
}
