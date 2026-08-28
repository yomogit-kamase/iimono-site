(() => {
  const menuButton = document.querySelector('.common-menu-button');
  const globalNav = document.querySelector('.common-global-nav');
  const memberMenu = document.querySelector('.common-member-menu');
  const memberTrigger = memberMenu?.querySelector('.common-member-trigger');
  const memberPanel = memberMenu?.querySelector('.common-member-panel');

  menuButton?.addEventListener('click', () => {
    const open = !(menuButton.getAttribute('aria-expanded') === 'true');
    menuButton.setAttribute('aria-expanded', String(open));
    globalNav?.classList.toggle('open', open);
  });

  globalNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    globalNav.classList.remove('open');
  }));

  memberTrigger?.addEventListener('click', () => {
    const open = memberTrigger.getAttribute('aria-expanded') === 'true';
    memberTrigger.setAttribute('aria-expanded', String(!open));
    memberPanel.hidden = open;
  });

  document.addEventListener('click', event => {
    if (memberMenu && !memberMenu.contains(event.target)) {
      memberTrigger?.setAttribute('aria-expanded', 'false');
      if (memberPanel) memberPanel.hidden = true;
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    menuButton?.setAttribute('aria-expanded', 'false');
    globalNav?.classList.remove('open');
    memberTrigger?.setAttribute('aria-expanded', 'false');
    if (memberPanel) memberPanel.hidden = true;
  });
})();
