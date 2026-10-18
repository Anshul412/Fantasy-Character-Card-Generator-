// Web Audio API synthesizer for tactile dice rolls and character generation sounds
class SoundManager {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playDiceRoll() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Simulate wooden/bone dice rattle clicks
      const clicks = 5;
      for (let i = 0; i < clicks; i++) {
        const clickTime = now + (i * 0.04) + (Math.random() * 0.02);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320 + Math.random() * 260, clickTime);
        osc.frequency.exponentialRampToValueAtTime(120, clickTime + 0.035);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800 + Math.random() * 400, clickTime);
        filter.Q.setValueAtTime(3, clickTime);

        gain.gain.setValueAtTime(0.001, clickTime);
        gain.gain.linearRampToValueAtTime(0.12, clickTime + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.0001, clickTime + 0.04);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(clickTime);
        osc.stop(clickTime + 0.05);
      }

      // Final settling resonance note
      const chimeTime = now + 0.22;
      const chimeOsc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(587.33, chimeTime); // D5
      chimeOsc.frequency.exponentialRampToValueAtTime(880, chimeTime + 0.15); // A5

      chimeGain.gain.setValueAtTime(0.001, chimeTime);
      chimeGain.gain.linearRampToValueAtTime(0.08, chimeTime + 0.02);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, chimeTime + 0.35);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(this.ctx.destination);
      chimeOsc.start(chimeTime);
      chimeOsc.stop(chimeTime + 0.36);
    } catch {
      // Audio playback fails gracefully if muted or unsupported
    }
  }

  playSuccessChime() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25]; // A major arpeggio
      notes.forEach((freq, idx) => {
        const t = now + idx * 0.06;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t);
        osc.stop(t + 0.26);
      });
    } catch {
      // Silently catch
    }
  }
}

export const soundManager = new SoundManager();
