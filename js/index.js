
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
  document.body.classList.add('is-main');
  
  // bottom-nav 표시
  const bottomNav = document.querySelector('.bottom-nav');
  if (bottomNav) bottomNav.style.display = 'flex';
}

// 로그인/회원가입/메뉴/챗
function openLogin() {
  showMiniAlert('로그인 페이지로 이동!');
}

function openJoin() {
  showMiniAlert('회원가입 페이지로 이동!');
}

function openChat() {
  showMiniAlert('문의사항/채팅화면 입니다!');
}

function moveSection(id) {
  const s = document.getElementById(id);
  if (s) s.scrollIntoView({behavior:'smooth'});
}

// 커스텀 알림창
function showMiniAlert(message) {
  const modal = document.getElementById('purchaseModal');
  const content = modal.querySelector('.modal-content');

  content.style.width = '350px';
  content.style.maxWidth = '350px';
  content.innerHTML = `
    <button class="modal-close" onclick="closePurchaseModal()">✕</button>
    <div style="padding: 40px 20px; text-align: center;">
      <p style="margin: 0; font-size: 15px; color: #765425;">
        ${message}
      </p>
    </div>
  `;

  modal.classList.add('active');
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

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  initMainSlider();
});

// shop 메타탭/메타갤러리
let metaTabIdx = 0;
let metaGalleryList = [
  ['image/index/marne.png','image/index/sopni1.png','image/index/cask1.png','image/index/weimar1.png','image/index/soie1.png','image/index/modle1.png'],
  ['image/index/ainoa.png','image/index/epeul.png','image/index/cococay.png','image/index/nube.png','image/index/munaki.png','image/index/noll.png'],
  ['image/index/multi1.jpg','image/index/multi2.jpg','image/index/multi3.jpg','image/index/multi4.jpg','image/index/multi5.jpg','image/index/multi6.jpg'],
  ['image/index/sa1.png','image/index/sa2.png','image/index/sa3.png','image/index/sa4.png','image/index/sa5.png','image/index/sa6.png'],
  ['image/index/candle1.jpg','image/index/candle2.jpg','image/index/candle3.jpg','image/index/candle4.jpg','image/index/candle5.jpg','image/index/candle6.jpg'],
  ['image/index/di1.jpg','image/index/di2.jpg','image/index/di3.jpg','image/index/di4.jpg','image/index/di5.jpg','image/index/di6.jpg'],
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
  const list = document.getElementById('supportList');
  const btn = document.querySelector('.support-btn');

  if (list && btn) {
    list.classList.toggle('active');
    btn.classList.toggle('active');
  }
}

// 외부 클릭 시 support-list 닫기
document.addEventListener('click', function(e) {
  const supportBtn = document.querySelector('.support-btn');
  const supportList = document.getElementById('supportList');
  
  if (supportBtn && supportList) {
    if (!supportBtn.contains(e.target) && !supportList.contains(e.target)) {
      supportList.classList.remove('active');
      supportBtn.classList.remove('active');
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

// 스크롤 이벤트 - footer-action-btns 표시/숨김
window.addEventListener('scroll', () => {
  const btns = document.querySelector('.footer-action-btns');
  if (!btns) return;

  if (window.scrollY > 400 && window.scrollY <= 2000) {
    btns.classList.remove('hide');
  } else {
    btns.classList.add('hide');
  }

});
function getRealScroller() {
  const docScroller = document.scrollingElement || document.documentElement;

  const candidates = [
    document.body.classList.contains('is-detail')
      ? document.getElementById('detail-wrap')
      : document.getElementById('wrap'),
    docScroller,
    document.body
  ].filter(Boolean);

  for (const el of candidates) {
    if (el.scrollHeight > el.clientHeight + 1) return el;
  }

  return docScroller;
}

function goToTop() {
  const scroller = getRealScroller();
  scroller.scrollTo({ top: 0, behavior: 'smooth' });
}




/* ===== DETAIL 페이지 ===== */

// 구매하기 모달
function openPurchaseModal() {
  const modal = document.getElementById('purchaseModal');
  const content = modal.querySelector('.modal-content');
  
  // 원래 스타일로 복원
  content.style.width = '390px';
  content.style.maxWidth = '390px';
  
  modal.classList.add('active');
}

function closePurchaseModal() {
  document.getElementById('purchaseModal').classList.remove('active');
}

// 탭 전환
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

// Main ↔ Detail 전환
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