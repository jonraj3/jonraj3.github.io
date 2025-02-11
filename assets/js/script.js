'use strict';

// ======= ??? ELEMENT TOGGLE FUNCTION =======
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// ======= ?? SIDEBAR TOGGLE =======
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// ======= ?? TESTIMONIALS MODAL =======
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

testimonialsItem.forEach(item => {
  item.addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
});

modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// ======= ?? FILTER FUNCTIONALITY =======
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    item.classList.toggle("active", selectedValue === "all" || selectedValue === item.dataset.category);
  });
};

selectItems.forEach(item => {
  item.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

let lastClickedBtn = filterBtn[0];
filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// ======= ?? CONTACT FORM VALIDATION =======
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", function () {
    formBtn.toggleAttribute("disabled", !form.checkValidity());
  });
});

// ======= ?? PAGE NAVIGATION =======
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    pages.forEach(page => {
      const isActive = this.innerHTML.toLowerCase() === page.dataset.page;
      page.classList.toggle("active", isActive);
      link.classList.toggle("active", isActive);
    });
    window.scrollTo(0, 0);
  });
});

// ======= ?? PORTFOLIO IMAGE ENLARGEMENT =======
document.addEventListener("DOMContentLoaded", function () {
  const imageModal = document.createElement("div");
  imageModal.id = "image-modal";
  imageModal.classList.add("modal");
  imageModal.innerHTML = `
    <span class="close">&times;</span>
    <img class="modal-content" id="modal-img">
  `;
  document.body.appendChild(imageModal);

  const modalImg = document.getElementById("modal-img");
  const closeBtn = imageModal.querySelector(".close");

  document.querySelectorAll(".project-item .enlarge-image img").forEach(image => {
    image.addEventListener("click", function (event) {
      event.stopPropagation();
      modalImg.src = this.src;
      imageModal.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", function () {
    imageModal.style.display = "none";
  });

  imageModal.addEventListener("click", function (event) {
    if (event.target === imageModal) {
      imageModal.style.display = "none";
    }
  });
});
