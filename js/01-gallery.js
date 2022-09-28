import { galleryItems } from './gallery-items.js';
// Change code below this line

const photoGallery = document.querySelector(".gallery");
photoGallery.innerHTML = makeGallery(galleryItems);

function makeGallery(item) {
    return item
        .map(({ preview, original, description }) => {
            return `<div class="gallery__item">
                    <a class="gallery__link" href="${original}">
                        <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                        />
                    </a>
                    </div>`;
        })
        .join(" ")
};

photoGallery.addEventListener("click", openPhotoModal);

let photoInstance;
function openPhotoModal(event) {
    if (event.target.nodeName !== "IMG") {
        return;
    }
    event.preventDefault();

    photoInstance = basicLightbox.create(
        `<img src="${event.target.dataset.source}" 
    width="800" 
    height="600">`,
        {
            onShow: (photoInstance) => {
                add();
                function add() {
                    window.addEventListener("keydown", escapeClick);
                };
            },
            onClose: (photoInstance) => {
                close();
                function close() {
                    window.removeEventListener("keydown", escapeClick);
                };
            },
        },
    );
    photoInstance.show();
};

function escapeClick(event) {
    if (event.code === "Escape") {
        photoInstance.close()
    };
};