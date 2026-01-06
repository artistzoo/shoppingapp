// 온보딩 슬라이드 관련 변수
let currentSlide = 1;

// 다음 슬라이드로 이동
function nextSlide() {
  const currentSlideEl = document.getElementById(`slide-${currentSlide}`);
  const indicators = document.querySelectorAll('.indicator');
  
  if (currentSlideEl) {
    currentSlideEl.classList.remove('active');
  }
  indicators[currentSlide - 1].classList.remove('active');
  
  currentSlide++;
  const nextSlideEl = document.getElementById(`slide-${currentSlide}`);
  if (nextSlideEl) {
    nextSlideEl.classList.add('active');
    indicators[currentSlide - 1].classList.add('active');
  }
}

// 앱 시작 (온보딩 종료)
function startApp() {
  document.getElementById('onboarding-wrap').classList.add('hidden');
  document.getElementById('wrap').classList.add('show');
  // bottom-nav 다시 노출
  const bottomNav = document.querySelector('.bottom-nav');
  if (bottomNav) bottomNav.style.display = 'flex';
}

// 로그인/회원/메뉴/챗 등
function openLogin() {
  alert('로그인 페이지로 이동!');
}

function openJoin() {
  alert('회원가입 페이지로 이동!');
}

function openChat() {
  alert('문의사항/채팅화면 입니다!');
}

function moveSection(id) {
  const s = document.getElementById(id);
  if (s) s.scrollIntoView({behavior:'smooth'});
}


// 메인 슬라이드
let slideIdx = 0;
let slideTm;
let SLD_TOTAL = 0;

function initMainSlider() {
  const slides = document.querySelectorAll('.main-slide');
  const sldIndicators = document.querySelectorAll('.sld-indicator');
  SLD_TOTAL = slides.length;

  function showMainSlide(idx) {
    slides.forEach((s, i) => s.classList.toggle('active', i === idx));
    sldIndicators.forEach((d, i) => d.classList.toggle('active', i === idx));
    slideIdx = idx;
  }

  function mainSliderAuto() {
    if (slideTm) clearInterval(slideTm);
    slideTm = setInterval(() => {
      let ni = (slideIdx + 1) % SLD_TOTAL;
      showMainSlide(ni);
    }, 4000);
  }

  sldIndicators.forEach((ind, idx) => {
    ind.onclick = () => {
      showMainSlide(idx);
      mainSliderAuto();
    };
    ind.style.cursor = 'pointer';
  });

  showMainSlide(0);
  mainSliderAuto();
}
document.addEventListener('DOMContentLoaded', () => {
  initMainSlider();
});

// shop 메타탭/메타갤러리
let metaTabIdx = 0;
let metaGalleryList = [
  ['image/index/marne.png','image/index/sopni1.png','image/index/cask1.png','image/index/weimar1.png','image/index/soie1.png','image/index/modle1.png'],
  ['metaGallery1-0.jpg','metaGallery1-1.jpg','metaGallery1-2.jpg','metaGallery1-3.jpg','metaGallery1-4.jpg','metaGallery1-5.jpg'],
  ['metaGallery2-0.jpg','metaGallery2-1.jpg','metaGallery2-2.jpg','metaGallery2-3.jpg','metaGallery2-4.jpg','metaGallery2-5.jpg'],
  ['metaGallery3-0.jpg','metaGallery3-1.jpg','metaGallery3-2.jpg','metaGallery3-3.jpg','metaGallery3-4.jpg','metaGallery3-5.jpg'],
  ['metaGallery4-0.jpg','metaGallery4-1.jpg','metaGallery4-2.jpg','metaGallery4-3.jpg','metaGallery4-4.jpg','metaGallery4-5.jpg'],
  ['metaGallery5-0.jpg','metaGallery5-1.jpg','metaGallery5-2.jpg','metaGallery5-3.jpg','metaGallery5-4.jpg','metaGallery5-5.jpg'],
];
let metaActiveImgIdx = 0;

function changeMetaTab(idx) {
  metaTabIdx = idx;
  metaActiveImgIdx = 0;
  document.querySelectorAll('.meta-icon').forEach((ic, i) => ic.classList.toggle('active', i === idx));
  renderMetaGallery();
}

function changeMetaGallery(imgIdx) {
  metaActiveImgIdx = imgIdx;
  renderMetaGallery();
}

function renderMetaGallery() {
  const big = document.getElementById('metaBigImg');
  if (!big) return;
  
  big.src = metaGalleryList[metaTabIdx][metaActiveImgIdx];
  const thumbs = document.querySelectorAll('.meta-thumb');
  thumbs.forEach((th, i) => {
    th.classList.toggle('active', i === metaActiveImgIdx);
    th.src = metaGalleryList[metaTabIdx][i];
  });
}

// 오프라인 STORE
let storeSlideIdx = 0;

function changeStoreSlide(idx) {
  storeSlideIdx = idx;
  document.querySelectorAll('.store-slide-set').forEach((set, i) => {
    set.classList.toggle('active', i === idx);
  });
  document.querySelectorAll('.store-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === idx);
  });
}

// Journal 슬라이드
let currentJournalPage = 0;

function changeJournalSlide(pageIndex) {
  currentJournalPage = pageIndex;
  const container = document.getElementById('journalThumbs');
  const dots = document.querySelectorAll('.journal-dot');
  
  if (!container) return;
  
  dots.forEach((dot, i) => dot.classList.toggle('active', i === pageIndex));
  
  const moveAmount = pageIndex * 354;
  container.style.transform = `translateX(-${moveAmount}px)`;
}

// Support 토글
function toggleSupport() {
  const el = document.getElementById('supportList');
  if (el) {
    el.classList.toggle('active');
  }
}
function toggleSupport() {
  const list = document.getElementById('supportList');
  const btn = document.querySelector('.support-btn');

  list.classList.toggle('active');
  btn.classList.toggle('active');
}


// 외부 클릭 시 support-list 닫기
document.addEventListener('click', function(e) {
  const supportBtn = document.querySelector('.support-btn');
  const supportList = document.getElementById('supportList');
  
  if (supportBtn && supportList) {
    if (!supportBtn.contains(e.target) && !supportList.contains(e.target)) {
      supportList.classList.remove('active');
    }
  }
});

// 사이드 메뉴 모달
function openMenuModal() {
  document.getElementById('sideMenuModal').classList.add('show');
  document.querySelectorAll('.side-menu-top').forEach(el => el.classList.remove('open'));
}

function closeMenuModal() {
  document.getElementById('sideMenuModal').classList.remove('show');
}

function toggleSideAccordion(i) {
  let tops = document.querySelectorAll('.side-menu-top');
  tops.forEach((el, idx) => {
    if (idx === i) {
      el.classList.toggle('open');
    } else {
      el.classList.remove('open');
    }
  });
}

/* 스크롤 */
window.addEventListener('scroll', () => {
  const btns = document.querySelector('.footer-action-btns');
  if (!btns) return;

  if (window.scrollY < 1000) {
    btns.classList.add('hide');
  } else {
    btns.classList.remove('hide');
  }
});

/* detail_____________ */
/* 구매하기버튼 */
function openPurchaseModal() {
  document.getElementById('purchaseModal').classList.add('active');
}

function closePurchaseModal() {
  document.getElementById('purchaseModal').classList.remove('active');
}

/* 탭버튼 */
function changeTab(type) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  document.querySelector(`.tab-btn[onclick*="${type}"]`).classList.add('active');
  document.getElementById(`tab-${type}`).classList.add('active');
}
/* main-> detail */
document.body.classList.add('is-main');

function openDetail() {
  document.body.classList.remove('is-main');
  document.body.classList.add('is-detail');
  window.scrollTo({ top: 0 });
}

function closeDetail() {
  document.body.classList.remove('is-detail');
  document.body.classList.add('is-main');
  window.scrollTo({ top: 0 });
}
