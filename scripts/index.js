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
const profilePostInput = newPostModal.querySelector("#profile-link-input");
const profileLinkInput = newPostModal.querySelector("#profile-caption-input");

editProfileBtn.addEventListener("click", function () {
  profileNameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  editProfileModal.classList.add("modal_is-opened");
});

modalCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

newProfilePostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  console.log("submit");
  profileNameElement.textContent = profileNameInput.value;
  profileJobElement.textContent = jobInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  console.log(profilePostInput.value);
  console.log(profileLinkInput.value);
  newPostModal.classList.remove("modal_is-opened");
  addCardFormElement.reset();
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);
