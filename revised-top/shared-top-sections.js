(() => {
  const mount = document.querySelector('[data-shared-top-sections]');
  if (!mount) return;

  const products = {
    monthly: [
      ['../iimono-site/full-site/assets/images/ii-mo-no/fruit-jelly.jpg','食品・スイーツ','果実を味わう、フルーツミックスゼリー','¥3,240','季節感と甘酸味のバランスが秀逸です。','果実ごとの食感と香りを残して仕上げました。','夏の贈り物として見た目にも涼やかな一品です。'],
      ['https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=720&q=88','食品・飲料','香りをひらく、山の煎茶','¥2,160','甘み、渋み、余韻のバランスに優れています。','山の寒暖差がつくる香りを残しました。','温度による味の変化も楽しめる日本茶です。'],
      ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=720&q=88','ファッション・服飾','使うほどになじむ、帆布のデイパック','¥9,800','荷重が分散され、日常使いしやすい設計です。','織りの表情が残る国産帆布を選びました。','仕事と休日の両方で使いやすい定番です。'],
      ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=720&q=88','美容・ケア','森の香りをまとう、ハンドバーム','¥3,080','べたつきを抑えながら保湿感が続きます。','北海道の植物素材を生かして調香しました。','持ち歩きやすく、贈り物にも向く一品です。']
    ],
    attention: [
      ['../iimono-site/full-site/assets/images/ii-mo-no/thank-you-pudding.jpg','食品・スイーツ','感謝を贈る、ありがとうプリン','¥3,480','卵の風味と口当たりのバランスが良好です。','幅広い世代が楽しめる甘さに整えました。','気持ちを伝える贈り物として選びやすい商品です。'],
      ['https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=720&q=88','生活雑貨・インテリア','毎日の料理を受け止める、白磁の器','¥4,400','盛り付けやすさと収納性を両立しています。','料理を引き立てる白と薄さを追求しました。','和洋を問わず日常使いしやすい器です。'],
      ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=720&q=88','家電・デジタル','生活になじむ、小さなオーディオ','¥12,800','小型ながら声と楽器の輪郭を自然に再現します。','置く場所を選ばない操作性を大切にしました。','初めての一台として検討しやすいモデルです。'],
      ['https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=720&q=88','工芸品・地域産品','一輪を美しく見せる、手仕事の花器','¥6,600','素材の表情と安定感を両立しています。','ろくろ目を残し、一点ごとの違いを生かしました。','花を生けない時間も佇まいを楽しめます。']
    ],
    certified: [
      ['../iimono-site/full-site/assets/images/ii-mo-no/tigre-assort.jpg','食品・スイーツ','香ばしい、ティグレアソート','¥2,880','中心のしっとり感に焼成技術の確かさを感じます。','生地とチョコの香りが重なるよう仕上げました。','個包装で分けやすい認証商品です。'],
      ['../iimono-site/full-site/assets/images/ii-mo-no/dorayaki.jpg','食品・スイーツ','毎日食べたくなる、老舗のどら焼き','¥2,400','生地のきめと餡の水分量が良好です。','銅板で一枚ずつ焼き上げています。','素材と製法を確認できる定番菓子です。'],
      ['../iimono-site/full-site/assets/images/ii-mo-no/brandy-cake.jpg','食品・スイーツ','芳醇に香る、ブランデーケーキ','¥4,280','香りと甘みが釣り合い、余韻が続きます。','時間とともに深まる味を目指しました。','少しずつ味わいたい大人向けの一品です。'],
      ['../iimono-site/full-site/assets/images/ii-mo-no/bonbon-chocolat.jpg','食品・スイーツ','一粒ずつ味わう、ボンボンショコラ','¥3,800','口どけの温度設計に専門性を感じます。','一粒ごとに香りの順序を設計しました。','箱を開く時間まで楽しめる認証商品です。']
    ]
  };

  const commentMarkup = product => `
    <div class="u-comment-source" hidden>
      <p data-kind="expert"><b>専門家</b>${product[4]}</p>
      <p data-kind="producer"><b>生産者</b>${product[5]}</p>
      <p data-kind="editorial"><b>編集部</b>${product[6]}</p>
    </div>`;

  const productCard = (product, badge = '') => `
    <article class="u-product-card">
      <a class="u-product-image" href="../product.html"><img src="${product[0]}" alt="${product[2]}">${badge ? `<span>${badge}</span>` : ''}</a>
      <div class="u-product-copy"><p>${product[1]}</p><h3>${product[2]}</h3><strong>${product[3]} <small>税込</small></strong></div>
      ${commentMarkup(product)}
      <a class="u-product-link" href="../product.html">商品と購入先を見る <span>→</span></a>
    </article>`;

  const categories = [
    ['../iimono-site/full-site/assets/images/ii-mo-no/fruit-jelly.jpg','食品・スイーツ'],
    ['https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=640&q=88','ファッション・服飾'],
    ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=640&q=88','美容・ケア'],
    ['https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=640&q=88','生活雑貨・インテリア'],
    ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=640&q=88','家電・デジタル'],
    ['https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=640&q=88','工芸品・地域産品']
  ];
  const sweets = [
    ['../iimono-site/full-site/assets/images/ii-mo-no/fruit-jelly.jpg','ゼリー・涼菓'],
    ['../iimono-site/full-site/assets/images/ii-mo-no/tigre-assort.jpg','焼き菓子'],
    ['../iimono-site/full-site/assets/images/ii-mo-no/dorayaki.jpg','和菓子'],
    ['../iimono-site/full-site/assets/images/ii-mo-no/bonbon-chocolat.jpg','チョコレート'],
    ['../iimono-site/full-site/assets/images/ii-mo-no/thank-you-pudding.jpg','プリン・生菓子'],
    ['../iimono-site/full-site/assets/images/ii-mo-no/brandy-cake.jpg','ケーキ']
  ];
  const categoryCards = list => list.map(item => `<a href="../search.html"><img src="${item[0]}" alt="${item[1]}"><span>${item[1]}</span></a>`).join('');

  const producers = [
    ['assets/people/producer-ceramic.png','山本 和弘','有田・山本窯 三代目','毎日手に取れる軽さと、料理を受け止める白にこだわりました。',products.attention[1]],
    ['assets/people/producer-tea.png','高橋 雅人','静岡・高橋茶園 園主','山の寒暖差がつくる香りを残すため、蒸し方を調整しています。',products.monthly[1]],
    ['assets/people/producer-botanical.png','森田 梓','北海道・植物製品工房','森を思い出せるよう、枝葉の青さまで感じる香りに整えました。',products.monthly[3]],
    ['assets/people/producer-canvas.png','佐々木 隆','倉敷・帆布工房','使い込むほど手になじみ、その人だけの表情になる帆布です。',products.monthly[2]]
  ];
  const experts = [
    ['assets/people/expert-pastry.png','鈴木 雅人','パティシエ','外側の香ばしさと中心のしっとり感に、焼成技術の確かさを感じます。',products.certified[0]],
    ['assets/people/expert-wagashi.png','佐藤 和子','和菓子職人','見た目と甘酸味のバランスがよく、季節感の伝わる涼菓です。',products.monthly[0]],
    ['assets/people/expert-writer.png','山田 美咲','フードライター','口どけの設計がよく、それぞれの風味が輪郭を失わず広がります。',products.certified[3]],
    ['assets/people/expert-science.png','田中 健一','食品科学者','生地のきめと餡の水分量がよく、完成度の高い定番菓子です。',products.certified[1]]
  ];
  const personCards = (list, kind) => list.map(person => `<article class="u-person-card"><div class="u-person-profile"><img src="${person[0]}" alt="${kind} ${person[1]}"><div><span>${kind}</span><h3>${person[1]}</h3><small>${person[2]}</small></div></div><blockquote>「${person[3]}」</blockquote><a href="../product.html"><img src="${person[4][0]}" alt="${person[4][2]}"><span><small>${kind === '生産者' ? 'この人の商品' : '評価した商品'}</small><strong>${person[4][2]}</strong><b>${person[4][3]} 税込</b></span><i>→</i></a></article>`).join('');

  const sectionHead = (title, description = '', action = '', logic = '') => `<header class="u-section-head"><div><div class="u-title-row"><h2>${title}</h2>${logic ? `<button class="u-logic" type="button" data-logic="${logic}">表示ロジック</button>` : ''}</div>${description ? `<p>${description}</p>` : ''}</div>${action}</header>`;

  mount.innerHTML = `
    <section class="u-section u-categories" id="categories">
      ${sectionHead('カテゴリから探す','食品、暮らしの道具、ファッションなど、商品ジャンルから探せます。',`<a href="../search.html">すべて見る →</a>`)}
      <div class="u-category-toggle" role="group" aria-label="カテゴリ表示の切り替え"><button class="is-active" type="button" data-category="all">複数カテゴリ</button><button type="button" data-category="sweets">スイーツのみ</button></div>
      <div class="u-category-grid" data-category-panel="all">${categoryCards(categories)}</div>
      <div class="u-category-grid" data-category-panel="sweets" hidden>${categoryCards(sweets)}</div>
    </section>
    <section class="u-section u-products-section" id="products">
      ${sectionHead('今月のいいモノ','季節や暮らしのテーマに合わせて、編集部が今月選んだ商品を紹介します。',`<a href="../search.html">今月の選品をすべて見る →</a>`,'monthly')}
      <div class="u-product-row" tabindex="0">${products.monthly.map(p => productCard(p)).join('')}</div>
    </section>
    <section class="u-section u-people-section u-producers" id="producer-picks">
      ${sectionHead('つくり手から選ぶ','素材や技術、ものづくりに込めた考えを、つくり手の言葉とともに紹介します。',`<a href="../search.html">すべてのつくり手を見る →</a>`)}
      <div class="u-people-grid">${personCards(producers,'生産者')}</div>
    </section>
    <section class="u-section u-people-section u-experts" id="expert-picks">
      ${sectionHead('専門家の視点から選ぶ','専門分野から見た評価や着眼点を、商品とともに紹介します。',`<a href="../search.html">すべての専門家を見る →</a>`,'expert')}
      <div class="u-people-grid">${personCards(experts,'専門家')}</div>
    </section>
    <section class="u-section u-attention" id="attention">
      ${sectionHead('注目のいいモノ','新しいコメントや記事など、情報が更新された商品を紹介します。', '', 'attention')}
      <div class="u-product-row" tabindex="0">${products.attention.map(p => productCard(p)).join('')}</div>
    </section>
    <section class="u-section u-certified" id="featured">
      ${sectionHead('いいモノ認証セレクション','いいモノ認証機関による認証を、公開情報で確認できる商品を紹介します。','', 'certification')}
      <div class="u-product-row" tabindex="0">${products.certified.map(p => productCard(p,'認証商品')).join('')}</div>
    </section>
    <section class="u-section u-editorial" id="editorial">
      ${sectionHead('特集','季節や用途、贈る場面に合わせて、選ぶときに知りたいポイントを整理しました。','', 'feature')}
      <div class="u-article-grid">
        <article><a href="../article.html"><img src="../iimono-site/full-site/assets/images/ii-mo-no/summer-sweets-mv.jpg" alt="夏に贈りたい涼やかな菓子"></a><div><p>季節の贈り物</p><h3>夏に贈りたい、涼やかな菓子</h3><span>味わい、日持ち、届け方から選ぶポイントを紹介します。</span><a href="../article.html">記事を読む →</a></div></article>
        <article><a href="../article.html"><img src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=88" alt="白い器の選び方"></a><div><p>暮らしの道具</p><h3>毎日使いたくなる、白い器の選び方</h3><span>形、重さ、収納性から、日常の使いやすさを整理します。</span><a href="../article.html">記事を読む →</a></div></article>
        <article><a href="../article.html"><img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=88" alt="小型オーディオの選び方"></a><div><p>家電・デジタル</p><h3>部屋になじむ、小型オーディオ</h3><span>サイズ、音の特徴、置き場所から自分に合う一台を探します。</span><a href="../article.html">記事を読む →</a></div></article>
      </div>
    </section>
    <section class="u-section u-areas" id="areas">
      ${sectionHead('エリアから探す','生産地やブランドがものづくりを続ける地域から商品を探せます。')}
      <div class="u-area-grid">
        ${[['sDkRuHQ-r1s','北海道'],['J-iWe0IBKwM','東北'],['MBfKkA2V4PI','関東'],['-ROA3IS-blY','北陸・甲信越'],['twiQoIuBIBM','東海'],['Ul5nQ-0zCdE','近畿'],['5nmKOTKnkc0','中国・四国'],['g7Y1TgK-vhU','九州・沖縄']].map((area,index)=>`<a href="../search.html"><img src="https://unsplash.com/photos/${area[0]}/download?force=true&w=900" alt="${area[1]}の風景"><div><b>${area[1]}</b><span>${18 + index * 4}商品</span></div></a>`).join('')}
      </div>
    </section>
    <section class="u-promise" id="promise"><div><p>いいモノの選定基準</p><h2>選ぶ理由を、<br>確かな情報とともに。</h2></div><p>商品の品質や特徴、つくり手の情報を、公式情報と編集部の確認をもとに整理します。認証情報、専門家の評価、利用者の声が確認できる場合は、出典を明記して紹介します。</p><a href="../article.html">選定基準を詳しく見る →</a></section>
    <dialog class="u-logic-dialog"><button class="u-dialog-close" type="button" aria-label="閉じる">×</button><small>デモサイト・表示ルール</small><h2></h2><div></div><button class="u-dialog-confirm" type="button">閉じる</button></dialog>`;

  document.querySelectorAll('.u-product-card').forEach((card, cardIndex) => {
    const source = card.querySelector('.u-comment-source');
    const entries = [...source.querySelectorAll('p')];
    const viewer = document.createElement('div');
    viewer.className = 'u-comment-viewer';
    const tabs = document.createElement('div');
    tabs.className = 'u-comment-tabs';
    tabs.setAttribute('role','tablist');
    const panel = document.createElement('p');
    panel.className = 'u-comment-panel';
    const activate = index => {
      [...tabs.children].forEach((button, i) => button.setAttribute('aria-selected', String(i === index)));
      panel.textContent = entries[index].textContent.replace(entries[index].querySelector('b').textContent,'').trim();
      panel.dataset.kind = entries[index].dataset.kind;
    };
    entries.forEach((entry, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('role','tab');
      button.dataset.kind = entry.dataset.kind;
      button.textContent = entry.querySelector('b').textContent;
      button.addEventListener('click', () => activate(index));
      tabs.append(button);
    });
    viewer.append(tabs,panel);
    source.replaceWith(viewer);
    activate(Math.floor(Math.random() * entries.length));
    card.dataset.cardIndex = cardIndex;
  });

  document.querySelectorAll('.u-category-toggle button').forEach(button => button.addEventListener('click', () => {
    const selected = button.dataset.category;
    document.querySelectorAll('.u-category-toggle button').forEach(item => item.classList.toggle('is-active', item === button));
    document.querySelectorAll('[data-category-panel]').forEach(panel => panel.hidden = panel.dataset.categoryPanel !== selected);
  }));

  const logic = {
    monthly:['「今月のいいモノ」の表示ロジック','季節や暮らしのテーマに合わせて、編集部が月単位で選びます。月内は基本的に商品を固定します。'],
    expert:['「専門家の視点から選ぶ」の表示ロジック','公開できる専門家コメントが一定数そろい、氏名・専門分野・対象商品を確認できる場合に表示します。初期運用では非表示にできます。'],
    attention:['「注目のいいモノ」の表示ロジック','コメント、口コミ、編集部記事などの商品情報に更新があった商品を優先して表示します。'],
    certification:['「認証セレクション」の表示ロジック','いいモノ認証機関による認証の事実と、現在購入できることを確認できる商品を表示します。'],
    feature:['「特集」の表示ロジック','編集部が任意のテーマで特集記事を作成し、公開設定にしたときに追加します。']
  };
  const dialog = mount.querySelector('.u-logic-dialog');
  mount.querySelectorAll('.u-logic').forEach(button => button.addEventListener('click', () => {
    const content = logic[button.dataset.logic];
    dialog.querySelector('h2').textContent = content[0];
    dialog.querySelector('div').textContent = content[1];
    dialog.showModal();
  }));
  dialog.querySelectorAll('.u-dialog-close,.u-dialog-confirm').forEach(button => button.addEventListener('click', () => dialog.close()));
})();
