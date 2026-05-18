'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// create success/error toast message element
const toast = document.createElement("div");
toast.setAttribute("data-form-toast", "");
toast.style.cssText = [
  "display: none",
  "align-items: center",
  "gap: 10px",
  "padding: 14px 20px",
  "border-radius: 14px",
  "font-size: var(--fs-6, 13px)",
  "font-weight: var(--fw-500, 500)",
  "margin-top: 16px",
  "border: 1px solid transparent",
  "transition: opacity 0.4s ease"
].join(";");
form.parentNode.insertBefore(toast, form.nextSibling);

function showToast(success) {
  toast.innerHTML = success
    ? "<ion-icon name='checkmark-circle-outline' style='font-size:20px;color:hsl(120,60%,65%)'></ion-icon><span>¡Mensaje enviado exitosamente!</span>"
    : "<ion-icon name='alert-circle-outline' style='font-size:20px;color:hsl(0,65%,65%)'></ion-icon><span>Error al enviar. Intenta de nuevo.</span>";

  if (success) {
    toast.style.background = "hsla(120, 60%, 65%, 0.1)";
    toast.style.borderColor = "hsla(120, 60%, 65%, 0.3)";
    toast.style.color = "hsl(120, 60%, 70%)";
  } else {
    toast.style.background = "hsla(0, 65%, 65%, 0.1)";
    toast.style.borderColor = "hsla(0, 65%, 65%, 0.3)";
    toast.style.color = "hsl(0, 65%, 70%)";
  }

  toast.style.display = "flex";
  toast.style.opacity = "1";

  setTimeout(function () {
    toast.style.opacity = "0";
    setTimeout(function () { toast.style.display = "none"; }, 400);
  }, 8000);
}

// handle form submit via AJAX
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const originalHTML = formBtn.innerHTML;

  formBtn.setAttribute("disabled", "");
  formBtn.innerHTML = "<ion-icon name='hourglass-outline'></ion-icon><span>Enviando...</span>";

  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: { "Accept": "application/json" }
  })
    .then(function (response) {
      if (response.ok) {
        form.reset();
        formBtn.setAttribute("disabled", "");
        formBtn.innerHTML = originalHTML;
        showToast(true);
      } else {
        formBtn.removeAttribute("disabled");
        formBtn.innerHTML = originalHTML;
        showToast(false);
      }
    })
    .catch(function () {
      formBtn.removeAttribute("disabled");
      formBtn.innerHTML = originalHTML;
      showToast(false);
    });
});



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}