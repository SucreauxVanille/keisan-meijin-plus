// triceratops.js

// グローバル変数は window に格納（重複宣言防止）
window.currentCreature = null;
window.currentColor = null;

// 色リスト（トリケラ・ブラキオ用）
const colors = ["red", "blue", "green", "yellow", "pink"];

// MessageModal表示
function showMessageModal(messages) {
  const modal = document.getElementById("messageModal");
  const modalText = document.getElementById("modalText");

  if (!Array.isArray(messages)) messages = [messages];
  let index = 0;

  modalText.textContent = messages[index];
  modal.style.display = "flex";

  modal.onclick = () => {
    index++;
    if (index < messages.length) {
      modalText.textContent = messages[index];
    } else {
      modal.style.display = "none";
    }
  };
}

// MessageModalを閉じる
function closeMessageModal() {
  document.getElementById("messageModal").style.display = "none";
}

// 中央強調アニメーション
function centerPulse(imgElement) {
  imgElement.classList.add("center-pulse", "front");
  setTimeout(() => {
    imgElement.classList.remove("center-pulse", "front");
  }, 3000);
}

// 色名を日本語に変換
function colorName(color) {
  switch (color) {
    case "red": return "あか";
    case "blue": return "あお";
    case "green": return "みどり";
    case "yellow": return "きいろ";
    case "pink": return "ピンク";
    default: return "";
  }
}

// トリケラトプス生成
function spawnTriceratops() {
  const dino = document.getElementById("dino");
  window.currentCreature = "triceratops";
  window.currentColor = colors[Math.floor(Math.random() * colors.length)];

  dino.src = `images/${window.currentColor}_triceratops.png`;
  dino.className = "creature-img idle-sway";
  dino.style.filter = ""; // 色変換はCSSで適用

  showMessageModal([
    `タマゴから${colorName(window.currentColor)}トリケラトプスが生まれた！`,
    "トリケラトプスはあなたをママだと思ってるみたい"
  ]);
  centerPulse(dino);
}

// ブラキオ生成
function spawnBrachiosaurus() {
  const dino = document.getElementById("dino");
  window.currentCreature = "brachio";
  window.currentColor = colors[Math.floor(Math.random() * colors.length)];

  dino.src = `images/${window.currentColor}_brachio.png`;
  dino.className = "creature-img idle-sway";
  dino.style.filter = "";

  showMessageModal([
    "タマゴからブラキオサウルスが生まれた！",
    "ブラキオサウルスと一緒に頑張ろう！"
  ]);
  centerPulse(dino);
}

// レオパードゲッコー生成
function spawnLeopardGecko() {
  const dino = document.getElementById("dino");
  window.currentCreature = "gecko";

  const type = Math.random() < 0.5 ? "highyellow" : "maxsnow";
  window.currentColor = type;

  dino.src = "images/yellow.png";
  dino.className = "creature-img idle-sway";
  dino.style.filter = type === "maxsnow" ? "saturate(0%)" : "saturate(100%)";

  const nameJP = type === "maxsnow" ? "マックスノー" : "ハイイエロー";
  showMessageModal([
    `タマゴがかえって、レオパの${nameJP}が生まれた！`,
    "レオパと一緒に頑張ろう！"
  ]);
  centerPulse(dino);
}

// 進行管理（main.jsから呼び出し）
function handleCreatureProgress() {
  const streak = window.streak;
  const eggImage = document.getElementById("eggImage");

  if (streak === 3) {
    showMessageModal("おや？");
    eggImage.src = "images/egg1.png";
    eggImage.className = "creature-img fall";
  }

  if (streak === 5) {
    const rand = Math.random();
    if (rand < 0.6) {
      showMessageModal([
        "タマゴが割れそう！何か生まれるかも！",
        "正解してタマゴをかえそう！"
      ]);
      eggImage.src = "images/egg2.png";
      eggImage.className = "creature-img fall";
    } else if (rand < 0.8) {
      showMessageModal([
        "よく見たらタマゴじゃなくてはじき丸くんだった…",
        "はじき丸くんと一緒に頑張ろう！"
      ]);
      eggImage.src = "images/hajiki.png";
      eggImage.className = "creature-img idle-sway";
    } else {
      showMessageModal([
        "よく見たらタマゴじゃなくてカエルだった…",
        "カエルと一緒に頑張ろう！"
      ]);
      eggImage.src = "images/frog.png";
      eggImage.className = "creature-img idle-sway";
    }
    centerPulse(eggImage);
  }

  if (streak === 10) {
    const rand = Math.random();
    if (rand < 0.4) {
      spawnTriceratops();
    } else if (rand < 0.7) {
      spawnBrachiosaurus();
    } else {
      spawnLeopardGecko();
    }
  }

  if (streak === 15 && window.currentCreature === "triceratops") {
    const dino = document.getElementById("dino");
    dino.src = `images/${window.currentColor}_triceratops2.png`;
    dino.className = "creature-img idle-sway";

    showMessageModal("おめでとう！トリケラトプスが成長したよ！");
    centerPulse(dino);
  }
}
