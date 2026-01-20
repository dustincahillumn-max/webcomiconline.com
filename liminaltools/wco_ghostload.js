/* =========================================
   WCO GHOSTLOAD - ABOUT & TONY COLLAGE POPUPS
   ========================================= */

// Initialize content when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  initAboutWindow();
  initTonyCollage();
});

function initAboutWindow() {
  const aboutDiv = document.getElementById('about-window');
  if (!aboutDiv) return;

  aboutDiv.innerHTML = `
    <div class="win-header">
      <span>ABOUT_ME.EXE</span>
      <button class="win-close" onclick="document.getElementById('about-window').style.display='none'">×</button>
    </div>
    <div class="win-body">
      <div class="about-text">
        <h2>Welcome to WebComicOnline!</h2>
        <p>This is a shrine to the old internet, circa 1999-2003.</p>
        <p>Here you'll find:</p>
        <ul>
          <li>Cursed webcomics</li>
          <li>Interactive dating sims</li>
          <li>Legal dolphins</li>
          <li>Ritual modes</li>
          <li>And much more...</li>
        </ul>
        <div class="crawler-wrap">
          <video autoplay loop muted playsinline>
            <source src="https://f005.backblazeb2.com/file/webcomiconline-gallery/Index/crawler.mp4" type="video/mp4">
          </video>
          <div class="ants-overlay" onclick="checkAntsClick(event)"></div>
        </div>
        <p style="margin-top: 10px;">Webmaster: gricopiipuscles@gmail.com</p>
        <p>Best viewed at 800x600 resolution in Internet Explorer 5.5</p>
        <p style="font-size: 0.8rem; color: #666; margin-top: 20px;">
          ⚠️ Warning: This site contains flashing lights, loud noises,
          and questionable artistic choices.
        </p>
      </div>
      <div class="about-video-crop">
        <video autoplay loop muted playsinline>
          <source src="https://f005.backblazeb2.com/file/webcomiconline-gallery/Index/about_video.mp4" type="video/mp4">
        </video>
      </div>
    </div>
  `;
}

function initTonyCollage() {
  const tonyDiv = document.getElementById('tony-collage');
  if (!tonyDiv) return;

  tonyDiv.innerHTML = `
    <div class="win-header">
      <span>BRAIN_PLAQUE.EXE - [ACCESSING FORBIDDEN MEMORY]</span>
      <button class="win-close" onclick="closeTonyPopup()">×</button>
    </div>
    <div class="collage-body">
      <!-- GIF Frame -->
      <div class="collage-layer c-gif-frame">
        <img src="https://f005.backblazeb2.com/file/webcomiconline-gallery/Index/tony_plaque.gif"
             alt="Brain plaque animation"
             style="width: 100%; height: 100%; object-fit: cover;">
      </div>

      <!-- JPG Plaque -->
      <div class="collage-layer c-jpg-plaque">
        <img src="https://f005.backblazeb2.com/file/webcomiconline-gallery/Index/tony_brain.jpg"
             alt="Brain scan"
             style="width: 100%; height: auto;">
      </div>

      <!-- JPG Shower -->
      <div class="collage-layer c-jpg-shower">
        <img src="https://f005.backblazeb2.com/file/webcomiconline-gallery/Index/tony_shower.jpg"
             alt="Tony shower"
             style="width: 100%; height: auto;">
      </div>

      <!-- Video MOV -->
      <div class="collage-layer c-video-mov">
        <video autoplay loop muted playsinline style="width: 100%; height: auto;">
          <source src="https://f005.backblazeb2.com/file/webcomiconline-gallery/Index/tony_brain.mp4" type="video/mp4">
        </video>
      </div>

      <!-- Overlay GIF -->
      <div class="c-overlay-gif">
        <img src="https://f005.backblazeb2.com/file/webcomiconline-gallery/Index/glitch_overlay.gif"
             alt="Glitch effect"
             style="width: 100%; height: 100%; object-fit: cover;">
      </div>

      <!-- Text Overlay -->
      <div class="c-text-overlay">
        <p style="font-size: 24px; text-shadow: 2px 2px 4px black; margin: 0;">
          "the plaque gets in the blood<br>
          and the blood goes to my brain<br>
          i swear"
        </p>
      </div>
    </div>
  `;
}

// Export for global access
window.initAboutWindow = initAboutWindow;
window.initTonyCollage = initTonyCollage;
