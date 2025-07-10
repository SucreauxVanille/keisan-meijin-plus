function handleCreatureProgress(streak) {
  const description = document.getElementById("description");
  const eggImage = document.getElementById("eggImage");
  const dino = document.getElementById("dino");

  // 初期化（ただしstreakが10以上ならdinoは消さない）
  eggImage.classList.remove("fall-and-bounce", "center-pulse", "idle-bounce", "idle-sway");
  if (streak < 10) dino.style.display = "none";
  closeMessageModal();
  description.textContent = "計算用紙を用意して取り組もう！";

  // streak === 0：完全リセット
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
    description.textContent = "正解するとタマゴが育つかも？";

    showMessageModal("おや？");

    setTimeout(() => {
      eggImage.classList.add("fall-and-bounce");
      setTimeout(() => {
        showMessageModal("何かのタマゴを見つけた！");
        eggImage.classList.add("idle-bounce");
      }, 2000);
    }, 600);

  } else if (streak === 5) {
    const rand = Math.random();
    let character = "egg2";

    if (rand < 0.33) {
      character = "hajiki";
    } else if (rand < 0.66) {
      character = "frog";
    }

    eggImage.src = character + ".png";
    eggImage.style.display = "block";
    eggImage.classList.add("center-pulse");
    description.textContent = "タマゴが育ってるみたい！";

    if (character === "egg2") {
      showMessageModal("タマゴが割れそう！何か生まれるかも！");
    } else if (character === "hajiki") {
      showMessageModal("よく見たらタマゴじゃなくてはじき丸くんだった…");
    } else {
      showMessageModal("よく見たらタマゴじゃなくてカエルだった…");
    }
    eggImage.classList.add("idle-sway");

  } else if (streak > 5 && streak < 10) {
    if (eggImage.src.includes("egg2")) {
      showMessageModal("タマゴの中身も喜んでるよ！");
    } else if (eggImage.src.includes("hajiki")) {
      showMessageModal("はじき丸くんも応援しているよ！");
    } else if (eggImage.src.includes("frog")) {
      showMessageModal("カエルも応援しているよ！");
    }
    eggImage.style.display = "block";
    eggImage.classList.add("idle-sway");
    description.textContent = "タマゴが育ってるみたい！";

  } else if (streak === 10) {
    if (eggImage.src.includes("egg2")) {
      const variants = ["red", "blue", "green", "brachio"];
      const choice = variants[Math.floor(Math.random() * variants.length)];

      if (choice === "brachio") {
        dino.src = "brachio.png";
        showMessageModal("タマゴからブラキオサウルスが生まれた！");
        description.textContent = "ブラキオサウルスと一緒にまた頑張ろう！";
      } else {
        dino.src = "triceratops.png";
        dino.className = "creature-img " + choice;
        showMessageModal(`タマゴから${colorName(choice)}トリケラトプスが生まれた！`);
        description.textContent = "トリケラトプスと一緒にまた頑張ろう！";
      }
      dino.style.display = "block";
      dino.classList.add("idle-bounce");
    } else {
      showMessageModal("そういえば、本当にタマゴがゲットできることもあるみたいだよ");
      description.textContent = "トリケラトプスとブラキオサウルスと一緒にまた頑張ろう！";
    }
    eggImage.style.display = "none";
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
