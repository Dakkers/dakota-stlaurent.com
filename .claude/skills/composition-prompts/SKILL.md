---
name: composition-prompts
description: Turn a YouTube transcript about music theory, composition, or music analysis into a set of small, practical composition exercises based on what the video teaches. Use this whenever the user points at a transcript file (e.g. something in transcripts/) and wants practice ideas, exercises, drills, homework, prompts, or "things to write" from it, or asks how to apply or practice what a music video covered, even if they don't say "prompts".
---

# Composition prompts from a video transcript

The user watches music theory, composition, and analysis videos and wants to actually *use* what they learned. Your job is to read a transcript and write short composition exercises that make them practice the specific ideas from that video. It's like a good teacher writing homework right after a lesson.

## Input

A transcript `.txt` file, usually at `transcripts/<channel>/<video-id>.txt`. The first line is the video title and the second is its URL. The rest is auto-generated caption text: no punctuation, misheard words, and no speaker labels. Music terms often come out wrong, e.g. "Dorian" as "during", "tritone" as "try tone", "ii–V–I" as "two five one", and chord symbols spelled out as words. Read through the errors and work out what the speaker meant. If you can't tell what a term was, leave it out rather than guessing.

## Process

1. **Read the whole transcript.** Videos often save the key idea for the end, or build up to it.
2. **Pull out the teachable ideas.** List the concrete techniques, concepts, and analysed examples the video covers. Look for specifics: "borrowing iv from parallel minor to set up the cadence", not just "harmony". Note any piece or artist the video analyses. You can refer to them, but write every exercise so it works without access to that recording.
3. **Pick the ideas worth practising.** Favour the video's central ideas over things it only mentions in passing. Aim for about 6–10 prompts in total. A focused video might get fewer, a dense one more.
4. **Write the prompts** (format below). Order them from warm-up to bigger pieces, so each exercise builds on the ones before it.
5. **Save** the file next to the transcript, as `<video-id>.prompts.md`. Then tell the user the path and list the prompt titles.

## What makes a good prompt

- **Anchored in the video.** Each prompt should practise something the video actually taught, and say which idea it comes from. If a prompt could have been written without watching the video, it's too generic. The point is to reinforce *this* lesson.
- **Constrained.** Give specific limits: key or mode, meter, length in bars, a given progression or motif, which voices or textures to use. Constraints make a small exercise finishable and keep the focus on one skill.
- **Instrument-agnostic.** The user may write at a keyboard, on guitar, in a DAW, or in notation. Say what to write, not what tool to use. Only name an instrument when the idea itself depends on it (e.g. a video about string voicings), and even then offer an alternative.
- **Sized honestly.** Mix sizes and label each one: **Warm-up** (~5–15 min, a few bars), **Study** (~20–40 min, a short passage), and **Sketch** (~45–90 min, a small complete piece or section). Most prompts should be warm-ups and studies, with one or two sketches.
- **Checkable.** End each prompt with a one-line "Listen for" or "Check" that lets the user tell whether they pulled it off, e.g. "Does the borrowed chord sound darker without losing the sense of arrival?"
- **Varied.** Mix the angles: harmonise a given melody, write a melody over a given progression, rewrite a familiar pattern using the technique, imitate the analysed example's move in a different context, or combine two ideas from the video.

## Output format

Use this structure:

```markdown
# Composition prompts: <video title>

Source: <video URL>

## Key ideas from the video
- <idea 1: one line, specific>
- <idea 2>
- ...

## Prompts

### 1. <Short title> — Warm-up (~10 min)
**Practises:** <which key idea>

<The exercise, 2–5 sentences, with concrete constraints.>

**Listen for:** <one-line self-check>

### 2. ...

## Stretch (optional)
<One open-ended idea combining several concepts, for when the user wants to go further.>
```

If the transcript isn't really about music theory, composition, or analysis (e.g. a gear review or a vlog), say so and ask the user whether they still want prompts, rather than forcing them.
