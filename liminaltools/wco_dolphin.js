/* =========================================
   WCO DOLPHIN - LEGAL DOLPHIN HOTLINE
   ========================================= */

const DOLPHIN_DIALOGUE = {
  guilt_start: {
    text: "> DOLPHIN: \"EEEE-EEEE. (Translation: I SENSE YOUR GUILT. TELL ME MORE.)\"<br>> YOU: \"I have downloaded many webcomics without permission...\"<br>> DOLPHIN: \"CLICK-CLICK-SCREEE. (Translation: YOUR HONESTY IS NOTED. PROCEED.)\"",
    choices: [
      { label: "Confess everything", next: "full_confession" },
      { label: "Blame the internet", next: "blame_internet" }
    ]
  },
  innocent_start: {
    text: "> DOLPHIN: \"SCREEE-CLICK. (Translation: INTERESTING. THE INNOCENT ALWAYS HAVE THE LOUDEST VOICES.)\"<br>> YOU: \"I swear I only view comics legally!\"<br>> DOLPHIN: \"EEEE-EEEE-CLICK. (Translation: THE OCEAN REMEMBERS ALL LIES.)\"",
    choices: [
      { label: "Maintain innocence", next: "maintain_innocence" },
      { label: "Actually... I'm guilty", next: "guilt_start" }
    ]
  },
  full_confession: {
    text: "> YOU: \"I've downloaded hundreds of webcomics. I've right-clicked and saved. I've screenshotted. I've... printed them out.\"<br>> DOLPHIN: \"SCREEEEEEEEE! (Translation: THE WORST CRIME OF ALL - PAPER WASTE!)\"<br>> DOLPHIN: \"CLICK-CLICK. (Translation: YOUR PENANCE: SHARE THIS SITE WITH 3 FRIENDS.)\"",
    choices: [
      { label: "I accept my fate", next: "redemption" },
      { label: "Refuse the dolphin's terms", next: "dolphin_angry" }
    ]
  },
  blame_internet: {
    text: "> YOU: \"It's not my fault! The internet made me do it! Web 2.0 corrupted my soul!\"<br>> DOLPHIN: \"EEEE-CLICK-CLICK. (Translation: BLAMING THE MEDIUM IS THE COWARD'S WAY.)\"<br>> DOLPHIN: \"SCREEE. (Translation: YOU ARE SENTENCED TO READ ALL TERMS OF SERVICE YOU'VE EVER SKIPPED.)\"",
    choices: [
      { label: "Accept punishment", next: "punishment_accepted" },
      { label: "Appeal to dolphin mercy", next: "mercy_plea" }
    ]
  },
  maintain_innocence: {
    text: "> YOU: \"I have never violated copyright! I am a beacon of digital virtue!\"<br>> DOLPHIN: \"CLICK-CLICK-CLICK-SCREEE. (Translation: THE RIGHTEOUS ARE BORING. GOODBYE.)\"<br><br>> CONNECTION TERMINATED.",
    choices: [
      { label: "[CLOSE WINDOW]", next: "close" }
    ]
  },
  redemption: {
    text: "> DOLPHIN: \"EEEE-EEEE. (Translation: YOUR HONESTY HAS SAVED YOU. GO FORTH AND MEME RESPONSIBLY.)\"<br>> YOU HAVE BEEN ABSOLVED BY THE LEGAL DOLPHIN.<br>> +1 KARMA POINT",
    choices: [
      { label: "[THANK THE DOLPHIN]", next: "close" }
    ]
  },
  dolphin_angry: {
    text: "> DOLPHIN: \"SCREEEEEEEEEEEEE! (Translation: YOU DARE REFUSE THE OCEAN'S JUDGMENT?!)\"<br>> The dolphin's eyes glow red. Your screen flickers.<br>> DOLPHIN: \"CLICK. (Translation: YOU ARE NOW CURSED WITH SLOW INTERNET SPEEDS.)\"<br><br>> CONNECTION TERMINATED.",
    choices: [
      { label: "[FLEE IN TERROR]", next: "close" }
    ]
  },
  punishment_accepted: {
    text: "> YOU: \"I... I will read the Terms of Service...\"<br>> DOLPHIN: \"EEEE. (Translation: GOOD. START WITH THE ITUNES TOS. ALL 19,000 WORDS.)\"<br>> YOU HAVE RECEIVED PENANCE FROM THE LEGAL DOLPHIN.",
    choices: [
      { label: "[ACCEPT FATE]", next: "close" }
    ]
  },
  mercy_plea: {
    text: "> YOU: \"Please, wise dolphin! Have mercy! I was young and foolish!\"<br>> DOLPHIN: \"CLICK-EEEE-CLICK. (Translation: THE OCEAN IS VAST, BUT NOT AS VAST AS MY MERCY.)\"<br>> DOLPHIN: \"SCREEE. (Translation: YOU MAY GO. BUT REMEMBER: I AM ALWAYS WATCHING YOUR DOWNLOADS.)\"",
    choices: [
      { label: "[BOW RESPECTFULLY]", next: "close" }
    ]
  }
};

let currentDolphinNode = null;

function openDolphin() {
  document.getElementById('dolphin-window').style.display = 'block';
  // Reset to initial state
  const log = document.getElementById('dolphin-log');
  if (log) {
    log.innerHTML = '> CONNECTING TO LEGAL DOLPHIN...<br>> CONNECTION ESTABLISHED.<br>> DOLPHIN: "CLICK-CLICK. SCREEEE. (Translation: I AM LISTENING. DO YOU ADMIT GUILT?)"';
  }
  const controls = document.getElementById('dolphin-controls');
  if (controls) {
    controls.innerHTML = `
      <button class="dolphin-btn" onclick="advanceDolphin('guilt_start')">I AM GUILTY (TUNA)</button>
      <button class="dolphin-btn" onclick="advanceDolphin('innocent_start')">I AM INNOCENT (DOLPHIN)</button>
      <button class="dolphin-btn dolphin-btn-full" onclick="location.href='mailto:gricopiipuscles@gmail.com?subject=DMCA TAKEDOWN REQUEST&body=I AM A LAWYER AND I AM ANGRY'">[ I AM A LAWYER - FILE OFFICIAL COMPLAINT ]</button>
    `;
  }
}

function closeDolphin() {
  document.getElementById('dolphin-window').style.display = 'none';
  currentDolphinNode = null;
}

function advanceDolphin(nodeKey) {
  if (nodeKey === 'close') {
    closeDolphin();
    return;
  }

  const node = DOLPHIN_DIALOGUE[nodeKey];
  if (!node) {
    console.error('Unknown dolphin node:', nodeKey);
    return;
  }

  currentDolphinNode = nodeKey;

  // Update log
  const log = document.getElementById('dolphin-log');
  if (log) {
    log.innerHTML = node.text;
    log.scrollTop = log.scrollHeight;
  }

  // Update controls
  const controls = document.getElementById('dolphin-controls');
  if (controls && node.choices) {
    controls.innerHTML = '';
    node.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = node.choices.length === 1 ? 'dolphin-btn dolphin-btn-full' : 'dolphin-btn';
      btn.textContent = choice.label;
      btn.onclick = () => advanceDolphin(choice.next);
      controls.appendChild(btn);
    });
  }
}

// Export for global access
window.openDolphin = openDolphin;
window.closeDolphin = closeDolphin;
window.advanceDolphin = advanceDolphin;
