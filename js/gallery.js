import gallery from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightBox: document.querySelector('.js-lightbox'),
  originImg: document.querySelector('.js-image'),
  closeBtn: document.querySelector('.js-button'),
};

const createGalleryItem = ({ preview, original, description }, idx) => {
  const galleryList = document.createElement('li');
  const galleryLink = document.createElement('a');
  const galleryImage = document.createElement('img');

  galleryList.classList.add('gallery__item');
  galleryLink.classList.add('gallery__link');
  galleryImage.classList.add('gallery__image');

  galleryImage.src = preview;
  galleryImage.dataset.source = original;
  galleryImage.alt = description;
  galleryImage.dataset.index = idx;

  galleryLink.appendChild(galleryImage);
  galleryList.appendChild(galleryLink);
  refs.gallery.appendChild(galleryList);

  return galleryList;
};

const makeGallery = value => {
  const galleryShaker = value.map((image, idx) =>
    createGalleryItem(image, idx),
  );
  refs.gallery.append(...galleryShaker);
};
makeGallery(gallery);

let imageIndex;

function handelGalleryClick(event) {
  event.preventDefault();
  const imageRef = event.target;
  if (imageRef.nodeName !== 'IMG') {
    return;
  }
  const originUrl = imageRef.dataset.source;
  imageIndex = Number(imageRef.dataset.index);
  handelModalOpen();
  originPicture(originUrl, imageRef.alt);
}

function originPicture(url, alt) {
  refs.originImg.src = url;
  refs.originImg.alt = alt;
}

function handelModalOpen() {
  refs.lightBox.classList.add('is-open');
  window.addEventListener('keydown', handelPressEsc);
  window.addEventListener('keydown', handelPressLeft);
  window.addEventListener('keydown', handelPressRight);
}

function handelModalClose() {
  refs.lightBox.classList.remove('is-open');
  refs.originImg.src = '';
  refs.originImg.alt = '';
  window.addEventListener('keydown', handelPressEsc);
  window.addEventListener('keydown', handelPressLeft);
  window.addEventListener('keydown', handelPressRight);
}

function handelBackdropClick(event) {
  if (event.target.nodeName !== 'IMG') {
    handelModalClose();
  }
}

function handelPressEsc(event) {
  if (event.code === 'Escape') {
    handelModalClose();
  }
}

function handelPressLeft(event) {
  if (event.code === 'ArrowLeft') {
    imageIndex = imageIndex === 0 ? gallery.length - 1 : imageIndex - 1;
    refs.originImg.src = gallery[imageIndex].original;
    refs.originImg.alt = gallery[imageIndex].description;
  }
}

function handelPressRight(event) {
  if (event.code === 'ArrowRight') {
    imageIndex = imageIndex === gallery.length - 1 ? 0 : imageIndex + 1;
    refs.originImg.src = gallery[imageIndex].original;
    refs.originImg.alt = gallery[imageIndex].description;
  }
}

refs.gallery.addEventListener('click', handelGalleryClick);
refs.closeBtn.addEventListener('click', handelModalClose);
refs.lightBox.addEventListener('click', handelBackdropClick);
