const PASSWORD = "250724";
const TOTAL_PIECES = 24;

// 퀴즈 데이터 (질문은 찬우님이 완성해주셔야 합니다!)
const quizzes = [
  { question: "우리가 만나기 시작한 날은?", options: ["250723", "250724", "250725", "250726"], answer: 1, memory: "우리의 이야기는 25.07.24부터였지.<br> 그 날 기억나?" },
  { question: "오늘은 며칠 기념일?", options: ["100일", "200일", "300일", "1주년"], answer: 2, memory: "벌써 우리가 300일이라니. <br>시간 진짜 빠르다. 그치?" },
  { question: "25년 7월 15일 잠실 <br>롯데시네마에서 본 영화 이름은?", options: ["진격의 거인", "살목지", "주토피아 2", "노이즈"], answer: 3, memory: "사귀기 전 여진이랑 첫 서울! <br>쌤쌤쌤 가서 맛있는 밥도 먹고 영화도 보고 실바니안도 구경했지." },
  { question: "25년 7월 22일 해방촌에서<br> 방문했던 편지 적는 카페 이름은?", options: ["해방 공원", "팬스 댄스", "널 담은 공간", "KKI"], answer: 2, memory: "이태원 처음 가보는 곳이었는데 여진이와 <br>함께라서 너무 기뻤어." },
  { question: "25년 7월 28일 수원역에서 <br>내가 뽑아준 인형의 이름은?", options: ["투슬리스", "패트와 매트", "메타몽", "맥그로우"], answer: 0, memory: "투슬리스가 셋!! 푸힣 ><<br> 이 날 스톤 카페도 너무 좋았어." },
  { question: "25년 8월 5일 성수동에서 <br>먹은 음식이 아닌 것은?", options: ["규카츠", "양꼬치", "오미자 크러쉬", "리소토"], answer: 3, memory: "날씨가 더운 것 빼고는 <br>모든 게 완벽했던 하루." },
  { question: "25년 8월 11일 서울숲에서 <br>하지 않은 것은?", options: ["스시 먹기", "라멘 먹기", "신문지 사진 찍기", "라프레플루트 방문"], answer: 1, memory: "라프레플루트 가고 싶어서 서울숲 데이트!! 도토리 캐리커쳐도 다녀왔지. <br>스시집이랑 라프레플루트 재방문하고 싶어 ㅠㅠ." },
  { question: "내 마음은 누구 거?", options: ["내 거", "친구 거", "너 거", "비밀"], answer: 2, memory: "내 마음은 언제나 여진이 꺼야!" },
  { question: "우리 추억은 앞으로?", options: ["끝", "계속 쌓기", "삭제", "모름"], answer: 1, memory: "앞으로도 예쁜 추억 많이 만들자." },
  { question: "300일 다음에도 우리는?", options: ["계속 사랑하기", "도망가기", "싸우기", "잠수타기"], answer: 0, memory: "사랑해, 여진아!" },
  { question: "완성되면 나오는 말은?", options: ["생일 축하해", "300일 축하해", "잘 자", "안녕"], answer: 1, memory: "축하해!!!" },
  { question: "앞으로도 예쁜 ____ 하자.", options: ["공부", "운동", "사랑", "게임"], answer: 2, memory: "예쁜 사랑 계속하자 💗" },
  // ... 나머지 13~24번 퀴즈는 형식을 맞춰서 채워주세요!
];

// 나머지 문제는 임시 데이터로 채움 (에러 방지)
while(quizzes.length < TOTAL_PIECES) {
  quizzes.push({ question: `추가 문제 ${quizzes.length + 1}`, options: ["답1", "답2", "답3", "답4"], answer: 0, memory: "기본 메모리" });
}

const loginScreen = document.getElementById("login-screen");
const gameScreen = document.getElementById("game-screen");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const loginError = document.getElementById("login-error");

const puzzleSvg = document.getElementById("puzzle-svg");
const quizModal = document.getElementById("quiz-modal");
const quizQuestion = document.getElementById("quiz-question");
const optionsBox = document.getElementById("options");
const wrongText = document.getElementById("wrong-text");
const closeBtn = document.getElementById("close-btn");

const finalModal = document.getElementById("final-modal");
const progress = document.getElementById("progress");
const memoryModal = document.getElementById("memory-modal");
const memoryText = document.getElementById("memory-text");
const memoryOkBtn = document.getElementById("memory-ok-btn");
const livesText = document.getElementById("lives");

let selectedPiece = null;
let solvedCount = 0;
let lives = 3;
const solved = Array(TOTAL_PIECES).fill(false);

loginBtn.addEventListener("click", login);
passwordInput.addEventListener("keydown", (e) => { if (e.key === "Enter") login(); });

function login() {
  if (passwordInput.value === PASSWORD) {
    loginScreen.classList.remove("active");
    setTimeout(() => {
      gameScreen.classList.add("active");
    }, 50);
  } else {
    loginError.textContent = "비밀번호가 아니야. 다시 입력해줘!";
  }
}

closeBtn.addEventListener("click", () => { quizModal.classList.remove("active"); });

function makePath(x, y, top, right, bottom, left) {
  const size = 100; const knob = 16;
  const start = `M ${x} ${y}`;
  const tE = (t) => t === 0 ? `L ${x+size} ${y}` : `L ${x+38} ${y} C ${x+38} ${y-t*knob}, ${x+62} ${y-t*knob}, ${x+62} ${y} L ${x+size} ${y}`;
  const rE = (r) => r === 0 ? `L ${x+size} ${y+size}` : `L ${x+size} ${y+38} C ${x+size+r*knob} ${y+38}, ${x+size+r*knob} ${y+62}, ${x+size} ${y+62} L ${x+size} ${y+size}`;
  const bE = (b) => b === 0 ? `L ${x} ${y+size}` : `L ${x+62} ${y+size} C ${x+62} ${y+size+b*knob}, ${x+38} ${y+size+b*knob}, ${x+38} ${y+size} L ${x} ${y+size}`;
  const lE = (l) => l === 0 ? `L ${x} ${y}` : `L ${x} ${y+62} C ${x-l*knob} ${y+62}, ${x-l*knob} ${y+38}, ${x} ${y+38} L ${x} ${y}`;
  return `${start} ${tE(top)} ${rE(right)} ${bE(bottom)} ${lE(left)} Z`;
}

function createPuzzle() {
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  puzzleSvg.appendChild(defs);
  const cols = 4; const rows = 6; const size = 100;
  const rightSigns = [[1,-1,1],[-1,1,-1],[1,-1,1],[-1,1,-1],[1,-1,1],[-1,1,-1]];
  const bottomSigns = [[-1,1,-1,1],[1,-1,1,-1],[-1,1,-1,1],[1,-1,1,-1],[-1,1,-1,1]];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const i = row * cols + col;
      const x = col * size; const y = row * size;
      const top = row === 0 ? 0 : -bottomSigns[row - 1][col];
      const right = col === cols - 1 ? 0 : rightSigns[row][col];
      const bottom = row === rows - 1 ? 0 : bottomSigns[row][col];
      const left = col === 0 ? 0 : -rightSigns[row][col - 1];
      const d = makePath(x, y, top, right, bottom, left);

      const clip = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
      clip.setAttribute("id", `clip-${i}`);
      const clipPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      clipPath.setAttribute("d", d);
      clip.appendChild(clipPath); defs.appendChild(clip);

      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
      group.classList.add("piece"); group.dataset.index = i;
      const photo = document.createElementNS("http://www.w3.org/2000/svg", "image");
      photo.setAttribute("href", "photo.jpg"); photo.setAttribute("x", "0"); photo.setAttribute("y", "0");
      photo.setAttribute("width", "400"); photo.setAttribute("height", "600");
      photo.setAttribute("preserveAspectRatio", "xMidYMid slice"); photo.setAttribute("clip-path", `url(#clip-${i})`);
      photo.classList.add("piece-photo");
      const fill = document.createElementNS("http://www.w3.org/2000/svg", "path");
      fill.setAttribute("d", d); fill.classList.add("piece-fill");
      const outline = document.createElementNS("http://www.w3.org/2000/svg", "path");
      outline.setAttribute("d", d); outline.classList.add("piece-outline");

      group.appendChild(photo); group.appendChild(fill); group.appendChild(outline);
      group.addEventListener("click", () => openQuiz(i));
      puzzleSvg.appendChild(group);
    }
  }
}

function openQuiz(index) {
  if (solved[index]) return;
  selectedPiece = index;
  const quiz = quizzes[index];
  quizQuestion.innerHTML = quiz.question;
  wrongText.textContent = "";
  optionsBox.innerHTML = "";
  livesText.textContent = "남은 기회  " + "💙 ".repeat(lives) + "🤍 ".repeat(3 - lives);
  quiz.options.forEach((option, optionIndex) => {
    const btn = document.createElement("button");
    btn.className = "option-btn"; btn.textContent = option;
    btn.addEventListener("click", () => checkAnswer(optionIndex));
    optionsBox.appendChild(btn);
  });
  quizModal.classList.add("active");
  if (navigator.vibrate) navigator.vibrate(40);
}

function checkAnswer(optionIndex) {
  const quiz = quizzes[selectedPiece];
  if (optionIndex === quiz.answer) {
    quizModal.classList.remove("active");
    memoryText.innerHTML = quiz.memory || "맞아, 정답이야 💗";
    memoryModal.classList.add("active");
  } else {
    lives--;
    livesText.textContent = "남은 기회  " + "💙 ".repeat(lives) + "🤍 ".repeat(3 - lives);
    wrongText.textContent = `우!!! 기회가 ${lives}번 남았어`;
    if (lives <= 0) {
      alert("우... 기회를 모두 사용했어 ㅠㅠ.. 처음부터 다시 시작할게.");
      resetPuzzle();
    }
  }
}

function makeConfetti() {
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.textContent = Math.random() > 0.5 ? "✨" : "💗";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.fontSize = Math.random() * 18 + 15 + "px";
    confetti.style.animationDuration = Math.random() * 2 + 2 + "s";
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 4500);
  }
}

createPuzzle();

function resetPuzzle() {
  lives = 3; solvedCount = 0; selectedPiece = null;
  for (let i = 0; i < solved.length; i++) solved[i] = false;
  document.querySelectorAll(".piece").forEach(p => p.classList.remove("solved"));
  progress.textContent = `완성도 0 / ${TOTAL_PIECES}`;
  quizModal.classList.remove("active"); memoryModal.classList.remove("active");
  finalModal.classList.remove("active");
}

memoryOkBtn.addEventListener("click", () => {
  solved[selectedPiece] = true;
  const piece = document.querySelector(`.piece[data-index="${selectedPiece}"]`);
  piece.classList.add("solved");
  solvedCount++;
  progress.textContent = `완성도 ${solvedCount} / ${TOTAL_PIECES}`;
  memoryModal.classList.remove("active");
  if (solvedCount === TOTAL_PIECES) {
    setTimeout(() => { finalModal.classList.add("active"); makeConfetti(); }, 700);
  }
  selectedPiece = null;
});