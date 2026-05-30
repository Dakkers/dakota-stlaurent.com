import { ClientOnly, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type ChangeEvent } from "react";
import { z } from "zod";
import { PageTitle } from "../../components/PageTitle";
import { useMidiEvent } from "#/hooks/useMidiEvent";

const orderSchema = z.enum([
  "random",
  "fifths-asc",
  "fifths-desc",
  "whole-asc",
  "whole-desc",
  "chromatic-asc",
  "chromatic-desc",
]);

export const Route = createFileRoute("/tools/keys")({
  validateSearch: z.object({
    order: orderSchema.catch("random"),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { order } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [index, setIndex] = useState(-1);
  const [keysList, setKeysList] = useState<Key[]>([]);

  const hasStarted = index >= 0;

  function handleOrderChange(e: ChangeEvent<HTMLSelectElement>) {
    const parsed = orderSchema.safeParse(e.target.value);
    if (parsed.success) {
      navigate({ search: { order: parsed.data }, replace: true });
    }
  }

  function startPractice() {
    const keysList = createKeysOrdering(order);
    goToStep(0);
    speak(keysList[0]);
    setKeysList(keysList);
  }

  function goToStep(newIndex: number) {
    setIndex(newIndex);
  }

  function goNext() {
    const newIndex = index + 1;
    if (newIndex >= keysList.length) {
      exitPractice();
    } else {
      goToStep(newIndex);
      speak(keysList[newIndex]);
    }
  }

  function exitPractice() {
    setIndex(-1);
  }

  function onMidiMessageNoteOnEvent(note: number) {
    if (note === 21) {
      goNext();
    } else if (note === 108) {
      exitPractice();
    }
  }

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <PageTitle className="mb-3">Musical Keys</PageTitle>

        <div className="flex py-8 justify-center">
          {!hasStarted ? (
            <div>
              <select className="mb-4" value={order} onChange={handleOrderChange}>
                <option value="random">Random</option>
                <option value="fifths-asc">Circle of fifths (ascending)</option>
                <option value="fifths-desc">Circle of fifths (descending)</option>
                <option value="whole-asc">Whole step (ascending)</option>
                <option value="whole-desc">Whole step (descending)</option>
                <option value="chromatic-asc">Chromatic (ascending)</option>
                <option value="chromatic-desc">Chromatic (descending)</option>
              </select>

              <button className="cursor-pointer p-3" onClick={startPractice}>
                Start
              </button>
            </div>
          ) : (
            <div className="grow">
              <div className="text-8xl text-center">{keysList[index]}</div>

              <hr className="my-12" />

              <div className="flex gap-2 justify-between items-center">
                <button onClick={exitPractice}>Exit</button>
                <div>
                  Key {index + 1} of {keysList.length}
                </div>
                <button onClick={goNext}>Next</button>
              </div>
            </div>
          )}
        </div>

        <ClientOnly>
          <MidiDeviceAccessor onMidiMessageNoteOnEvent={onMidiMessageNoteOnEvent} />
        </ClientOnly>

        {/* <TheStuff /> */}
      </section>
    </main>
  );
}

function MidiDeviceAccessor(props: { onMidiMessageNoteOnEvent: (note: number) => void }) {
  useMidiEvent((message: MIDIMessageEvent) => {
    if (!message.data) {
      return;
    }

    const command = message.data[0];
    const note = message.data[1];
    const velocity = message.data.length > 2 ? message.data[2] : 0; // a velocity value might not be included with a noteOff command

    switch (command) {
      case 144: // noteOn
        if (velocity > 0) {
          props.onMidiMessageNoteOnEvent(note);
        }
        break;
      default:
        break;
    }
  });

  return null;
}

function createKeysOrdering(order: z.infer<typeof orderSchema>): Key[] {
  const allKeys = keySchema.options.slice().filter((key) => !hasSharp(key));

  switch (order) {
    case "fifths-asc": {
      const result: Key[] = [];
      let i = 0;
      for (let step = 0; step < allKeys.length; step++) {
        result.push(allKeys[i]);
        i = (i + 7) % allKeys.length;
      }
      return result;
    }
    case "fifths-desc": {
      const result: Key[] = [];
      let i = 0;
      for (let step = 0; step < allKeys.length; step++) {
        result.push(allKeys[i]);
        i = (i + 5) % allKeys.length;
      }
      return result;
    }
    case "chromatic-asc":
      return allKeys;
    case "chromatic-desc":
      return ["C" as const, ...allKeys.slice(1).reverse()];
    case "whole-asc":
      return [...allKeys.filter((_, i) => i % 2 === 0), ...allKeys.filter((_, i) => i % 2 !== 0)];
    case "whole-desc":
      return [
        allKeys[0],
        ...allKeys
          .filter((_, i) => i % 2 === 0)
          .slice(1)
          .reverse(),
        ...allKeys.filter((_, i) => i % 2 !== 0).reverse(),
      ];
    case "random":
      return shuffleArray(allKeys.slice());
  }
}

function shuffleArray<T>(array: T[]) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function speak(key: Key) {
  let contentToSpeak: string = key;

  if (key.includes("♭")) {
    contentToSpeak = contentToSpeak.replace("♭", " flat");
  }
  if (key.includes("♯")) {
    contentToSpeak = contentToSpeak.replace("♯", " sharp");
  }

  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

  if (contentToSpeak.startsWith("A")) {
    if (isChrome) {
      contentToSpeak = contentToSpeak.replace("A", "eh");
    } else {
      contentToSpeak = contentToSpeak.replace("A", "a-");
    }
  }

  if (isChrome) {
    contentToSpeak = contentToSpeak.toLowerCase();
  }

  window.speechSynthesis?.speak?.(new SpeechSynthesisUtterance(contentToSpeak));
}

function hasSharp(str: string) {
  return str.includes("♯");
}

function hasFlat(str: string) {
  return str.includes("♭");
}

const keySchema = z.enum([
  "C",
  "C♯",
  "D♭",
  "D",
  "D♯",
  "E♭",
  "E",
  "F",
  "F♯",
  "G♭",
  "G",
  "G♯",
  "A♭",
  "A",
  "A♯",
  "B♭",
  "B",
]);

type Key = z.infer<typeof keySchema>;

const someMapping: Array<[Key, Key]> = [
  ["F♯", "G♭"],
  ["C♯", "D♭"],
  ["G♯", "A♭"],
  ["D♯", "E♭"],
  ["A♯", "B♭"],
];
