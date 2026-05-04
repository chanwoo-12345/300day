const PASSWORD = "250724";
const TOTAL_PIECES = 24;

// 퀴즈 데이터
const quizzes = [
  { question: "우리가 만나기 시작한 날은?", options: ["250723", "250724", "250725", "250726"], answer: 1, memory: "우리의 이야기는 25.07.24부터였지. 그 날 기억나?" },
  { question: "오늘은 며칠 기념일?", options: ["100일", "200일", "300일", "1주년"], answer: 2, memory: "벌써 우리가 300일이라니. 시간 진짜 빠르다. 그치?" },
  { question: "25년 7월 15일 잠실 롯데시네마에서 본 영화 이름은?", options: ["진격의 거인", "살목지", "주토피아 2", "노이즈"], answer: 3, memory: "사귀기 전 여진이랑 첫 서울! 쌤쌤쌤 가서 맛있는 밥도 먹고 영화도 보고 실바니안도 구경했지." },
  { question: "25년 7월 22일 해방촌에서 방문했던 편지 적는 카페 이름은?", options: ["해방 공원", "팬스 댄스", "널 담은 공간", "KKI"], answer: 2, memory: "이태원, 해방촌 처음 가보는 곳이었는데 여진이와 함께라서 너무 기뻤어." },
  { question: "25년 7월 28일 수원역에서 내가 뽑아준 인형의 이름은?", options: ["투슬리스", "패트와 매트", "메타몽", "맥그로우"], answer: 0, memory: "투슬리스가 셋!! 이 날 스톤 카페도 너무 좋았어." },
  { question: "25년 8월 5일 성수동(건대)에서 먹은 음식이 아닌 것은?", options: ["규카츠", "양꼬치", "오미자 크러쉬", "리소토"], answer: 3, memory: "날씨가 더운 것 빼고는 모든 게 완벽했던 하루." },
  { question: "25년 8월 11일 서울숲에서 하지 않은 것은?", options: ["스시 먹기", "라멘 먹기", "신문지 사진 찍기", "라프레플루트 방문"], answer: 1, memory: "라프레플루트 가고 싶어서 서울숲 데이트!! 도토리 캐리커쳐도 다녀왔지. 스시집이랑 라프레플루트 재방문하고 싶어!" },
  { question: "25년 8월 26일 우리의 데이트 장소는?", options: ["홍대(연남)", "아이슬란드", "파리", "미국"], answer: 0, memory: "이 날은 우리 4233 마음센터 방문한 날이야! 완전 색다른 경험이었어. 카페랑 야끼소바 푸파도 했지." },
  { question: "25년 8월 31일 수원역에서 방문한 음식점은?", options: ["우와", "만고쿠", "삼미락", "화양가옥"], answer: 3, memory: "일찍 퇴근한 오라방을 만나러 수원역까지 와준 여진이. 여진이 손에 이끌려 간 화양가옥. 너무 맛있었어!! 그리고 이 날은 회색 투슬리스를 뽑은 날!" },
  { question: "25년 9월 9일 이찬우가 처음 먹어본 종류의 음식은?", options: ["케이크", "훠궈", "오차즈케", "양고기"], answer: 2, memory: "이 날은 여진이랑 성수동 데이트한 날. 오차즈케 처음 먹어봤는데 맛있었어!! 여진이와 함께 신문지 사진도 찍고 카페도 가고 길거리 구경도 하고 그랬지." },
  { question: "25년 9월 21일 롯데월드에서 탄 놀이기구가 아닌 것은?", options: ["아트란티스", "혜성특급", "플라이벤처", "후렌치레볼루션"], answer: 0, memory: "여진이와 첫 놀이공원 데이트!!! 놀이기구 무서워하는 여진이가 너무 귀여웠어. 다음에는 아트란티스 도전이야." },
  { question: "25년 10월 14일 여진이의 차를 타고 놀러간 곳은?", options: ["전곡항", "시화나래휴게소", "영종도", "영흥도"], answer: 1, memory: "여진이의 차를 타고 놀러간 시화나래휴게소!! 여진이 운전 너무 잘해!! 여진이 덕분에 같이 시원한 바다를 볼 수 있어서 좋았어." },
  { question: "25년 10월 31일은 무슨 날이었을까?", options: ["100일", "105일", "110일", "115일"], answer: 0, memory: "25년 10월 31일은 100일!!! 새솔동 코지 하우스에서 나에게 맛밥을 선물해준 여진이. 그리고 나의 핸드메이드 편지!!" },
  { question: "25년 11월 1일 100일 데이트로 간 곳은?", options: ["홍대", "건대", "용산(삼각지)", "성수동"], answer: 2, memory: "이 날은 우리의 100일을 기념하는 데이트였지. 삼겹살, 와플, 아이스크림 등등 왕창 먹은 날이지. 여진이랑 벌써 100일이라고 했었는데 벌써 300일이야💙 사랑해." },
  { question: "25년 11월 12일 여진이가 나에게 준 선물은?", options: ["곰인형 키링", "퍼글러", "팽도리 인형", "투슬리스 인형"], answer: 0, memory: "샤브올데이에서 여진이가 나에게 준 곰인형 키링. 여진이가 직접 만든 키링!! 나에게는 그 어떤 키링보다 소중한 키링이야." },
  { question: "25년 11월 14일은 무슨 날?", options: ["이찬우 탄생일", "바쿠고 탄생일", "이누마키 탄생일", "치후유 탄생일"], answer: 0, memory: "여진이의 남자친구 이찬우의 탄생일이지!!! 이 날에 여진이가 나에게 딥티크 향수를 선물했지. 내 최애 향을 기억해주고!!! 항상 고마워💙" },
  { question: "25년 12월에 이찬우가 걸린 질병은?", options: ["독감", "코로나", "식중독", "엉덩이 기억 상실증"], answer: 2, memory: "25년 12월은 꿍시꿍시였어!!! 우리의 첫 크리스마스를 날린 식중독..! 얼른 12월 와라. 여진이랑 완벽한 하루를 보낼거니까." },
  { question: "26년 1월 10일 잠실(송파) 데이트 때 하지 않은 것은?", options: ["아웃백 푸파", "메타몽 구경", "시글루 방문", "훠궈 먹기"], answer: 3, memory: "이 날은 시글루 영화관 대여한 날!! 분위기랑 인테리어, 스피커 다 좋았는데 너무 더웠어!! 여진이와 함께라서 늘 행복해." },
  { question: "26년 1월 24일 데이트로 간 곳은?", options: ["건대 훠궈집", "안산 벌툰", "안산 CGV (주토피아)", "안산 커플 모자"], answer: 1, memory: "이 날은 여진이랑 푸데데 데이트!! 만화 카페 가서 맛밥을 하며 힐링을 하였지!! 참고로 보기에 CGV랑 커플 모자는 1월 18일 데이트라구." },
  { question: "26년 2월 7일 데이트 때 하지 않은 것은?", options: ["향수 공방", "스시 먹기", "사격", "영화 보기"], answer: 3, memory: "200일 데이트로 여진이랑 강남 데이트를 간 날이야!! 사실 200일은 2월 8일이지만 하루 앞당겨서 다녀왔지. 이 날 데이트는 여진 코스였는데 완전 이찬우 취향 저격이었어. 특히 닷노트!!!" },
  { question: "26년 2월 12일에 여진이가 나에게 준 선물은?", options: ["쿠키(브라우니)", "비니", "투슬리스", "메타몽 이모티콘"], answer: 0, memory: "여진이가 직접 구워준 쿠키랑 브라우니!! 여진이는 나중에 베이커리 차려도 될 정도의 맛이었지. 너무 맛있었어!!!! 고마워💙" },
  { question: "26년 3월 14일 데이트에서 여진이가 먹은 저녁은?", options: ["스테이크동", "연어장", "연어새우장", "연어뱃살동"], answer: 2, memory: "이 날은 우리의 스냅 사진을 위하여 동묘에 방문한 날이야!! 열심히 구경하고 저녁 먹으러 용산으로 넘어갔지. 아 맞다!! 1,000원짜리 토스트!!! ㅎㅎ." },
  { question: "26년 3월 22일 스냅사진 찍으러 간 곳은?", options: ["건대", "종로", "용산", "홍대"], answer: 1, memory: "여진이가 작가님한테 스냅 모델 지원해서 찍게 되었지. 이 날 여진이는 여신이었어. 여진이 덕분에 새로운 경험할 수 있었어. 그리고 내 옆에 있어줘서 고마워💙" },
  { question: "26년 4월 25일 수원(인계동)에서 하지 않은 것은?", options: ["살목지 시청", "료칸 방문", "스시 먹기", "빙수 먹기"], answer: 3, memory: "료칸 데이트 한 날이야!!! 처음으로 배쓰밤도 사용해봤어! 분위기 너무 좋은 데이트였고 살목지는 너무 무서웠고 ㅠㅠ. 하지만 옆에 여진이가 있어서 안 무서운 척 했어!!" },
];

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
      // 추가할 코드: 아이폰이 :active 상태를 인식하도록 빈 리스너 등록
      group.addEventListener("touchstart", () => {}, {passive: true});
      group.addEventListener("touchend", () => {}, {passive: true});
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
    memoryText.innerHTML = quiz.memory || "아자쑤!! 정답이야 💙";
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
    confetti.textContent = Math.random() > 0.5 ? "✨" : "💙";
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
  setTimeout(() => { 
    finalModal.classList.add("active"); 
    makeConfetti(); 
    // [추가] 이제 사진을 눌러서 편지를 열 수 있게 상태를 변경합니다.
    puzzleSvg.classList.add("all-solved"); 
  }, 700);
}
  selectedPiece = null;
});

// 1. 축하창에서 '사진 보러 가기' 버튼을 누를 때
document.getElementById("final-close-btn").addEventListener("click", () => {
  // 축하창 닫기
  document.getElementById("final-modal").classList.remove("active");
  document.querySelector("#game-screen h2").innerText = "차누: 우리의 추억이야 💙";
  // [중요] 확인을 누르는 순간 테두리를 서서히 없애서 온전한 사진으로 만듭니다.
  // CSS에서 설정한 transition 덕분에 1초 동안 부드럽게 사라집니다.
  puzzleSvg.classList.add("all-solved"); 
});

// 2. 완성된 사진(SVG)을 클릭하면 편지 열기
document.getElementById("puzzle-svg").addEventListener("click", () => {
  // 이미 all-solved 클래스가 추가된 상태이므로 편지가 바로 열립니다.
  if (puzzleSvg.classList.contains("all-solved")) {
    document.getElementById("letter-modal").classList.add("active");
  }
});

// 3. 편지창의 '뒤로 나가기' 버튼
document.getElementById("exit-btn").addEventListener("click", () => {
  location.reload(); 
});