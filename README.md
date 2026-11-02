# De-Beeping

Removes constant beeps, whistles and coil whine – including their overtones – from audio recordings.

**Use it online: https://zornioz.github.io/de-beeping**
Everything runs locally in your browser. Nothing is uploaded.

Prefer to work offline? Download the Windows app from the
[Releases](https://github.com/Zornioz/de-beeping/releases) page (see [Offline app](#offline-app-windows)).

## How it works

1. The recording is split into time slices and a spectrum is computed for each slice.
2. Narrow peaks that are present in (almost) every slice are treated as beeps – speech and music come and go, a beep doesn't.
3. Overtones (2×, 3×, … of the base frequency) are collected as well.
4. Narrow notch filters are applied to the detected frequencies and the result is verified with a second analysis
   (the report shows how far each tone was reduced).

## Usage

1. Drop a recording onto the page or click *Choose file* (MP4, WAV, MP3, M4A, FLAC, OGG, … – video files don't need to be converted).
2. The analysis starts automatically. Detected tones are listed and marked in the spectrum; untick any you want to keep.
3. Click *Remove beeps* and compare with the *Original* / *Without beeps* buttons.
4. Save as a small MP4 (AAC) or as lossless WAV inside a ZIP.

### Settings

| Setting | Default | Meaning |
| --- | --- | --- |
| Min. frequency (Hz) | 300 | Ignore everything below this frequency (bass, mains hum). |
| Sensitivity (dB) | 6 | How far a tone must stand out from its surroundings. Lower finds more. |
| Min. duration (%) | 85 | In how much of the recording a tone has to be present. Lower this if the beep only appears from time to time. |
| Notch width (×) | 1 | Wider helps with wavering beeps, narrower preserves more of the sound. |

## Offline app (Windows)

Download from [Releases](https://github.com/Zornioz/de-beeping/releases):

- `De-Beeping-<version>-portable.exe` – single file, no installation
- `De-Beeping-<version>-setup.exe` – installer

The app is the same web page packaged with Electron and works without an internet connection.
The EXEs are not code-signed, so Windows SmartScreen may show a warning on first launch
(*More info* → *Run anyway*).

You can also simply download this repository and open `app/index.html` in Chrome or Edge – no server required.

## Development

```
npm install
npm start          # run the desktop app
npm run build:win  # build portable .exe and installer into release/
```

The whole application lives in [app/](app/) (one HTML file plus local fonts and `mp4-muxer`) and has no build step.
GitHub Pages deploys that folder through `.github/workflows/pages.yml`
(repo → Settings → Pages → Source: *GitHub Actions*).

`scripts/build-win.mjs` works around electron-builder's symlink error (winCodeSign) on Windows without admin rights
or Developer Mode by setting the icon with `rcedit` itself.

Browser support: MP4 export needs WebCodecs `AudioEncoder` (current Chrome, Edge, Safari, Firefox).
Where it is unavailable, the WAV/ZIP export always works.

## Third-party

- [Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans) and [JetBrains Mono](https://www.jetbrains.com/lp/mono/) – SIL Open Font License 1.1 (see `app/fonts/`)
- [mp4-muxer](https://github.com/Vanilagy/mp4-muxer) – MIT (see `app/vendor/`)
- [Electron](https://www.electronjs.org/) – MIT
