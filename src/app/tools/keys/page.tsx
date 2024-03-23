"use client";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import React from "react";

type KEY =
  | "C"
  | "C#/Db"
  | "D"
  | "D#/Eb"
  | "E"
  | "F"
  | "F#/Gb"
  | "G"
  | "G#/Ab"
  | "A"
  | "A#/Bb"
  | "B";

const ALL_KEYS: KEY[] = [
  "C",
  "C#/Db",
  "D",
  "D#/Eb",
  "E",
  "F",
  "F#/Gb",
  "G",
  "G#/Ab",
  "A",
  "A#/Bb",
  "B",
];

export default function ToolsKeys() {
  return (
    <div className="flex flex-col gap-4">
      <PageTitle>Keys at Random</PageTitle>
      <p>
        Welcome to this dinky tool! It goes through all 12 keys at random; I use
        it to practice scales, chord types, etc. without developing muscle
        memory of moving around the circle of 5ths or some other pattern.
      </p>

      <p>
        If your MIDI keyboard is plugged in when accessing this page, the lowest
        A on the keyboard will go to the next key and the highest C will
        restart. Also, if you use Chrome or Firefox, the computer will speak to
        you so you don&lsquo;t have to look at the computer screen to see what
        key it is. :)
      </p>

      <TheStuff />
    </div>
  );
}

function TheStuff() {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  const [letterText, setLetterText] = React.useState("---");
  const [keysRemaining, setKeysRemaining] = React.useState(
    shuffleArray(ALL_KEYS.slice()),
  );
  const [keysPlayed, setKeysPlayed] = React.useState<KEY[]>([]);
  const [hasMidiAccess, setHasMidiAccess] = React.useState(false);
  const [midiAccessObj, setMidiAccessObj] =
    React.useState<WebMidi.MIDIAccess | null>(null);

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
    (message: WebMidi.MIDIMessageEvent) => {
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
        <Button onClick={goNext}>{!hasStarted ? "Start" : "Next"}</Button>
        {hasStarted && <Button onClick={restart}>Restart</Button>}
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
  if (contentToSpeak.startsWith("A")) {
    contentToSpeak = contentToSpeak.replace("A", "Eh");
  }

  if (!!window.speechSynthesis && !!window.speechSynthesis.speak) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(contentToSpeak));
  }
}
