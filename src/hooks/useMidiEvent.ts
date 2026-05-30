import { useRef } from "react";

type MIDIEventCallback = (event: MIDIMessageEvent) => void;

export function useMidiEvent(onMidiEvent: MIDIEventCallback) {
  const callbackRef = useRef<MIDIEventCallback>(onMidiEvent);
  callbackRef.current = onMidiEvent;

  const midiRef = useRef<MIDIAccess | null>(null);

  if (midiRef.current === null) {
    navigator.requestMIDIAccess().then((access) => {
      midiRef.current = access;

      const handleMessage = (event: MIDIMessageEvent) => {
        callbackRef.current(event);
      };

      access.inputs.forEach((input) => {
        input.addEventListener("midimessage", handleMessage);
      });

      access.onstatechange = (event: MIDIConnectionEvent) => {
        const { port } = event;
        if (port instanceof MIDIInput && port.state === "connected") {
          port.addEventListener("midimessage", handleMessage);
        }
      };
    });
  }
}
