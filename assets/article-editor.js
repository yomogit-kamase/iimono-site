(() => {
  const root=document.querySelector('[data-article-editor]');
  if(!root)return;
  const initial=JSON.parse(root.querySelector('[data-article-seed]').textContent);
  let state=structuredClone(initial), pending=null;
  const status=root.querySelector('[data-article-status]');
  const host=root.querySelector('[data-article-sections]');
  const E=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const paragraph=text=>String(text||'').split('\n').filter(Boolean).map(p=>`<p>${E(p)}</p>`).join('');
  const message=text=>status.textContent=text;
  try{
    const saved=JSON.parse(localStorage.getItem(root.dataset.storageKey)||'null');
    if(saved&&saved.id===initial.id&&saved.kind===initial.kind&&Array.isArray(saved.sections)&&saved.sections.every(s=>Array.isArray(s.children)&&s.children.every(c=>Array.isArray(c.turns)))){
      state=saved;message('このブラウザに保存した下書きを復元しました。公開ページには未反映です。');
    }
  }catch{message('下書きを復元できなかったため、サンプルを表示しています。');}
  root.querySelectorAll('[data-article-field]').forEach(input=>input.value=state[input.dataset.articleField]||'');
  const button=(action,label,attrs='')=>`<button type="button" class="button" data-article-action="${action}" ${attrs}>${label}</button>`;
  const field=(label,key,value,attrs='',multiline=false)=>`<label class="field"><span>${label}</span>${multiline?`<textarea data-content-field="${key}" ${attrs} rows="3">${E(value)}</textarea>`:`<input data-content-field="${key}" ${attrs} value="${E(value)}">`}</label>`;
  const safeImageSrc=src=>/^\/(?!\/)/.test(src||'')||/^data:image\/(png|jpeg|webp);base64,/.test(src||'')?src:'';
  const figure=image=>image?.src&&safeImageSrc(image.src)?`<figure class="article-section-image"><img src="${E(safeImageSrc(image.src))}" alt="${E(image.alt)}">${image.caption?`<figcaption>${E(image.caption)}</figcaption>`:''}</figure>`:'';
  const imageFields=(label,image)=>`<div class="article-image-editor"><strong>${label}の画像（任意・1枚）</strong><p>JPEG・PNG・WebP／1枚5MBまで。元画像の縦横比を保って表示します。</p><label class="field"><span>${label} 画像を選択・差し替え</span><input type="file" data-section-image accept="image/jpeg,image/png,image/webp"></label>${image?.src?`${figure(image)}<label class="field"><span>${label} 画像の代替テキスト</span><input data-image-field="alt" value="${E(image.alt)}"></label><label class="field"><span>${label} 画像のキャプション</span><input data-image-field="caption" value="${E(image.caption)}"></label>${button('remove-image','画像を取り外す')}`:'<p>画像は未登録です。本文だけでも掲載できます。</p>'}</div>`;
  function render(){
    host.innerHTML=state.sections.map((section,s)=>`<section class="article-h2-editor" data-section="${s}"><header><h2>H2｜章 ${s+1}</h2><div class="article-block-actions">${button('up-h2','↑ 上へ',s===0?'disabled':'')}${button('down-h2','↓ 下へ',s===state.sections.length-1?'disabled':'')}${button('delete-h2','H2を削除')}</div></header>${field(`H2 ${s+1} 見出し`,'title',section.title)}${imageFields(`H2 ${s+1}`,section.image)}${field(`H2 ${s+1} 導入文`,'intro',section.intro,'',true)}<div class="article-h3-list">${section.children.map((child,c)=>`<section class="article-h3-editor" data-child="${c}"><header><h3>H3｜小見出し ${s+1}-${c+1}</h3><div class="article-block-actions">${button('up-h3','↑ 上へ',c===0?'disabled':'')}${button('down-h3','↓ 下へ',c===section.children.length-1?'disabled':'')}${button('delete-h3','H3を削除')}</div></header>${field(`H3 ${s+1}-${c+1} 見出し`,'title',child.title)}${imageFields(`H3 ${s+1}-${c+1}`,child.image)}${state.format==='dialogue'?`<div class="article-turn-list">${child.turns.map((turn,t)=>`<div class="article-turn-editor" data-turn="${t}"><div><strong>発言 ${t+1}</strong>${button('up-turn','↑',t===0?'disabled aria-label="発言を上へ"':'aria-label="発言を上へ"')}${button('down-turn','↓',t===child.turns.length-1?'disabled aria-label="発言を下へ"':'aria-label="発言を下へ"')}${button('delete-turn','発言を削除')}</div>${field(`話者 ${s+1}-${c+1}-${t+1}`,'speaker',turn.speaker)}${field(`発言 ${s+1}-${c+1}-${t+1}`,'text',turn.text,'',true)}</div>`).join('')}</div>${button('add-turn','＋ 発言を追加')}`:field(`H3 ${s+1}-${c+1} 本文`,'body',child.body,'',true)}</section>`).join('')}</div>${button('add-h3','＋ H3を追加')}</section>`).join('');
    if(!state.sections.length)host.innerHTML='<p class="notice-box">章がありません。「H2を追加」から作成してください。</p>';
  }
  function locate(element){
    const s=Number(element.closest('[data-section]')?.dataset.section);
    const c=Number(element.closest('[data-child]')?.dataset.child);
    const t=Number(element.closest('[data-turn]')?.dataset.turn);
    return {s,c,t};
  }
  root.addEventListener('input',event=>{
    const input=event.target;
    if(input.dataset.imageField){
      const {s,c}=locate(input);
      const target=Number.isNaN(c)?state.sections[s]:state.sections[s].children[c];
      if(target.image)target.image[input.dataset.imageField]=input.value;
      message('画像の説明を変更しました。下書きを保存してください。');
    }
    if(input.dataset.articleField){state[input.dataset.articleField]=input.value;message('未保存の変更があります。');}
    if(input.dataset.contentField){
      const {s,c,t}=locate(input);
      const section=state.sections[s];
      const target=Number.isNaN(c)?section:Number.isNaN(t)?section.children[c]:section.children[c].turns[t];
      target[input.dataset.contentField]=input.value;message('未保存の変更があります。');
    }
  });
  root.addEventListener('change',event=>{
    const input=event.target;
    if(!input.hasAttribute('data-section-image'))return;
    const file=input.files?.[0];if(!file)return;
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>5*1024*1024){message('JPEG・PNG・WebPの5MB以下の画像を選んでください。');input.value='';return;}
    const {s,c}=locate(input);
    const target=Number.isNaN(c)?state.sections[s]:state.sections[s].children[c];
    const reader=new FileReader();
    reader.onerror=()=>message('画像を読み込めませんでした。別の画像を選んでください。');
    reader.onload=()=>{
      if(!root.contains(input))return;
      const src=String(reader.result);
      const check=new Image();
      check.onerror=()=>message('画像として読み込めませんでした。ファイルを確認してください。');
      check.onload=()=>{
        if(!root.contains(input))return;
        target.image={src,alt:target.image?.alt||'',caption:target.image?.caption||''};
        render();message('画像を登録しました。代替テキストを入力し、下書きを保存してください。公開サイトには未反映です。');
      };
      check.src=src;
    };
    reader.readAsDataURL(file);
  });
  root.querySelector('[data-article-field="format"]').addEventListener('change',event=>{
    state.format=event.target.value;render();message('形式を変更しました。非表示の本文・発言も下書きに保持しています。');
  });
  const preview=root.querySelector('[data-article-preview]');
  const deletion=root.querySelector('[data-article-delete]');
  deletion.addEventListener('close',()=>pending=null);
  function validate(){
    if(!state.title.trim())return '記事タイトルを入力してください。';
    if(state.kind==='pr'&&!state.advertiser.trim())return '広告主名を入力してください。';
    if(!state.sections.length)return 'H2を1つ以上追加してください。';
    for(const [s,section] of state.sections.entries()){
      if(!section.title.trim())return `H2 ${s+1} の見出しを入力してください。`;
      if(section.image?.src&&!section.image.alt?.trim())return `H2 ${s+1} の画像の代替テキストを入力してください。`;
      for(const [c,child] of section.children.entries()){
        if(!child.title.trim())return `H3 ${s+1}-${c+1} の見出しを入力してください。`;
        if(child.image?.src&&!child.image.alt?.trim())return `H3 ${s+1}-${c+1} の画像の代替テキストを入力してください。`;
        if(state.format==='dialogue'&&(!child.turns.length||child.turns.some(t=>!t.speaker.trim()||!t.text.trim())))return `H3 ${s+1}-${c+1} の話者・発言を入力してください。`;
      }
    }
    return '';
  }
  const move=(items,index,delta)=>{const next=index+delta;if(next>=0&&next<items.length)[items[index],items[next]]=[items[next],items[index]];};
  root.addEventListener('click',event=>{
    const trigger=event.target.closest('[data-article-action]');if(!trigger)return;
    const action=trigger.dataset.articleAction;
    const {s,c,t}=locate(trigger);
    if(action==='remove-image'){
      const target=Number.isNaN(c)?state.sections[s]:state.sections[s].children[c];
      delete target.image;render();message('記事から画像を取り外しました。元の画像ファイルは削除していません。');return;
    }
    if(action==='save'){
      try{localStorage.setItem(root.dataset.storageKey,JSON.stringify(state));message('このブラウザに下書きを保存しました。公開サイトには反映されません。');}
      catch{message('保存できませんでした。ブラウザの保存容量・設定を確認してください。');}return;
    }
    if(action==='preview'){
      const error=validate();if(error){message(error);return;}
      const outline=state.sections.map((section,i)=>`<li>${E(section.title)}<ol>${section.children.map(child=>`<li>${E(child.title)}</li>`).join('')}</ol></li>`).join('');
      preview.querySelector('.article-preview-content').innerHTML=`<p>${state.kind==='pr'?'<span class="pr-mark">PR</span> 広告主：'+E(state.advertiser):'商品紹介'}</p><h1>${E(state.title)}</h1><nav class="editorial-toc" aria-label="目次プレビュー"><h2>目次</h2><ol>${outline}</ol></nav>${state.sections.map(section=>`<section class="structured-article-section"><h2>${E(section.title)}</h2>${figure(section.image)}${paragraph(section.intro)}${section.children.map(child=>`<section><h3>${E(child.title)}</h3>${figure(child.image)}${state.format==='dialogue'?`<div class="article-dialogue">${child.turns.map((turn,k)=>`<div class="dialogue-turn ${k%2?'answer':'question'}"><div class="dialogue-speaker"><span aria-hidden="true">${E(turn.speaker.slice(0,1))}</span><strong>${E(turn.speaker)}</strong></div><div class="dialogue-text">${paragraph(turn.text)}</div></div>`).join('')}</div>`:paragraph(child.body)}</section>`).join('')}</section>`).join('')}`;
      preview.showModal();return;
    }
    if(action==='close-preview'){preview.close();return;}
    if(action==='cancel-delete'){deletion.close();return;}
    if(action==='confirm-delete'){
      if(pending){const {s,c,t,action}=pending;if(action==='delete-h2')state.sections.splice(s,1);else if(action==='delete-h3')state.sections[s].children.splice(c,1);else state.sections[s].children[c].turns.splice(t,1);}
      deletion.close();render();message('削除しました。下書き保存前の変更です。');root.querySelector('[data-article-action="add-h2"]').focus();return;
    }
    if(action.startsWith('delete-')){
      pending={s,c,t,action};root.querySelector('[data-delete-message]').textContent=action==='delete-h2'?`章「${state.sections[s].title||'未入力'}」と、その配下のH3・本文・すべての発言を削除します。`:action==='delete-h3'?'このH3と、その本文・すべての発言を削除します。':'この発言を削除します。';deletion.showModal();return;
    }
    if(action==='add-h2')state.sections.push({title:'',intro:'',children:[]});
    if(action==='add-h3')state.sections[s].children.push({title:'',body:'',turns:[]});
    if(action==='add-turn')state.sections[s].children[c].turns.push({speaker:'',text:''});
    if(action==='up-h2'||action==='down-h2')move(state.sections,s,action==='up-h2'?-1:1);
    if(action==='up-h3'||action==='down-h3')move(state.sections[s].children,c,action==='up-h3'?-1:1);
    if(action==='up-turn'||action==='down-turn')move(state.sections[s].children[c].turns,t,action==='up-turn'?-1:1);
    render();message('構成を変更しました。下書きを保存してください。');
    if(action==='add-h2')host.lastElementChild?.querySelector('input')?.focus();
    if(action==='add-h3')host.children[s]?.querySelector('.article-h3-list')?.lastElementChild?.querySelector('input')?.focus();
  });
  render();
})();
