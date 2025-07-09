// main.js

let currentAnswer = { numerator: 0, denominator: 1 };
let streak = 0;
let timerInterval;
let timeElapsed = 0;
let timeLimit = 0;

function toggleInput() {
  const type = document.getElementById("answerType").value;
  document.getElementById("answerFraction").style.display = type === "fraction" ? "block" : "none";
  document.getElementById("answerInteger").style.display = type === "integer" ? "block" : "none";
}

function gcd(a, b) {
  return b ? gcd(b, a % b) : a;
}

function simplify(n, d) {
  const g = gcd(Math.abs(n), Math.abs(d));
  return { numerator: n / g, denominator: d / g };
}

function generateOperand() {
  const isFraction = Math.random() < 0.5;
  if (isFraction) {
    const denominator = Math.floor(Math.random() * 11) + 2;
    let numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
    return simplify(numerator, denominator);
  } else {
    return { numerator: Math.floor(Math.random() * 20) + 1, denominator: 1 };
  }
}

function formatFraction({ numerator, denominator }) {
  if (denominator === 1) return `<span class="natural">${numerator}</span>`;
  return `<span class="fraction"><span class="top">${numerator}</span><span class="bottom">${denominator}</span></span>`;
}

function calculate(a, b, op) {
  let n1 = a.numerator, d1 = a.denominator;
  let n2 = b.numerator, d2 = b.denominator;
  let n = 0, d = 1;

  if (op === '+') {
    n = n1 * d2 + n2 * d1;
    d = d1 * d2;
  } else if (op === '-') {
    n = n1 * d2 - n2 * d1;
    d = d1 * d2;
  } else if (op === '×') {
    n = n1 * n2;
    d = d1 * d2;
  } else if (op === '÷') {
    n = n1 * d2;
    d = d1 * n2;
  }

  return simplify(n, d);
}

function generateQuestion() {
  let valid = false;
  let a, b, c, op1, op2, part1, answer;
  const ops = ['+', '-', '×', '÷'];

  while (!valid) {
    a = generateOperand();
    b = generateOperand();
    c = generateOperand();
    op1 = ops[Math.floor(Math.random() * ops.length)];
    op2 = ops[Math.floor(Math.random() * ops.length)];

    part1 = calculate(a, b, op1);
    answer = calculate(part1, c, op2);

    const part1Value = part1.numerator / part1.denominator;
    const answerValue = answer.numerator / answer.denominator;

    if (part1Value >= 0 && answerValue >= 0 && isFinite(answerValue)) {
      valid = true;
    }
  }

  currentAnswer = answer;
  const formatted = `(${formatFraction(a)} ${op1} ${formatFraction(b)}) ${op2} ${formatFraction(c)}`;
  document.getElementById("question").innerHTML = `問題：${formatted}`;
  document.getElementById("result").textContent = "";
  document.getElementById("message").textContent = "";
  document.getElementById("numerator").value = "";
  document.getElementById("denominator").value = "";
  document.getElementById("integerAnswer").value = "";
  startTimer([a, b, c]);
}

function startTimer(operands) {
  clearInterval(timerInterval);
  timeElapsed = 0;
  const hasFraction = operands.some(x => x.denominator !== 1);
  timeLimit = hasFraction ? 40 : 20;
  document.getElementById("timer").textContent = `経過時間: 0 秒 (目安: ${timeLimit}秒)`;

  timerInterval = setInterval(() => {
    timeElapsed++;
    if (timeElapsed > timeLimit) {
      document.getElementById("timer").textContent = "";
      document.getElementById("message").textContent = `${timeLimit}秒経過！答えよう！`;
      clearInterval(timerInterval);
    } else {
      document.getElementById("timer").textContent = `経過時間: ${timeElapsed} 秒 (目安: ${timeLimit}秒)`;
    }
  }, 1000);
}

function checkAnswer() {
  clearInterval(timerInterval);
  const type = document.getElementById("answerType").value;
  let userAns;

  if (type === "integer") {
    const val = parseInt(document.getElementById("integerAnswer").value);
    userAns = { numerator: val, denominator: 1 };
  } else {
    const num = parseInt(document.getElementById("numerator").value);
    const den = parseInt(document.getElementById("denominator").value);
    if (isNaN(num) || isNaN(den) || den === 0) {
      document.getElementById("result").textContent = "❌ 入力が正しくありません。";
      return;
    }
    userAns = simplify(num, den);
  }

  if (
    userAns.numerator === currentAnswer.numerator &&
    userAns.denominator === currentAnswer.denominator
  ) {
    streak++;
    document.getElementById("result").textContent = "⭕ 正解！";
  } else {
    streak = 0;
    document.getElementById("result").textContent = `❌ 不正解。正答: ${currentAnswer.numerator}/${currentAnswer.denominator}`;
  }
  document.getElementById("streak").textContent = `連続正解数: ${streak}`;
  handleCreatureProgress(streak);
  generateQuestion();
}

window.onload = () => {
  toggleInput();
  generateQuestion();
};
