#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# ///
"""Download transcripts for every channel listed in a file.

Usage: yt-channels-transcripts.py [-f channels.txt] [-o transcripts] [-- extra yt-channel-videos.py args]
"""

import argparse
import re
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent


def read_channels(path: Path) -> list[str]:
    """Return channels from a file, ignoring blank lines and # comments."""
    lines = (line.split("#", 1)[0].strip() for line in path.read_text().splitlines())
    return [line for line in lines if line]


def folder_name(channel: str) -> str:
    """Return a filesystem-safe folder name for a channel."""
    name = channel.rstrip("/").split("/")[-1].lstrip("@")
    return re.sub(r"[^\w.-]", "_", name) or "channel"


def main() -> None:
    parser = argparse.ArgumentParser(description="Download transcripts for every channel in a file.")
    parser.add_argument("-f", "--file", type=Path, default=HERE / "channels.txt", help="Channels file")
    parser.add_argument("-o", "--output", type=Path, default=Path("transcripts"), help="Output root directory")
    parser.add_argument("extra", nargs=argparse.REMAINDER, help="Args passed to yt-channel-videos.py after --")
    args = parser.parse_args()

    extra = args.extra[1:] if args.extra[:1] == ["--"] else args.extra
    channels = read_channels(args.file)
    if not channels:
        sys.exit(f"No channels found in {args.file}")

    failed = []
    for i, channel in enumerate(channels, 1):
        out_dir = args.output / folder_name(channel)
        print(f"=== [{i}/{len(channels)}] {channel} -> {out_dir}", file=sys.stderr)
        cmd = [str(HERE / "yt-channel-videos.py"), channel, "--transcripts", str(out_dir), *extra]
        if subprocess.run(cmd).returncode != 0:
            failed.append(channel)

    if failed:
        sys.exit(f"Failed channels: {', '.join(failed)}")


if __name__ == "__main__":
    main()
