// triceratops.js

let streak = 0;
let currentCreature = null;
let currentColor = null;

// 色指定関数（従来の恐竜用）
function colorName(choice) {
  switch (choice) {
    case "red": return "赤い";
    case "blue": return "青い";
    case "green": return "緑の";
    case "yellow": return "黄色い";
    case "pink": return "ピンクの";
    default: return "";
  }
}

// === レオパ系 ===
const geckoMorphs = ["highyellow", "maxsnow"]; // 2種類
function geckoClass(morph) {
  return morph === "maxsnow" ? "gecko-maxsnow" : "gecko-highyellow";
}
function geckoName(morph) {
  return morph === "maxsnow" ? "マックスノー" : "ハイイエロー";
}

// === メッセージモーダル ===
function showMessageModal(messages) {
  const modal = document.getElementById("messageModal");
  const text = document.getElementById("modalText");

  let step = 0;
  text.textContent = messages[0];

  modal.style.display = "flex";

  modal.onclick = () => {
    step++;
    if (step < messages.length) {
      text.textContent = messages[step];
    } else {
      modal.style.display = "none";
      modal.onclick = null;
    }
  };
}

// === クリーチャー表示 ===
function showCreature(src, extraClass = "") {
  const img = document.getElementById("dino");
  img.src = src;
  img.className = `creature-img ${extraClass}`;
}

// === streak進行 ===
function handleStreakEvent() {
  // streak === 3 → egg1
  if (streak === 3) {
    showMessageModal(["おや？"]);
    const egg = document.getElementById("eggImage");
    egg.src = "egg1.png";
    egg.className = "creature-img fall"; // 落下アニメーション
    return;
  }

  // streak === 5 → egg2 or はじき/カエル
  if (streak === 5) {
    const rand = Math.random();
    if (rand < 0.05) {
      showMessageModal(["よく見たらタマゴじゃなくてはじき丸くんだった…", "はじき丸くんと一緒に頑張ろう！"]);
      showCreature("hajiki.png", "idle-sway");
      currentCreature = "hajiki";
    } else if (rand < 0.10) {
      showMessageModal(["よく見たらタマゴじゃなくてカエルだった…", "カエルと一緒に頑張ろう！"]);
      showCreature("frog.png", "idle-sway");
      currentCreature = "frog";
    } else {
      showMessageModal(["タマゴが育ってるみたい！"]);
      const egg = document.getElementById("eggImage");
      egg.src = "egg2.png";
      egg.className = "creature-img idle-sway";
      currentCreature = "egg2";
    }
    return;
  }

  // streak === 10 → hatch!
  if (streak === 10 && currentCreature === "egg2") {
    const rand = Math.random();
    if (rand < 0.40) {
      // トリケラ
      currentColor = ["red", "blue", "green", "yellow", "pink"][Math.floor(Math.random() * 5)];
      showCreature(`triceratops.png`, `${currentColor} idle-sway`);
      showMessageModal([`タマゴから${colorName(currentColor)}トリケラトプスが生まれた！`, "トリケラトプスはあなたをママだと思ってるみたい"]);
      currentCreature = "triceratops";
    } else if (rand < 0.70) {
      // ブラキオ
      currentColor = ["red", "blue", "green", "yellow", "pink"][Math.floor(Math.random() * 5)];
      showCreature(`brachio.png`, `${currentColor} idle-sway`);
      showMessageModal(["タマゴからブラキオサウルスが生まれた！", "ブラキオサウルスと一緒に頑張ろう！"]);
      currentCreature = "brachio";
    } else {
      // レオパ
      const morph = geckoMorphs[Math.floor(Math.random() * geckoMorphs.length)];
      showCreature("yellow.png", `${geckoClass(morph)} idle-sway`);
      showMessageModal([`タマゴがかえって、レオパの${geckoName(morph)}が生まれた！`, "レオパと一緒に頑張ろう！"]);
      currentCreature = "gecko";
    }
    return;
  }

  // streak === 15 → トリケラ成長
  if (streak === 15 && currentCreature === "triceratops") {
    showCreature(`triceratops2.png`, `${currentColor} idle-sway center-pulse`);
    showMessageModal(["おめでとう！トリケラトプスが成長したよ！"]);
  }
}

// === 正解時処理 ===
function onCorrectAnswer() {
  streak++;
  handleStreakEvent();

  // streak > 10 && トリケラ表示中 → 嬉しいメッセージ
  if (streak > 10 && currentCreature === "triceratops") {
    showMessageModal(["ママが正解してトリケラトプスも嬉しそう！"]);
  }
}

// === 不正解時処理 ===
function onWrongAnswer() {
  streak = 0;
  currentCreature = null;
  currentColor = null;
  document.getElementById("eggImage").src = "";
  document.getElementById("dino").src = "";
}
