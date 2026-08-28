const toast = document.querySelector(".toast") || (() => {
  const node = document.createElement("div");
  node.className = "toast";
  node.setAttribute("role", "status");
  document.body.appendChild(node);
  return node;
})();

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2400);
}

document.querySelector(".nav-toggle")?.addEventListener("click", (event) => {
  const nav = document.querySelector(".main-nav");
  nav?.classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", nav?.classList.contains("open") ? "true" : "false");
});

document.querySelectorAll("[data-search-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = new FormData(form).get("q")?.toString().trim() || "";
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
  });
});

const favoriteKey = "iimono-prototype-favorites";
const favorites = new Set(JSON.parse(localStorage.getItem(favoriteKey) || "[]"));
document.querySelectorAll("[data-favorite]").forEach((button) => {
  const id = button.dataset.favorite;
  if (favorites.has(id)) button.classList.add("active");
  button.setAttribute("aria-pressed", favorites.has(id) ? "true" : "false");
  button.addEventListener("click", () => {
    if (favorites.has(id)) {
      favorites.delete(id);
      button.classList.remove("active");
      notify("お気に入りから外しました");
    } else {
      favorites.add(id);
      button.classList.add("active");
      notify("お気に入りに追加しました");
    }
    button.setAttribute("aria-pressed", favorites.has(id) ? "true" : "false");
    localStorage.setItem(favoriteKey, JSON.stringify([...favorites]));
  });
});

function applyFilters() {
  const checked = [...document.querySelectorAll("[data-filter]:checked")].map((input) => input.value);
  document.querySelectorAll("[data-product-card]").forEach((card) => {
    const tags = card.dataset.tags?.split(" ") || [];
    card.hidden = checked.length > 0 && !checked.every((item) => tags.includes(item));
  });
  const count = [...document.querySelectorAll("[data-product-card]")].filter((card) => !card.hidden).length;
  const countNode = document.querySelector("[data-result-count]");
  if (countNode) countNode.textContent = `${count}件`;
}

document.querySelectorAll("[data-filter]").forEach((control) => control.addEventListener("change", applyFilters));
const requestedQuery = new URLSearchParams(window.location.search).get("q");
if (requestedQuery) {
  document.querySelectorAll('input[name="q"]').forEach((input) => { input.value = requestedQuery; });
  const label = document.querySelector("[data-query-label]");
  if (label) label.textContent = `「${requestedQuery}」の検索結果`;
}

document.querySelectorAll("[data-thumb]").forEach((button) => {
  button.addEventListener("click", () => {
    const main = document.querySelector("[data-main-image]");
    if (main) {
      main.src = button.dataset.thumb;
      main.alt = button.querySelector("img")?.alt || "商品画像";
    }
    document.querySelectorAll("[data-thumb]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

document.querySelectorAll("[data-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;
    document.querySelectorAll("[data-tab]").forEach((item) => item.classList.toggle("active", item === button));
    document.querySelectorAll("[data-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === target));
  });
});

document.querySelector("[data-newsletter]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  notify("メールマガジン登録を受け付けました（デモ）");
  event.currentTarget.reset();
});

document.querySelector("[data-run-ai]")?.addEventListener("click", (event) => {
  event.currentTarget.disabled = true;
  event.currentTarget.textContent = "探索中…";
  window.setTimeout(() => {
    document.querySelectorAll(".pipeline-step").forEach((step, index) => {
      step.classList.toggle("done", index < 2);
      step.classList.toggle("current", index === 2);
    });
    event.currentTarget.disabled = false;
    event.currentTarget.textContent = "商品リサーチを実行";
    notify("デモ：12件の商品候補を取得しました");
  }, 900);
});

document.querySelectorAll("[data-approve]").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest("tr");
    const status = row?.querySelector(".status");
    if (status) {
      status.textContent = "記事生成待ち";
      status.className = "status ok";
    }
    button.textContent = "承認済み";
    button.disabled = true;
    notify("候補を承認し、記事生成キューへ追加しました");
  });
});

const imageFallback='data:image/svg+xml;charset=UTF-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="#e9dfd0"/><path d="M390 520l150-170 105 112 78-82 117 140H390z" fill="#cfc3b2"/><circle cx="710" cy="275" r="46" fill="#cfc3b2"/><text x="600" y="650" text-anchor="middle" font-family="serif" font-size="34" fill="#655d55">画像を準備中です</text></svg>');
document.querySelectorAll('img').forEach(image=>image.addEventListener('error',()=>{
  if(image.src!==imageFallback){image.src=imageFallback;image.dataset.imageFallback='true'}
},{once:true}));
document.querySelectorAll('[data-action]').forEach(button=>button.addEventListener('click',()=>notify('デモ操作を受け付けました')));
document.querySelectorAll('[data-quiz]').forEach(quiz=>{
  const steps=[...quiz.querySelectorAll('[data-quiz-step]')];
  const progress=document.querySelector('[data-quiz-progress]');
  const show=index=>{steps.forEach((step,i)=>step.hidden=i!==index);if(progress)progress.style.width=((index+1)/steps.length*100)+'%'};
  steps.forEach((step,index)=>{
    step.querySelectorAll('[data-choice]').forEach(button=>button.addEventListener('click',()=>{
      step.querySelectorAll('[data-choice]').forEach(x=>x.classList.remove('selected'));
      button.classList.add('selected');
      const next=step.querySelector('[data-quiz-next]');if(next)next.disabled=false;
      const result=step.querySelector('[data-quiz-result]');if(result){result.classList.remove('disabled');result.setAttribute('aria-disabled','false')}
    }));
    step.querySelector('[data-quiz-next]')?.addEventListener('click',()=>show(index+1));
    step.querySelector('[data-quiz-back]')?.addEventListener('click',()=>show(index-1));
  });
});
document.querySelectorAll('[data-demo-form]').forEach(form=>form.addEventListener('submit',event=>{event.preventDefault();notify('入力内容を受け付けました（デモ）')}));
document.querySelectorAll('[data-chip-filter]').forEach(chip=>chip.addEventListener('click',()=>{
  document.querySelectorAll('[data-chip-filter]').forEach(x=>x.classList.remove('active'));chip.classList.add('active');
  const filter=chip.dataset.chipFilter;let count=0;
  document.querySelectorAll('[data-product-card]').forEach(card=>{const show=filter==='all'||(card.dataset.tags||'').split(' ').includes(filter);card.hidden=!show;if(show)count++});
  const counter=document.querySelector('[data-result-count]');if(counter)counter.textContent=count+'件';notify('表示条件を切り替えました');
}));
const renderFavorites=()=>{
  const page=document.querySelector('[data-favorites-page]');if(!page)return;
  const saved=new Set(JSON.parse(localStorage.getItem('iimono-prototype-favorites')||'[]'));let count=0;
  page.querySelectorAll('[data-product-card]').forEach(card=>{const id=card.querySelector('[data-favorite]')?.dataset.favorite;const show=saved.has(id);card.hidden=!show;if(show)count++});
  const counter=page.querySelector('[data-favorites-count]');if(counter)counter.textContent=String(count);
  const empty=page.querySelector('[data-favorites-empty]');if(empty)empty.hidden=count>0;
};
renderFavorites();document.querySelectorAll('[data-favorites-page] [data-favorite]').forEach(button=>button.addEventListener('click',renderFavorites));
const compareKey='iimono-prototype-compare';
document.querySelectorAll('[data-compare]').forEach(button=>button.addEventListener('click',()=>{
  const saved=new Set(JSON.parse(localStorage.getItem(compareKey)||'[]'));const id=button.dataset.compare;
  if(saved.has(id)){saved.delete(id);button.textContent='＋ 比較に追加';notify('比較から外しました')}else if(saved.size<4){saved.add(id);button.textContent='比較に追加済み';notify('比較に追加しました')}else{notify('比較できる商品は最大4件です')}
  localStorage.setItem(compareKey,JSON.stringify([...saved]));
}));
const comparePage=document.querySelector('[data-compare-page]');if(comparePage){const update=()=>{const count=JSON.parse(localStorage.getItem(compareKey)||'[]').length;const status=comparePage.querySelector('[data-compare-status]');if(status)status.textContent=count+' / 4件'};update();comparePage.querySelector('[data-clear-compare]')?.addEventListener('click',()=>{localStorage.removeItem(compareKey);update();notify('比較をクリアしました')})}
const semanticActionControls=document.querySelectorAll('button[type="submit"],input[type="submit"],a.bg-primary,a.bg-secondary,button.bg-primary,button.bg-secondary,a[class*="border-secondary"],.button,.mini-button,.pictogram-button,[data-action]');
semanticActionControls.forEach(control=>{
  if(control.dataset.buttonRole)return;
  const label=(control.textContent||control.value||control.getAttribute('aria-label')||'').replace(/\s+/g,' ').trim();
  let role='outline';
  if(control.classList.contains('pictogram-button'))role='secondary';
  else if(/承認|公開|保存|完了|採用/.test(label))role='success';
  else if(/削除|退会|取消|破棄/.test(label))role='danger';
  else if(/差し戻し|保留|警告|要確認/.test(label))role='warning';
  else if(control.matches('.bg-primary,.button.primary,button[type="submit"],input[type="submit"]')||/検索|購入|診断スタート|投稿|申し込|登録する|送信|公式サイト/.test(label))role='primary';
  else if(control.matches('.bg-secondary,.button.dark')||/ランキングを見る|仕組みを見る|次へ/.test(label))role='secondary';
  control.dataset.buttonRole=role;
});
document.querySelectorAll('[data-wizard]').forEach(wizard=>{
  const steps=[...wizard.querySelectorAll('[data-wizard-step]')];const show=index=>steps.forEach((step,i)=>step.hidden=i!==index);
  steps.forEach((step,index)=>{step.querySelector('[data-wizard-next]')?.addEventListener('click',()=>show(index+1));step.querySelector('[data-wizard-back]')?.addEventListener('click',()=>show(index-1))});
  wizard.addEventListener('submit',event=>{event.preventDefault();notify('申請を受け付けました（デモ）')});
});
