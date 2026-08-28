document.querySelectorAll('[data-tabs]').forEach(group=>{
  const activate=button=>{
    const key=button.dataset.tab;
    group.querySelectorAll('[data-tab]').forEach(x=>{
      const active=x===button;
      x.classList.toggle('active',active);
      if(x.getAttribute('role')==='tab')x.setAttribute('aria-selected',String(active));
    });
    group.querySelectorAll('[data-panel]').forEach(x=>x.hidden=x.dataset.panel!==key);
  };
  const tabs=[...group.querySelectorAll('[data-tab]')];
  if(group.hasAttribute('data-random-tab')&&tabs.length)activate(tabs[Math.floor(Math.random()*tabs.length)]);
  group.addEventListener('click',event=>{
    const button=event.target.closest('[data-tab]'); if(!button)return;
    activate(button);
  });
});

document.querySelectorAll('[data-dialog]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.dialog)?.showModal()));
document.querySelectorAll('.dialog-close').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));

document.querySelectorAll('[data-product-gallery]').forEach(gallery=>{
  const images=JSON.parse(gallery.dataset.galleryImages||'[]');
  const main=gallery.querySelector('.product-gallery-main');
  const counter=gallery.querySelector('.gallery-counter b');
  const thumbs=[...gallery.querySelectorAll('[data-gallery-index]')];
  const productName=gallery.dataset.galleryName||'商品';
  let index=0;
  let timer;
  const show=next=>{
    if(!images.length||!main)return;
    index=(next+images.length)%images.length;
    main.src=images[index];
    main.alt=`${productName} 商品画像 ${index+1}`;
    main.animate([{opacity:.35},{opacity:1}],{duration:420,easing:'ease-out'});
    if(counter)counter.textContent=String(index+1);
    thumbs.forEach(item=>item.classList.toggle('active',Number(item.dataset.galleryIndex)===index));
  };
  const stop=()=>clearInterval(timer);
  const start=()=>{
    stop();
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)timer=setInterval(()=>show(index+1),6000);
  };
  thumbs.forEach(button=>button.addEventListener('click',()=>{show(Number(button.dataset.galleryIndex));start()}));
  gallery.querySelector('[data-gallery-prev]')?.addEventListener('click',()=>{show(index-1);start()});
  gallery.querySelector('[data-gallery-next]')?.addEventListener('click',()=>{show(index+1);start()});
  gallery.addEventListener('mouseenter',stop);
  gallery.addEventListener('mouseleave',start);
  gallery.addEventListener('focusin',stop);
  gallery.addEventListener('focusout',event=>{if(!gallery.contains(event.relatedTarget))start()});
  document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
  start();
});

const toast=document.getElementById('toast');
function showToast(message){toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2400)}
document.querySelectorAll('[data-toast]').forEach(button=>button.addEventListener('click',()=>showToast(button.dataset.toast)));
document.querySelectorAll('[data-favorite]').forEach(button=>button.addEventListener('click',()=>{button.classList.toggle('selected');button.textContent=button.classList.contains('selected')?'♥ お気に入り登録済み':'♡ お気に入りに追加';showToast('お気に入りを更新しました')}));
document.querySelectorAll('[data-demo-form]').forEach(form=>form.addEventListener('submit',event=>{event.preventDefault();showToast('デモのため送信せず、入力内容を確認しました')}));

document.querySelectorAll('[data-certification-year]').forEach(select=>{
  const rankSelect=document.querySelector('[data-certification-rank]');
  const cards=[...document.querySelectorAll('.certification-card')];
  const count=document.querySelector('[data-certification-result-count]');
  const update=()=>{
    let visible=0;
    cards.forEach(card=>{
      const label=card.querySelector('[data-certification-label]');
      const yearMatches=select.value==='all'||label.dataset.defaultYear===select.value;
      const rankMatches=!rankSelect||rankSelect.value==='all'||label.dataset.rank===rankSelect.value;
      card.hidden=!(yearMatches&&rankMatches);
      if(!card.hidden)visible++;
    });
    if(count)count.textContent=`${visible}件の商品`;
  };
  select.addEventListener('change',update);
  rankSelect?.addEventListener('change',update);
  update();
});

document.querySelectorAll('[data-search-filter]').forEach(form=>{
  const params=new URLSearchParams(location.search);
  [...form.elements].forEach(field=>{
    if(!field.name)return;
    if(field.type==='checkbox')field.checked=params.getAll(field.name).includes(field.value);
    else if(params.has(field.name))field.value=params.get(field.name);
  });
  const sort=document.querySelector('[data-search-sort]');
  if(sort&&params.has('sort'))sort.value=params.get('sort');
  sort?.addEventListener('change',()=>{params.set('sort',sort.value);params.delete('page');location.search=params.toString()});
  const summary=document.querySelector('[data-active-filters]');
  if(summary){
    params.forEach((value,key)=>{if(key!=='page'&&key!=='sort'&&value){const field=form.elements.namedItem(key);const label=field instanceof HTMLSelectElement&&field.selectedOptions[0]?field.selectedOptions[0].textContent:value;const chip=document.createElement('span');chip.className='filter-chip';chip.textContent=label;summary.append(chip)}});
  }
});

document.querySelectorAll('[data-review-images]').forEach(input=>{
  const preview=input.closest('form')?.querySelector('[data-review-image-preview]');
  input.addEventListener('change',()=>{
    const files=[...input.files];
    if(files.length>5){input.value='';if(preview)preview.innerHTML='<p>写真は最大5枚まで選択できます。</p>';return;}
    if(preview){preview.innerHTML='';files.forEach((file,index)=>{const figure=document.createElement('figure');const box=document.createElement('div');box.className='review-preview-placeholder';box.textContent=`写真 ${index+1}`;const caption=document.createElement('figcaption');caption.textContent=file.name;figure.append(box,caption);preview.append(figure)})}
  });
});

document.querySelectorAll('[data-history-list]').forEach(list=>{
  const empty=document.querySelector('[data-history-empty]');
  const refresh=()=>{const hasItems=!!list.querySelector('[data-history-item]');list.hidden=!hasItems;if(empty)empty.hidden=hasItems};
  list.addEventListener('click',event=>{const button=event.target.closest('[data-history-remove]');if(!button)return;button.closest('[data-history-item]')?.remove();refresh();showToast('閲覧履歴から削除しました')});
  document.querySelector('[data-history-clear]')?.addEventListener('click',()=>{list.innerHTML='';localStorage.removeItem('iimonoBrowsingHistory');refresh();showToast('閲覧履歴をすべて削除しました')});
  refresh();
});
