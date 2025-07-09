function handleCreatureProgress(streak) {
  const description = document.getElementById("description");
  const message = document.getElementById("message");
  const eggImage = document.getElementById("eggImage");
  const dino = document.getElementById("dino");

  // 初期化
  eggImage.style.display = "none";
  eggImage.className = ""; // アニメーションリセット
  dino.style.display = "none";
  message.textContent = "";
  description.textContent = "計算用紙を用意して取り組もう！";

if (streak === 3) {
  eggImage.src = "egg1.png";
  eggImage.style.display = "block";

  // アニメーションクラスを再適用
  eggImage.classList.remove("fall-and-bounce");
  void eggImage.offsetWidth; // ←ブラウザに再描画を促す
  eggImage.classList.add("fall-and-bounce");

  description.textContent = "連続正解するとタマゴが育つかも！？";
  message.textContent = "おや？何かのタマゴを見つけた！";
  } else if (streak === 5) {
    if (Math.random() < 0.5) {
      eggImage.src = "egg2.png";
      message.textContent = "タマゴが割れそう！何か生まれるかも！";
    } else {
      eggImage.src = "hajiki.png";
      message.textContent = "よく見たらタマゴじゃなくてはじき丸くんだった…";
    }
    eggImage.style.display = "block";
    description.textContent = "タマゴの変化に注目だ！";
  } else if (streak > 5 && streak < 10) {
    if (eggImage.src.includes("egg2")) {
      message.textContent = "タマゴの中身も喜んでるよ！";
    } else if (eggImage.src.includes("hajiki")) {
      message.textContent = "はじき丸くんも応援しているよ！";
    }
    eggImage.style.display = "block";
    description.textContent = "タマゴの様子を見守ろう";
  } else if (streak === 10) {
    if (eggImage.src.includes("egg2")) {
      const variants = ["red", "blue", "green", "brachio"];
      const choice = variants[Math.floor(Math.random() * variants.length)];

      if (choice === "brachio") {
        dino.src = "brachio.png";
        message.textContent = "タマゴからブラキオサウルスが生まれた！";
      } else {
        dino.src = "triceratops.png";
        dino.className = "creature-img " + choice;
        message.textContent = `タマゴから${colorName(choice)}トリケラトプスが生まれた！`;
      }
      dino.style.display = "block";
    } else {
      message.textContent = "そういえば、本当にタマゴがゲットできることもあるみたいだよ";
    }
    eggImage.style.display = "none";
    description.textContent = "また新しいタマゴを探しにいこう！";
  }
}


function colorName(colorClass) {
  switch (colorClass) {
    case "red": return "赤";
    case "blue": return "青";
    case "green": return "緑";
    default: return "";
  }
}
