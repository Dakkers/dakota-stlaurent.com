#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = ["youtube-transcript-api>=1.2"]
# ///
"""Download the transcript for a YouTube video.

Usage: yt-transcript.py <url-or-id> [-l en] [-t] [-o out.txt]
"""

import argparse
import re
import sys

from youtube_transcript_api import YouTubeTranscriptApi


def video_id(value: str) -> str:
    """Return the 11-character video ID from a URL or bare ID."""
    match = re.search(r"(?:v=|youtu\.be/|shorts/|embed/|live/)([\w-]{11})", value)
    if match:
        return match.group(1)
    if re.fullmatch(r"[\w-]{11}", value):
        return value
    sys.exit(f"Could not parse video ID from: {value}")


def fmt_time(seconds: float) -> str:
    """Return seconds formatted as H:MM:SS or M:SS."""
    s = int(seconds)
    h, m, s = s // 3600, s // 60 % 60, s % 60
    return f"{h}:{m:02}:{s:02}" if h else f"{m}:{s:02}"


def main() -> None:
    parser = argparse.ArgumentParser(description="Download a YouTube transcript.")
    parser.add_argument("video", help="YouTube URL or video ID")
    parser.add_argument("-l", "--lang", nargs="+", default=["en"], help="Preferred languages")
    parser.add_argument("-t", "--timestamps", action="store_true", help="Prefix lines with timestamps")
    parser.add_argument("-o", "--output", help="Write to file instead of stdout")
    args = parser.parse_args()

    transcript = YouTubeTranscriptApi().fetch(video_id(args.video), languages=args.lang)
    lines = [
        f"[{fmt_time(s.start)}] {s.text}" if args.timestamps else s.text
        for s in transcript
    ]
    text = "\n".join(lines) + "\n"

    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(text)
    else:
        sys.stdout.write(text)


if __name__ == "__main__":
    main()
