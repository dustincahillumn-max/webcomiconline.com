/* =========================================
   WCO AUDIO - WINAMP PLAYER & SOUND EFFECTS
   ========================================= */

let currentTrackIndex = 0;
let shuffleOn = false;
let playlist = [];

// Initialize audio system
document.addEventListener('DOMContentLoaded', function() {
  initAudio();
});

function initAudio() {
  playlist = Array.isArray(window.WCO_SONGLIST) && window.WCO_SONGLIST.length > 0
    ? window.WCO_SONGLIST
    : [
        { title: "Default Track", artist: "WebComicOnline", src: "" }
      ];

  const siteAudio = document.getElementById('site-audio');
  if (siteAudio) {
    siteAudio.addEventListener('ended', () => {
      winampNext();
    });
  }

  updateWinampDisplay();
}

function updateWinampDisplay() {
  const track = playlist[currentTrackIndex];
  const trackEl = document.getElementById('winamp-track');
  const statusEl = document.getElementById('winamp-status');
  const errorEl = document.getElementById('winamp-error');

  if (trackEl) {
    trackEl.textContent = track ? `${track.title}.mp3` : 'No Track';
  }

  if (statusEl) {
    statusEl.textContent = 'Ready';
  }

  if (errorEl) {
    errorEl.style.display = 'none';
  }
}

function winampPlay() {
  const siteAudio = document.getElementById('site-audio');
  const track = playlist[currentTrackIndex];

  if (!siteAudio) return;

  if (siteAudio.paused) {
    if (track && track.src) {
      if (siteAudio.src !== track.src) {
        siteAudio.src = track.src;
      }
      siteAudio.play().catch(e => {
        const errorEl = document.getElementById('winamp-error');
        if (errorEl) {
          errorEl.style.display = 'block';
          errorEl.textContent = 'ERROR: PLAYBACK FAILED';
        }
      });

      const statusEl = document.getElementById('winamp-status');
      if (statusEl) statusEl.textContent = 'Playing...';
    }
  } else {
    siteAudio.play();
  }
}

function winampStop() {
  const siteAudio = document.getElementById('site-audio');
  if (siteAudio) {
    siteAudio.pause();
    siteAudio.currentTime = 0;
  }

  const statusEl = document.getElementById('winamp-status');
  if (statusEl) statusEl.textContent = 'Stopped';
}

function winampEject() {
  const siteAudio = document.getElementById('site-audio');
  if (siteAudio) {
    siteAudio.pause();
    siteAudio.removeAttribute('src');
  }

  const trackEl = document.getElementById('winamp-track');
  if (trackEl) trackEl.textContent = '[EJECTED]';

  const statusEl = document.getElementById('winamp-status');
  if (statusEl) statusEl.textContent = 'No disc';
}

function winampShuffle() {
  shuffleOn = !shuffleOn;
  const ledEl = document.getElementById('winamp-shuffle-led');
  if (ledEl) {
    ledEl.className = shuffleOn ? 'shuffle-led on' : 'shuffle-led off';
  }
}

function winampNext() {
  if (shuffleOn) {
    currentTrackIndex = Math.floor(Math.random() * playlist.length);
  } else {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  }

  updateWinampDisplay();

  const siteAudio = document.getElementById('site-audio');
  const wasPlaying = siteAudio && !siteAudio.paused;

  if (wasPlaying) {
    winampPlay();
  }
}

// Sound effects system
function playSfx(soundName) {
  // This can be expanded to play various UI sound effects
  const sfxMap = {
    'click': 'https://f005.backblazeb2.com/file/webcomiconline-gallery/audio/click.mp3',
    'hover': 'https://f005.backblazeb2.com/file/webcomiconline-gallery/audio/hover.mp3',
    'error': 'https://f005.backblazeb2.com/file/webcomiconline-gallery/audio/error.mp3'
  };

  const src = sfxMap[soundName];
  if (src) {
    const sfx = new Audio(src);
    sfx.volume = 0.3;
    sfx.play().catch(e => console.log('SFX blocked by browser'));
  }
}

// Export for global access
window.winampPlay = winampPlay;
window.winampStop = winampStop;
window.winampEject = winampEject;
window.winampShuffle = winampShuffle;
window.winampNext = winampNext;
window.playSfx = playSfx;
