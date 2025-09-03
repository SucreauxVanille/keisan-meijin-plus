function handleCreatureProgress(streak) {
  const description = document.getElementById("description");
  const eggImage = document.getElementById("eggImage");
  const dino = document.getElementById("dino");

  // 初期化（ただしstreakが10以上ならdinoは消さない）
  eggImage.classList.remove("fall-and-bounce", "center-pulse", "idle-bounce", "idle-sway", "front");
  if (streak < 10) dino.style.display = "none";
  closeMessageModal();
  description.textContent = "計算用紙を用意して取り組もう！";

  if (streak === 0) {
    eggImage.style.display = "none";
    dino.style.display = "none";
    eggImage.src = "";
    dino.src = "";
    dino.className = "creature-img";
    return;
  }

  if (streak === 3) {
    showMessageModal("おや？", () => {
      eggImage.src = "egg1.png";
      eggImage.style.display = "block";
      eggImage.classList.add("fall-and-bounce");
      setTimeout(() => {
        showMessageModal("何かのタマゴを見つけた！", () => {
          showMessageModal("正解してタマゴを育てよう！");
        });
        eggImage.classList.add("idle-bounce");
      }, 2000);
    });

  } else if (streak === 5) {
    const rand = Math.random();
    let character;

    if (rand < 0.2) {
      character = "hajiki";
    } else if (rand < 0.4) {
      character = "frog";
    } else {
      character = "egg2";
    }

    eggImage.src = character + ".png";
    eggImage.style.display = "block";
    eggImage.classList.add("center-pulse", "front");

    setTimeout(() => {
      eggImage.classList.remove("front");
    }, 3000);

    if (character === "egg2") {
      showMessageModal("タマゴが割れそう！何か生まれるかも！", () => {
        showMessageModal("正解してタマゴをかえそう！");
      });
    } else if (character === "hajiki") {
      showMessageModal("よく見たらタマゴじゃなくてはじき丸くんだった…", () => {
        showMessageModal("はじき丸くんと一緒に頑張ろう！");
      });
    } else {
      showMessageModal("よく見たらタマゴじゃなくてカエルだった…", () => {
        showMessageModal("カエルと一緒に頑張ろう！");
      });
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

  } else if (streak === 10) {
    if (eggImage.src.includes("egg2")) {
      const variants = ["brachio", "red", "blue", "green", "yellow", "pink"];
      const rand = Math.random();
      let choice;

      if (rand < 0.3) {
        choice = "brachio";
      } else {
        const triceratopsColors = ["red", "blue", "green", "yellow", "pink"];
        choice = triceratopsColors[Math.floor(Math.random() * triceratopsColors.length)];
      }

      if (choice === "brachio") {
        dino.src = "brachio.png";
        showMessageModal("タマゴからブラキオサウルスが生まれた！", () => {
          showMessageModal("ブラキオサウルスと一緒に頑張ろう！");
        });
      } else {
        dino.src = "triceratops.png";
        dino.className = "creature-img " + choice;
        showMessageModal(`タマゴから${colorName(choice)}トリケラトプスが生まれた！`, () => {
          showMessageModal("トリケラトプスはあなたをママだと思ってるみたい");
        });
        dino.classList.add("center-pulse", "front");
        setTimeout(() => {
          dino.classList.remove("front");
        }, 3000);
      }
      dino.style.display = "block";
      dino.classList.add("idle-bounce");
    } else {
      showMessageModal("そういえば、本当にタマゴがゲットできることもあるみたいだよ");
    }
    eggImage.style.display = "none";

  } else if (streak === 15) {
    if (dino.style.display !== "none" && dino.src.includes("triceratops")) {
      const colorClass = [...dino.classList].find(cls => ["red", "blue", "green", "yellow", "pink"].includes(cls));
      if (colorClass) {
        dino.src = `triceratops2.png`;
        dino.classList.add("idle-sway", "center-pulse", "front");
        setTimeout(() => {
          dino.classList.remove("front");
        }, 3000);
        showMessageModal("おめでとう！トリケラトプスが成長したよ！");
      }
    }

  } else if (streak > 15) {
    if (dino.style.display !== "none" && dino.src.includes("triceratops2")) {
      showMessageModal("ママが正解してトリケラトプスも嬉しそう！");
    }
  }

  if (streak > 10 && streak !== 15 && dino.style.display !== "none" && dino.src.includes("triceratops")) {
    showMessageModal("ママが正解してトリケラトプスも嬉しそう！");
  }
}

function colorName(colorClass) {
  switch (colorClass) {
    case "red": return "赤";
    case "blue": return "青";
    case "green": return "緑";
    case "yellow": return "黄色";
    case "pink": return "ピンク";
    default: return "";
  }
}

function showMessageModal(text, nextCallback) {
  const modal = document.getElementById("messageModal");
  const modalText = document.getElementById("modalText");
  modalText.textContent = text;
  modal.style.display = "block";
  modal.onclick = () => {
    if (nextCallback) {
      modal.onclick = () => closeMessageModal();
      nextCallback();
    } else {
      closeMessageModal();
    }
  };
}

function closeMessageModal() {
  const modal = document.getElementById("messageModal");
  modal.style.display = "none";
  modal.onclick = null;
}
