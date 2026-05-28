import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { PageTitle } from "../../components/PageTitle";

export const Route = createFileRoute("/tools/keys")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <PageTitle className="mb-3">Musical Keys</PageTitle>

        <TheStuff />
      </section>
    </main>
  );
}

function TheStuff() {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  const [letterText, setLetterText] = React.useState("---");
  const [keysRemaining, setKeysRemaining] = React.useState(shuffleArray(ALL_KEYS.slice()));
  const [keysPlayed, setKeysPlayed] = React.useState<KEY[]>([]);
  const [hasMidiAccess, setHasMidiAccess] = React.useState(false);
  const [midiAccessObj, setMidiAccessObj] = React.useState<MIDIAccess | null>(null);

  const goNext = React.useCallback(() => {
    const numRemainingKeys = keysRemaining.length;
    if (numRemainingKeys === 0) {
      setLetterText("---");
    } else {
      const key = keysRemaining[0];
      setKeysPlayed([...keysPlayed, key]);
      setKeysRemaining(keysRemaining.slice(1));
      speak(key);
      setLetterText(key);
    }
  }, [keysPlayed, keysRemaining]);

  const restart = React.useCallback(() => {
    setLetterText("---");
    setKeysRemaining(shuffleArray(ALL_KEYS.slice()));
    setKeysPlayed([]);
  }, []);

  const noteOn = React.useCallback(
    (note: number) => {
      if (note === 21) {
        goNext();
      } else if (note === 108) {
        restart();
      }
    },
    [goNext, restart],
  );

  const getMidiMessage = React.useCallback(
    (message: MIDIMessageEvent) => {
      if (!message.data) {
        return;
      }

      const command = message.data[0];
      const note = message.data[1];
      const velocity = message.data.length > 2 ? message.data[2] : 0; // a velocity value might not be included with a noteOff command

      switch (command) {
        case 144: // noteOn
          if (velocity > 0) {
            noteOn(note);
          }
          break;
        default:
          break;
      }
    },
    [noteOn],
  );

  const hasStarted = keysPlayed.length > 0;

  React.useEffect(() => {
    if (hasMidiAccess && !!midiAccessObj) {
      for (const input of midiAccessObj.inputs.values()) {
        input.onmidimessage = getMidiMessage;
      }
      return;
    }

    try {
      navigator
        .requestMIDIAccess()
        .then((midiAccess) => {
          setHasMidiAccess(true);
          setMidiAccessObj(midiAccess);
          console.log("got midi access");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.error(err);
    }
  }, [getMidiMessage, hasMidiAccess, midiAccessObj]);

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <div className="flex gap-4  ">
        <button className="cursor-pointer bg-slate-300 p-3" onClick={goNext}>
          {!hasStarted ? "Start" : "Next"}
        </button>
        {hasStarted && (
          <button className="cursor-pointer bg-slate-300 p-3" onClick={restart}>
            Restart
          </button>
        )}
      </div>

      <p className="text-5xl">{letterText}</p>

      <p>Remaining:</p>
      <ul className="list-disc">
        {keysRemaining.map((key) => (
          <li className="ml-8" key={key}>
            {key}
          </li>
        ))}
      </ul>

      {hasStarted && (
        <>
          <p>Played:</p>
          <ul className="list-disc">
            {keysPlayed.map((key) => (
              <li className="ml-8" key={key}>
                {key}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

function shuffleArray<T>(array: T[]) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function speak(key: KEY) {
  let contentToSpeak: string = key;
  if (key.includes("#")) {
    const [, keyFlat] = key.split("/");
    contentToSpeak = keyFlat.replace("b", " flat");
  }
  //   if (contentToSpeak.startsWith("A")) {
  //     contentToSpeak = contentToSpeak.replace("A", "Eh");
  //   }

  if (!!window.speechSynthesis && !!window.speechSynthesis.speak) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(contentToSpeak));
  }
}

const ALL_KEYS = [
  "C",
  "G",
  "D",
  "A",
  "E",
  "B",
  "F#/Gb",
  "C#/Db",
  "G#/Ab",
  "D#/Eb",
  "A#/Bb",
  "F",
] as const;

type KEY = (typeof ALL_KEYS)[number];
