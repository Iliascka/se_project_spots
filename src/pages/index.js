import {
  enableValidation,
  settings,
  resetValidation,
  toggleButtonState,
  disableBtn,
} from "../scripts/validation.js";
import "./index.css";
import Api from "../utils/Api.js";
import { submitBtn } from "../utils/helper.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "4d21a654-abaf-4ea9-ae80-515438be76d0",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, user]) => {
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });

    profileNameElement.textContent = user.name;
    profileJobElement.textContent = user.about;
    profileAvatar.src = user.avatar;
  })
  .catch(console.error);

//Profile Modal
const editProfileBtn = document.querySelector(".profile__btn-edit");
const editProfileModal = document.querySelector("#edit-profile-modal");
const modalCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const profileNameElement = document.querySelector(".profile__name");
const profileNameInput = editProfileModal.querySelector("#profile-name-input");
const profileJobElement = document.querySelector(".profile__description");
const jobInput = editProfileModal.querySelector("#profile-description-input");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const modalSubmitProfileBtn =
  editProfileModal.querySelector(".modal__submit-btn");

//New Post Modal
const newProfilePostBtn = document.querySelector(".profile__btn-plus");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const modalSubmitBtn = newPostModal.querySelector(".modal__submit-btn");
const addCardFormElement = newPostModal.querySelector(".modal__form");
const profileLinkInput = newPostModal.querySelector("#profile-link-input");
const profileCaptionInput = newPostModal.querySelector(
  "#profile-caption-input",
);

//Preview Modal
const previewModal = document.querySelector("#preview-modal");
const previewCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageModal = previewModal.querySelector(".modal__image");
const previewCaptionModal = previewModal.querySelector(".modal__caption");

//Avatar Modal
const editAvatarBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#edit-avatar-modal");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarForm = avatarModal.querySelector(".modal__form");
const profileAvatarInput = avatarModal.querySelector("#profile-avatar-input");
const profileAvatar = document.querySelector(".profile__avatar");

// Modals
const modals = document.querySelectorAll(".modal");

//Delete Modal
const deleteModal = document.querySelector("#delete-modal");
const deleteModalForm = deleteModal.querySelector(".modal__form");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-btn");
const deleteModalBtn = deleteModal.querySelector(
  ".modal__submit-btn_type_delete",
);
const deleteModalCancelBtn = deleteModal.querySelector(
  ".modal__submit-btn_type_cancel",
);

// Open Close Modals
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
}
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

deleteModalCancelBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});
deleteModalCloseBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

editAvatarBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  submitBtn(avatarSubmitBtn, true);
  api
    .editAvatarInfo({ avatar: profileAvatarInput.value })
    .then((data) => {
      profileAvatar.src = data.avatar;
      closeModal(avatarModal);
      avatarForm.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      submitBtn(avatarSubmitBtn, false);
    });
}

avatarForm.addEventListener("submit", handleAvatarSubmit);

let selectedCardId;
let selectedCard;
function handleDeleteCard(cardElement, data) {
  openModal(deleteModal);
  selectedCard = cardElement;
  selectedCardId = data;
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  submitBtn(deleteModalBtn, true, "Delete", "Deleting...");

  api
    .deleteCard(selectedCardId)
    .then((data) => {
      closeModal(deleteModal);
      selectedCard.remove();
    })
    .catch(console.error)
    .finally(() => {
      submitBtn(deleteModalBtn, false, "Delete", "Deleting...");
    });
}

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function handleLike(evt, { _id }) {
  const isLiked = evt.target.classList.contains("card__like-btn_active");
  api
    .changeLikeStatus({ _id, isLiked })
    .then((data) => {
      evt.target.classList.toggle("card__like-btn_active");
    })
    .catch(console.error);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");

  cardImageEl.addEventListener("click", () => {
    previewImageModal.src = data.link;
    previewImageModal.alt = data.name;
    previewCaptionModal.textContent = data.name;
    openModal(previewModal);
  });

  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-btn_active");
  }

  cardLikeBtn.addEventListener("click", (evt) => {
    handleLike(evt, data);
  });

  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardDeleteBtn.addEventListener("click", (evt) => {
    handleDeleteCard(cardElement, data);
  });

  return cardElement;
}

previewCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

editProfileBtn.addEventListener("click", function () {
  profileNameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  resetValidation(profileFormElement, [profileNameInput, jobInput], settings);
  toggleButtonState(
    [profileNameInput, jobInput],
    modalSubmitProfileBtn,
    settings,
  );
  disableBtn(modalSubmitProfileBtn, settings);
  openModal(editProfileModal);
});

modalCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newProfilePostBtn.addEventListener("click", function () {
  addCardFormElement.reset();
  resetValidation(
    addCardFormElement,
    [profileLinkInput, profileCaptionInput],
    settings,
  );
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  submitBtn(modalSubmitProfileBtn, true);

  api
    .editUserInfo({ name: profileNameInput.value, about: jobInput.value })
    .then((data) => {
      profileNameElement.textContent = data.name;
      profileJobElement.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      submitBtn(modalSubmitProfileBtn, false);
    });
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  submitBtn(modalSubmitBtn, true);
  api
    .addCards({ name: profileCaptionInput.value, link: profileLinkInput.value })
    .then((data) => {
      const cardElement = getCardElement(data);
      cardsList.prepend(cardElement);
      closeModal(newPostModal);
      addCardFormElement.reset();
      disableBtn(modalSubmitBtn, settings);
    })
    .catch(console.error)
    .finally(() => {
      submitBtn(modalSubmitBtn, false);
    });
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

deleteModalForm.addEventListener("submit", handleDeleteSubmit);

enableValidation(settings);
