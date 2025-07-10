function handleCreatureProgress(streak) {
  const description = document.getElementById("description");
  const eggImage = document.getElementById("eggImage");
  const dino = document.getElementById("dino");

  // 初期化
  eggImage.classList.remove("fall-and-bounce");
  dino.style.display = "none";
  closeMessageModal();
  description.textContent = "計算用紙を用意して取り組もう！";

  // ✅ streak が 0 のとき：画像類を非表示にして終了
  if (streak === 0) {
    eggImage.style.display = "none";
    dino.style.display = "none";
    eggImage.src = "";
    dino.src = "";
    dino.className = "creature-img";
    return;
  }

  if (streak === 3) {
    eggImage.src = "egg1.png";
    eggImage.style.display = "block";
    description.textContent = "連続正解でタマゴを育てよう！";

    // ステップ①「おや？」表示
    showMessageModal("おや？");

    // ステップ② アニメーション → ステップ③メッセージ表示
    setTimeout(() => {
      eggImage.classList.add("fall-and-bounce");

      setTimeout(() => {
        showMessageModal("何かのタマゴを見つけた！");
      }, 2000); // アニメーション完了後にメッセージ変更

    }, 600); // 最初のメッセージを少し表示してからアニメーション開始

  } else if (streak === 5) {
    if (Math.random() < 0.5) {
      eggImage.src = "egg2.png";
      showMessageModal("タマゴが割れそう！何か生まれるかも！");
    } else {
      eggImage.src = "hajiki.png";
      showMessageModal("よく見たらタマゴじゃなかった…");
    }
    eggImage.style.display = "block";
    description.textContent = "タマゴの変化に注目だ！";

  } else if (streak > 5 && streak < 10) {
    if (eggImage.src.includes("egg2")) {
      showMessageModal("タマゴの中身も喜んでるよ！");
    } else if (eggImage.src.includes("hajiki")) {
      showMessageModal("はじき丸くんも応援しているよ！");
    }
    eggImage.style.display = "block";
    description.textContent = "タマゴの変化に注目だ！";

  } else if (streak === 10) {
    if (eggImage.src.includes("egg2")) {
      const variants = ["red", "blue", "green", "brachio"];
      const choice = variants[Math.floor(Math.random() * variants.length)];

      if (choice === "brachio") {
        dino.src = "brachio.png";
        showMessageModal("タマゴからブラキオサウルスが生まれた！");
      } else {
        dino.src = "triceratops.png";
        dino.className = "creature-img " + choice;
        showMessageModal(`タマゴから${colorName(choice)}トリケラトプスが生まれた！`);
      }
      dino.style.display = "block";
    } else {
      showMessageModal("そういえば、本当にタマゴがゲットできることもあるみたいだよ");
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

function showMessageModal(text) {
  const modal = document.getElementById("messageModal");
  const modalText = document.getElementById("modalText");
  modalText.textContent = text;
  modal.style.display = "block";
}

function closeMessageModal() {
  document.getElementById("messageModal").style.display = "none";
}
