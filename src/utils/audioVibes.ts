/**
 * BitePulse Vibes - Campus Ambient Study & Canteen Audio Engine
 * Uses the Web Audio API to synthesize relaxing lo-fi ambient cafe chords.
 * Fully offline, 0 external network requests, royalty-free.
 */

class AudioVibesEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private currentTrackIndex = 0;
  private volume = 0.4;
  private listeners: Set<(playing: boolean, trackName: string) => void> = new Set();

  public tracks = [
    { id: '1', title: 'Campus Noon Breeze', bpm: 72, mood: 'Relaxed & Sunny' },
    { id: '2', title: 'Central Canteen Chill', bpm: 80, mood: 'Warm Lo-Fi Chords' },
    { id: '3', title: 'Late Night Mess Study', bpm: 66, mood: 'Deep Ambient Keys' },
  ];

  public subscribe(cb: (playing: boolean, trackName: string) => void) {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    const track = this.tracks[this.currentTrackIndex]?.title || 'Campus Noon Breeze';
    this.listeners.forEach((cb) => cb(this.isPlaying, track));
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    this.initContext();
    if (!this.ctx) return;
    this.isPlaying = true;
    this.notify();

    // Pentatonic chord progressions (Warm Rhodes / Vibraphone style)
    const chordProgressions = [
      // Fmaj7 - Am7 - Dm7 - Bbmaj7 frequencies
      [
        [174.61, 220.0, 261.63, 329.63],
        [220.0, 261.63, 329.63, 392.0],
        [146.83, 174.61, 220.0, 261.63],
        [233.08, 293.66, 349.23, 440.0],
      ],
      // Dmaj9 - Bm7 - Gmaj7 - A7
      [
        [146.83, 220.0, 277.18, 329.63],
        [123.47, 185.0, 220.0, 277.18],
        [196.0, 246.94, 293.66, 369.99],
        [220.0, 277.18, 329.63, 392.0],
      ],
      // Cmaj7 - Em7 - Fmaj7 - G7
      [
        [130.81, 196.0, 246.94, 329.63],
        [164.81, 246.94, 293.66, 392.0],
        [174.61, 261.63, 329.63, 440.0],
        [196.0, 246.94, 293.66, 349.23],
      ],
    ];

    let chordStep = 0;
    const activeChords = chordProgressions[this.currentTrackIndex % chordProgressions.length];

    const playChord = () => {
      if (!this.isPlaying || !this.ctx) return;
      const notes = activeChords[chordStep % activeChords.length];
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        // Warm sine + lowpass filter for gentle lo-fi sound
        osc.type = idx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.04 * this.volume, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + 2.4);
      });

      chordStep++;
    };

    playChord();
    this.timer = window.setInterval(playChord, 2200);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.notify();
  }

  public nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    if (this.isPlaying) {
      this.stop();
      this.play();
    } else {
      this.notify();
    }
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      track: this.tracks[this.currentTrackIndex],
    };
  }
}

export const audioVibes = new AudioVibesEngine();
