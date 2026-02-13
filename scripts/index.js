const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const editProfileBtn = document.querySelector(".profile__btn-edit");
const editProfileModal = document.querySelector("#edit-profile-modal");
const modalCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const profileNameElement = document.querySelector(".profile__name");
const profileNameInput = editProfileModal.querySelector("#profile-name-input");
const profileJobElement = document.querySelector(".profile__description");
const jobInput = editProfileModal.querySelector("#profile-description-input");
const profileFormElement = editProfileModal.querySelector(".modal__form");

const newProfilePostBtn = document.querySelector(".profile__btn-plus");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const addCardFormElement = newPostModal.querySelector(".modal__form");
const profileLinkInput = newPostModal.querySelector("#profile-link-input");
const profileCaptionInput = newPostModal.querySelector(
  "#profile-caption-input",
);

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

editProfileBtn.addEventListener("click", function () {
  profileNameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  openModal(editProfileModal);
});

modalCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newProfilePostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  console.log("submit");
  profileNameElement.textContent = profileNameInput.value;
  profileJobElement.textContent = jobInput.value;
  closeModal(editProfileModal);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  console.log(profileLinkInput.value);
  console.log(profileCaptionInput.value);
  closeModal(newPostModal);
  addCardFormElement.reset();
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach(function (item) {
  console.log(item.name);
});
