const teamLink = document.getElementById('our-team-btn');
const teamBackdrop = document.querySelector('.team');
const teamCloseBtn = document.querySelector('.team-close-btn');
const bodyElement = document.querySelector('body');

teamLink.addEventListener('click', onLinkClick);

function onLinkClick(event) {
  event.preventDefault();

  teamBackdrop.classList.remove('is-closed');
  document.body.classList.add('modal-open');

  addAllEventListeners();
}

function onEscClick(event) {
  event.preventDefault();

  if (event.code !== 'Escape') {
    return;
  }

  closingModalStaff();
}

function onBackdropClick(event) {
  if (event.target.closest('.team-window')) {
    return;
  }

  closingModalStaff();
}

function onCloseBtnClick(event) {
  event.preventDefault();

  closingModalStaff();
}

function addAllEventListeners() {
  document.addEventListener('keydown', onEscClick);
  teamBackdrop.addEventListener('click', onBackdropClick);
  teamCloseBtn.addEventListener('click', onCloseBtnClick);
  bodyElement.style.overflow = 'hidden';
}

function closingModalStaff() {
  document.removeEventListener('keydown', onEscClick);
  teamBackdrop.removeEventListener('click', onBackdropClick);
  teamCloseBtn.removeEventListener('click', onCloseBtnClick);

  teamBackdrop.classList.add('is-closed');
  document.body.classList.remove('modal-open');
  bodyElement.style.overflow = 'auto';
}
