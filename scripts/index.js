const editProfileBtn = document.querySelector(".profile__btn-edit");
const editProfileModal = document.querySelector("#edit-profile-modal");
const modalCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const newProfilePostBtn = document.querySelector(".profile__btn-plus");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

editProfileBtn.addEventListener("click", function () {
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
