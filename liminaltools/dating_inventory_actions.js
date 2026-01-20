/* =========================================
   DATING SIM - INVENTORY CURSOR ACTIONS
   ========================================= */

let selectedInventoryItem = null;

document.addEventListener('DOMContentLoaded', function() {
  initInventoryCursor();
});

function initInventoryCursor() {
  const candyEl = document.getElementById('inv-candy');
  const ratEl = document.getElementById('inv-rat');

  if (candyEl) {
    candyEl.addEventListener('click', function() {
      if (window.GAME_STATE && window.GAME_STATE.has_candy) {
        toggleCursorItem('candy', '🍬');
      }
    });
  }

  if (ratEl) {
    ratEl.addEventListener('click', function() {
      if (window.GAME_STATE && window.GAME_STATE.has_dead_rat) {
        toggleCursorItem('rat', '🐀');
      }
    });
  }
}

function toggleCursorItem(itemType, emoji) {
  if (selectedInventoryItem === itemType) {
    // Deselect
    selectedInventoryItem = null;
    removeCursorAttachment();
    updateInventorySelection(null);
  } else {
    // Select
    selectedInventoryItem = itemType;
    attachCursorItem(emoji);
    updateInventorySelection(itemType);
  }
}

function attachCursorItem(emoji) {
  // Remove any existing cursor attachment
  removeCursorAttachment();

  // Create floating cursor attachment
  const attachment = document.createElement('div');
  attachment.id = 'cursor-attachment';
  attachment.style.cssText = `
    position: fixed;
    font-size: 32px;
    pointer-events: none;
    z-index: 100000;
    transform: translate(-50%, -50%);
    filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.8));
  `;
  attachment.textContent = emoji;
  document.body.appendChild(attachment);

  // Track cursor movement
  document.addEventListener('mousemove', updateCursorAttachment);
}

function updateCursorAttachment(e) {
  const attachment = document.getElementById('cursor-attachment');
  if (attachment) {
    attachment.style.left = e.clientX + 'px';
    attachment.style.top = e.clientY + 'px';
  }
}

function removeCursorAttachment() {
  const attachment = document.getElementById('cursor-attachment');
  if (attachment) {
    attachment.remove();
  }
  document.removeEventListener('mousemove', updateCursorAttachment);
}

function updateInventorySelection(selectedType) {
  const candyEl = document.getElementById('inv-candy');
  const ratEl = document.getElementById('inv-rat');

  if (candyEl) {
    if (selectedType === 'candy') {
      candyEl.classList.add('selected');
      candyEl.style.border = '2px solid yellow';
      candyEl.style.boxShadow = '0 0 10px yellow';
    } else {
      candyEl.classList.remove('selected');
      candyEl.style.border = '';
      candyEl.style.boxShadow = '';
    }
  }

  if (ratEl) {
    if (selectedType === 'rat') {
      ratEl.classList.add('selected');
      ratEl.style.border = '2px solid yellow';
      ratEl.style.boxShadow = '0 0 10px yellow';
    } else {
      ratEl.classList.remove('selected');
      ratEl.style.border = '';
      ratEl.style.boxShadow = '';
    }
  }
}

// Export for global access
window.selectedInventoryItem = selectedInventoryItem;
window.attachCursorItem = attachCursorItem;
window.removeCursorAttachment = removeCursorAttachment;
