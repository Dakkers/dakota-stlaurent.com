#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = ["yt-dlp", "youtube-transcript-api>=1.2"]
# ///
"""List every video on a YouTube channel.

Usage: yt-channel-videos.py <channel-url-or-@handle> [--shorts] [--streams] [--json] [--transcripts DIR]
"""

import argparse
import json
import random
import sys
import time
from pathlib import Path

from youtube_transcript_api import YouTubeTranscriptApi
from yt_dlp import YoutubeDL


def channel_url(value: str) -> str:
    """Return a channel base URL from a URL or @handle."""
    if value.startswith("@"):
        return f"https://www.youtube.com/{value}"
    return value.rstrip("/").removesuffix("/videos")


def list_tab(url: str) -> list[dict]:
    """Return id, title, and URL for every entry on a channel tab."""
    opts = {"extract_flat": True, "quiet": True, "no_warnings": True}
    with YoutubeDL(opts) as ydl:
        info = ydl.extract_info(url, download=False)
    return [
        {
            "id": e["id"],
            "title": e.get("title"),
            "url": f"https://www.youtube.com/watch?v={e['id']}",
        }
        for e in info.get("entries") or []
        if e.get("id")
    ]


def save_transcripts(videos: list[dict], out_dir: Path, langs: list[str], delay: tuple[float, float]) -> None:
    """Write each video's transcript to <out_dir>/<id>.txt, skipping existing files."""
    out_dir.mkdir(parents=True, exist_ok=True)
    api = YouTubeTranscriptApi()
    for i, v in enumerate(videos, 1):
        path = out_dir / f"{v['id']}.txt"
        prefix = f"[{i}/{len(videos)}] {v['id']}"
        if path.exists():
            print(f"{prefix} exists, skipping", file=sys.stderr)
            continue
        try:
            transcript = api.fetch(v["id"], languages=langs)
        except Exception as e:
            print(f"{prefix} failed: {type(e).__name__}", file=sys.stderr)
        else:
            header = f"{v['title']}\n{v['url']}\n\n"
            path.write_text(header + "\n".join(s.text for s in transcript) + "\n", encoding="utf-8")
            print(f"{prefix} saved", file=sys.stderr)
        if i < len(videos):
            time.sleep(random.uniform(*delay))


def main() -> None:
    parser = argparse.ArgumentParser(description="List all videos on a YouTube channel.")
    parser.add_argument("channel", help="Channel URL or @handle")
    parser.add_argument("--shorts", action="store_true", help="Include Shorts")
    parser.add_argument("--streams", action="store_true", help="Include past live streams")
    parser.add_argument("--json", action="store_true", help="Output JSON")
    parser.add_argument("--ids", action="store_true", help="Output video IDs only")
    parser.add_argument("--transcripts", metavar="DIR", type=Path, help="Save each video's transcript into DIR")
    parser.add_argument("-l", "--lang", nargs="+", default=["en"], help="Preferred transcript languages")
    parser.add_argument(
        "--delay",
        type=float,
        nargs=2,
        metavar=("MIN", "MAX"),
        default=(1.0, 10.0),
        help="Random seconds between transcript requests, drawn uniformly from MIN to MAX",
    )
    args = parser.parse_args()

    base = channel_url(args.channel)
    tabs = ["videos"] + ["shorts"] * args.shorts + ["streams"] * args.streams
    videos = []
    for tab in tabs:
        try:
            videos += list_tab(f"{base}/{tab}")
        except Exception as e:
            print(f"Skipping {tab}: {e}", file=sys.stderr)

    if args.transcripts:
        save_transcripts(videos, args.transcripts, args.lang, args.delay)
        return

    if args.json:
        json.dump(videos, sys.stdout, indent=2, ensure_ascii=False)
        print()
    elif args.ids:
        print("\n".join(v["id"] for v in videos))
    else:
        for v in videos:
            print(f"{v['url']}\t{v['title']}")


if __name__ == "__main__":
    main()
