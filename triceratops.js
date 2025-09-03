// 既に定義済みの handleCreatureProgress をグローバルに公開
window.handleCreatureProgress = handleCreatureProgress;

// Patched triceratops.js — preserves original function names and integrates gecko + probability fixes
// Globals (attach to window to avoid duplicate declarations)
window.currentCreature = window.currentCreature || null;
window.currentColor = window.currentColor || null;

const colors = ["red", "blue", "green", "yellow", "pink"];

/* showMessageModal: accepts either (textOrArray) or (textOrArray, nextCallback)
   - If nextCallback is provided, clicking the modal runs nextCallback once.
   - If textOrArray is an array and no nextCallback, clicking will step through the array. */
function showMessageModal(textOrArray, nextCallback) {
  const modal = document.getElementById("messageModal");
  const modalText = document.getElementById("modalText");
  if (!modal || !modalText) return;

  const messages = Array.isArray(textOrArray) ? textOrArray : [textOrArray];
  let idx = 0;
  modalText.textContent = messages[idx];
  modal.style.display = "flex";

  modal.onclick = () => {
    if (typeof nextCallback === "function") {
      // If a nextCallback is supplied, run it once on click and stop
      modal.onclick = null;
      modal.style.display = "none";
      try { nextCallback(); } catch (e) { console.error(e); }
      return;
    }
    // otherwise step through the messages array
    idx++;
    if (idx < messages.length) {
      modalText.textContent = messages[idx];
    } else {
      modal.style.display = "none";
      modal.onclick = null;
    }
  };
}

function closeMessageModal() {
  const modal = document.getElementById("messageModal");
  if (!modal) return;
  modal.style.display = "none";
  modal.onclick = null;
}

function centerPulse(el) {
  if (!el) return;
  el.classList.remove("center-pulse", "front"); // reset
  // force reflow to ensure animation restarts
  void el.offsetWidth;
  el.classList.add("center-pulse", "front");
  // remove only the `front` class after 3s to return to normal layering
  setTimeout(() => {
    el.classList.remove("front");
  }, 3000);
}

function colorName(c) {
  switch (c) {
    case "red": return "赤";
    case "blue": return "青";
    case "green": return "緑";
    case "yellow": return "黄色";
    case "pink": return "ピンク";
    default: return "";
  }
}

// Spawn helpers — ensure display:block is set and egg is hidden when dinos show
function spawnTriceratops() {
  const dino = document.getElementById("dino");
  const egg = document.getElementById("eggImage");
  window.currentCreature = "triceratops";
  window.currentColor = colors[Math.floor(Math.random() * colors.length)];

  dino.src = "triceratops.png";
  dino.className = `creature-img ${window.currentColor} idle-sway`;
  dino.style.display = "block";
  if (egg) egg.style.display = "none";

  showMessageModal([
    `タマゴから${colorName(window.currentColor)}トリケラトプスが生まれた！`,
    "トリケラトプスはあなたをママだと思ってるみたい"
  ]);
  centerPulse(dino);
}

function spawnBrachiosaurus() {
  const dino = document.getElementById("dino");
  const egg = document.getElementById("eggImage");
  window.currentCreature = "brachio";
  window.currentColor = colors[Math.floor(Math.random() * colors.length)];

  dino.src = "brachio.png";
  dino.className = `creature-img ${window.currentColor} idle-sway`;
  dino.style.display = "block";
  if (egg) egg.style.display = "none";

  showMessageModal([
    "タマゴからブラキオサウルスが生まれた！",
    "ブラキオサウルスと一緒に頑張ろう！"
  ]);
  centerPulse(dino);
}

function spawnLeopardGecko() {
  const dino = document.getElementById("dino");
  const egg = document.getElementById("eggImage");
  window.currentCreature = "gecko";
  const type = Math.random() < 0.5 ? "highyellow" : "maxsnow";
  window.currentColor = type; // track morph

  dino.src = "yellow.png"; // base image
  dino.className = `creature-img ${type === "maxsnow" ? "gecko-maxsnow" : "gecko-highyellow"} idle-sway`;
  dino.style.display = "block";
  if (egg) egg.style.display = "none";

  const nameJP = type === "maxsnow" ? "マックスノー" : "ハイイエロー";
  showMessageModal([`タマゴがかえって、レオパの${nameJP}が生まれた！`, "レオパと一緒に頑張ろう！"]);
  centerPulse(dino);
}

// Main progression function (keeps original name for compatibility)
function handleCreatureProgress() {
  const s = window.streak;
  const egg = document.getElementById("eggImage");
  const dino = document.getElementById("dino");

  // safety checks
  if (!egg || !dino) return;

  // streak === 0 : clear
  if (s === 0) {
    egg.style.display = "none";
    dino.style.display = "none";
    window.currentCreature = null;
    window.currentColor = null;
    egg.src = "";
    dino.src = "";
    return;
  }

  // streak === 3 : show message first, then animate egg falling
  if (s === 3) {
    showMessageModal("おや？", () => {
      egg.src = "egg1.png";
      egg.classList.remove("idle-sway", "fall-and-bounce");
      void egg.offsetWidth;
      egg.classList.add("fall-and-bounce");
      egg.style.display = "block";

      // After animation, show the follow-up messages and make egg idle
      setTimeout(() => {
        showMessageModal(["何かのタマゴを見つけた！", "正解してタマゴを育てよう！"]);
        egg.classList.add("idle-sway");
      }, 1800);
    });
    return;
  }

  // streak === 5 : probabilities (egg2 90%, hajiki 5%, frog 5%)
  if (s === 5) {
    const r = Math.random();
    if (r < 0.90) {
      // egg2
      window.currentCreature = "egg2";
      egg.src = "egg2.png";
      egg.className = "creature-img idle-sway";
      egg.style.display = "block";
      showMessageModal(["タマゴが割れそう！何か生まれるかも！", "正解してタマゴをかえそう！"]);
      centerPulse(egg);
    } else if (r < 0.95) {
      // hajiki
      window.currentCreature = "hajiki";
      egg.src = "hajiki.png";
      egg.className = "creature-img idle-sway";
      egg.style.display = "block";
      showMessageModal(["よく見たらタマゴじゃなくてはじき丸くんだった…", "はじき丸くんと一緒に頑張ろう！"]);
      centerPulse(egg);
    } else {
      // frog
      window.currentCreature = "frog";
      egg.src = "frog.png";
      egg.className = "creature-img idle-sway";
      egg.style.display = "block";
      showMessageModal(["よく見たらタマゴじゃなくてカエルだった…", "カエルと一緒に頑張ろう！"]);
      centerPulse(egg);
    }
    return;
  }

  // streak === 10 : hatch only if egg2 is active
  if (s === 10 && window.currentCreature === "egg2") {
    const r = Math.random();
    if (r < 0.40) {
      spawnTriceratops();
    } else if (r < 0.70) {
      spawnBrachiosaurus();
    } else {
      spawnLeopardGecko();
    }
    return;
  }

  // streak === 15 : triceratops growth
  if (s === 15 && window.currentCreature === "triceratops") {
    // show evolved sprite but keep color class
    dino.src = "triceratops2.png";
    if (!dino.className.includes("idle-sway")) dino.classList.add("idle-sway");
    dino.style.display = "block";
    showMessageModal("おめでとう！トリケラトプスが成長したよ！");
    centerPulse(dino);
    return;
  }
}

// helper – call after correct answer if you want the "ママが正解..." message
function maybeCheerOnCorrect() {
  if (window.streak > 10 && window.currentCreature === "triceratops") {
    showMessageModal("ママが正解してトリケラトプスも嬉しそう！");
  }
}
