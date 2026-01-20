/* =========================================
   DATING SIM - COMPLETE SYSTEM
   ========================================= */

const ASSETS = {
  gary: {
    who: "https://f005.backblazeb2.com/file/webcomiconline-gallery/Index/gary_who.png",
    neutral: "https://f005.backblazeb2.com/file/webcomiconline-gallery/Index/gary_neutral.jpg",
    mad1: "https://f005.backblazeb2.com/file/webcomiconline-gallery/Index/gary_mad1.jpg",
    mad2: "https://f005.backblazeb2.com/file/webcomiconline-gallery/Index/gary_mad2.jpg",
    glitch: "https://f005.backblazeb2.com/file/webcomiconline-gallery/Index/gary_glitch.png"
  },
  harpy: {
    who: "https://f005.backblazeb2.com/file/webcomiconline-gallery/Index/harpy_who.png",
    neutral: "https://f005.backblazeb2.com/file/webcomiconline-gallery/Index/harpy_neutral.png",
    blush: "https://f005.backblazeb2.com/file/webcomiconline-gallery/Index/harpy_blush.png",
    glitch: "https://f005.backblazeb2.com/file/webcomiconline-gallery/Index/harpy_neutral_glitch.png"
  },
  ants: {
    who: "https://f005.backblazeb2.com/file/webcomiconline-gallery/Index/ant_who.png",
    neutral: "https://f005.backblazeb2.com/file/webcomiconline-gallery/Index/ant_circle.gif",
    happy: "https://f005.backblazeb2.com/file/webcomiconline-gallery/Index/ant_semicircle.gif",
    buff: "https://f005.backblazeb2.com/file/webcomiconline-gallery/Index/ant_buff.gif",
    heart: "https://f005.backblazeb2.com/file/webcomiconline-gallery/Index/ants_heart.png"
  }
};

// Global game state
window.GAME_STATE = {
  has_candy: false,
  has_dead_rat: false,
  knows_gary_is_cherry: false
};

// Update inventory UI
function updateInventoryUI() {
  const candy = document.getElementById('inv-candy');
  const rat = document.getElementById('inv-rat');

  if (candy) {
    candy.innerHTML = window.GAME_STATE.has_candy ? '🍬' : '';
    candy.className = 'inventory-item' + (window.GAME_STATE.has_candy ? ' has-item' : '');
  }

  if (rat) {
    rat.innerHTML = window.GAME_STATE.has_dead_rat ? '🐀' : '';
    rat.className = 'inventory-item' + (window.GAME_STATE.has_dead_rat ? ' has-item' : '');
  }
}

// Routes
const ROUTES = {
  gary: {
    start: {
      img: ASSETS.gary.neutral,
      text: "A low-res man appears. He smells like ozone and disappointment.",
      choices: [
        { txt: "Hi Gary.", next: "gary_mad1" },
        { txt: "Steal his lunch.", next: "gary_lunch", req: "!has_candy" },
        { txt: "You look stressed.", next: "gary_sympathetic" }
      ]
    },
    gary_sympathetic: {
      img: ASSETS.gary.neutral,
      text: "'Corporate mandated fun. I hate it.'",
      choices: [
        { txt: "Want some candy?", next: "gary_candy", req: "has_candy" },
        { txt: "I understand.", next: "gary_ending_good" }
      ]
    },
    gary_candy: {
      img: ASSETS.gary.neutral,
      text: "He takes the candy. 'Thanks. You're okay.'",
      onEnter: () => {
        window.GAME_STATE.has_candy = false;
        updateInventoryUI();
        if (window.showAchievement) window.showAchievement("Gary's Friend", "You befriended the grump!");
      },
      choices: [{ txt: "Leave him be.", next: "reset" }]
    },
    gary_lunch: {
      img: ASSETS.gary.mad1,
      text: "You snatch a bag of stale candy! He vibrates with rage.",
      onEnter: () => {
        window.GAME_STATE.has_candy = true;
        updateInventoryUI();
      },
      choices: [{ txt: "Run away.", next: "reset" }]
    },
    gary_mad1: {
      img: ASSETS.gary.mad1,
      text: "His eyes twitch. 'It is pronounced CHERRY. With a G.'",
      onEnter: () => {
        window.GAME_STATE.knows_gary_is_cherry = true;
      },
      choices: [
        { txt: "Sorry, Cherry.", next: "gary_mad2" },
        { txt: "Offer Dead Rat.", next: "gary_rat", req: "has_dead_rat" },
        { txt: "Okay Gary.", next: "gary_mad2" }
      ]
    },
    gary_rat: {
      img: ASSETS.gary.neutral,
      text: "He stares at the dead rat. 'This is... adequate compensation.'",
      onEnter: () => {
        window.GAME_STATE.has_dead_rat = false;
        updateInventoryUI();
        if (window.showAchievement) window.showAchievement("Rat Diplomat", "Solved with a rat!");
      },
      choices: [{ txt: "Leave while he eats.", next: "reset" }]
    },
    gary_mad2: {
      img: ASSETS.gary.mad2,
      text: "The JPEG artifacts intensify. 'I SAID CHERRY. WITH. A. G.'",
      choices: [
        { txt: "Calm down Gary.", next: "gary_glitch" },
        { txt: "Nice tie, Cherry.", next: "gary_glitch" }
      ]
    },
    gary_glitch: {
      img: ASSETS.gary.glitch,
      text: "CRITICAL ERROR. ENTITY 'GARY' HAS STOPPED RESPONDING.",
      onEnter: () => {
        if (window.showAchievement) window.showAchievement("System Error", "You broke Gary!");
      },
      choices: [{ txt: "[REBOOT]", next: "reset" }]
    },
    gary_ending_good: {
      img: ASSETS.gary.neutral,
      text: "He nods respectfully. Good Ending.",
      choices: [{ txt: "Bye.", next: "reset" }]
    }
  },
  harpy: {
    start: {
      img: ASSETS.harpy.neutral,
      text: "SCREEEEEEEEECH! (She adjusts her name tag)",
      choices: [
        { txt: "You have a lovely voice.", next: "harpy_blush" },
        { txt: "Cover ears.", next: "harpy_mad" }
      ]
    },
    harpy_blush: {
      img: ASSETS.harpy.blush,
      text: "She blushes and offers you a dead rat. It is warm.",
      choices: [
        { txt: "Accept gift.", next: "get_rat" },
        { txt: "Politely decline.", next: "reset" }
      ]
    },
    get_rat: {
      img: ASSETS.harpy.neutral,
      text: "You obtained: 1x DEAD RAT. It is heavy with implications.",
      onEnter: () => {
        window.GAME_STATE.has_dead_rat = true;
        updateInventoryUI();
        document.body.classList.add('rat-mode');
        if (window.showAchievement) window.showAchievement("Rat Collector", "Accepted Harpy's gift!");
      },
      choices: [{ txt: "Thanks.", next: "reset" }]
    },
    harpy_mad: {
      img: ASSETS.harpy.glitch,
      text: "SHE DOES NOT LIKE BEING IGNORED.",
      choices: [{ txt: "RUN", next: "reset" }]
    }
  },
  ants: {
    start: {
      img: ASSETS.ants.neutral,
      text: "The Hive mind vibrates. 'DO YOU HAVE SUGAR?'",
      choices: [
        { txt: "Give Candy.", next: "ants_love", req: "has_candy" },
        { txt: "Give Dead Rat.", next: "ants_rat", req: "has_dead_rat" },
        { txt: "No.", next: "ants_buff" }
      ]
    },
    ants_love: {
      img: ASSETS.ants.heart,
      text: "The ants form a heart shape. YOU HAVE FOUND TRUE LOVE. TRUE ENDING.",
      onEnter: () => {
        window.GAME_STATE.has_candy = false;
        updateInventoryUI();
        if (window.showAchievement) window.showAchievement("Hive Beloved", "Sugar Monarch!");
      },
      choices: [{ txt: "I accept my fate.", next: "reset" }]
    },
    ants_rat: {
      img: ASSETS.ants.happy,
      text: "The ants swarm the rat. 'PROTEIN ACCEPTABLE. BUT WE CRAVE SUGAR.'",
      onEnter: () => {
        window.GAME_STATE.has_dead_rat = false;
        updateInventoryUI();
      },
      choices: [{ txt: "Back away.", next: "reset" }]
    },
    ants_buff: {
      img: ASSETS.ants.buff,
      text: "The ants combine into a SWOL SOLDIER. 'THEN YOU ARE THE SUGAR.'",
      onEnter: () => {
        if (window.showAchievement) window.showAchievement("Ant Protein", "Bad Ending");
      },
      choices: [{ txt: "Oh no.", next: "reset" }]
    }
  }
};

let currentRoute = null;
let selectedCharacter = null;

window.initDatingSim = function() {
  try {
    if (document.body.classList.contains('silent-fs-open') && window.silentCloseFullscreen) {
      window.silentCloseFullscreen();
    }
  } catch (e) {}

  const carousel = document.getElementById('silent-carousel');
  const dating = document.getElementById('dating-container');
  if (carousel) carousel.style.display = 'none';
  if (dating) dating.style.display = 'flex';

  const invUI = document.getElementById('inventory-ui');
  if (invUI) invUI.style.display = 'flex';

  updateInventoryUI();
  showSelectionScreen();

  if (window.showAchievement) {
    window.showAchievement('Dating Sim Started', 'Welcome to LOVE_CONNEXION.EXE');
  }
};

window.closeDatingSim = function() {
  const carousel = document.getElementById('silent-carousel');
  const dating = document.getElementById('dating-container');
  if (dating) dating.style.display = 'none';
  if (carousel) carousel.style.display = 'flex';

  const invUI = document.getElementById('inventory-ui');
  if (invUI) invUI.style.display = 'none';
};

function showSelectionScreen() {
  const selScreen = document.getElementById('selection-screen');
  const dateScreen = document.getElementById('date-screen');
  if (selScreen) selScreen.style.display = 'flex';
  if (dateScreen) dateScreen.style.display = 'none';
  selectedCharacter = null;
  hideTooltip();
}

function showTooltip(imgSrc) {
  const tooltip = document.getElementById('global-tooltip');
  const toolImg = document.getElementById('tooltip-img');
  if (tooltip && toolImg) {
    toolImg.src = imgSrc;
    tooltip.style.display = 'block';
  }
}

function hideTooltip() {
  const tooltip = document.getElementById('global-tooltip');
  if (tooltip) tooltip.style.display = 'none';
}

window.handleCardClick = function(charKey) {
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  if (isTouch) {
    if (selectedCharacter === charKey) {
      startRoute(charKey);
    } else {
      selectedCharacter = charKey;
      showTooltip(ASSETS[charKey].who);
    }
  } else {
    startRoute(charKey);
  }
};

window.handleCardHover = function(charKey) {
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  if (!isTouch) {
    showTooltip(ASSETS[charKey].who);
  }
};

window.hideTooltip = hideTooltip;

function startRoute(charKey) {
  hideTooltip();
  currentRoute = ROUTES[charKey];
  const selScreen = document.getElementById('selection-screen');
  const dateScreen = document.getElementById('date-screen');
  if (selScreen) selScreen.style.display = 'none';
  if (dateScreen) dateScreen.style.display = 'flex';
  renderNode(currentRoute.start);
}

function renderNode(node) {
  if (!node) return showSelectionScreen();
  if (node.onEnter) node.onEnter();

  const port = document.getElementById('active-portrait');
  const dialogue = document.getElementById('dialogue-text');
  const cContainer = document.getElementById('choice-container');

  if (port) port.src = node.img;
  if (dialogue) dialogue.innerText = node.text;
  if (cContainer) cContainer.innerHTML = '';

  let validChoices = 0;
  node.choices.forEach(c => {
    if (c.req) {
      const isNot = c.req.startsWith('!');
      const key = isNot ? c.req.substring(1) : c.req;
      const val = window.GAME_STATE[key];
      if ((isNot && val) || (!isNot && !val)) return;
    }
    validChoices++;
    const btn = document.createElement('div');
    btn.className = 'choice-btn';
    btn.innerText = `> ${c.txt}`;
    if (c.next === 'reset') {
      btn.onclick = () => showSelectionScreen();
    } else {
      btn.onclick = () => renderNode(currentRoute[c.next]);
    }
    if (cContainer) cContainer.appendChild(btn);
  });

  if (validChoices === 0 && cContainer) {
    const btn = document.createElement('div');
    btn.className = 'choice-btn';
    btn.innerText = "> [Leave awkwardly]";
    btn.onclick = () => showSelectionScreen();
    cContainer.appendChild(btn);
  }
}

// Export for global access
window.updateInventoryUI = updateInventoryUI;
