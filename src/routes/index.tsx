import { Link } from "#/components/Link";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="page-wrap py-12 flex flex-col justify-self-center">
      <section className="grow flex flex-col-reverse lg:flex-row items-center justify-center gap-8">
        <div>
          <h1 className="text-center lg:text-left display-title text-4xl font-bold sm:text-5xl">Dakota St. Laurent</h1>
          <div className="text-center lg:text-left mb-3 text-xl font-bold">
            UX/UI Developer | Producer, Composer, Songwriter
          </div>
          <p className="text-center lg:text-left  max-w-3xl text-lg text-[var(--primary-400)]">
            Howdy! My name's Dakota. Click <Link to="/about">here</Link> to learn more about me.
          </p>
        </div>

        <div className="mx-auto md:mx-0">
          <img
            alt="Me!"
            src="/me.jpg"
            className="rounded-full max-w-none h-[300px] w-[300px]"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>
    </main>
  );
}
