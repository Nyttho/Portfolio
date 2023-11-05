const serviceID = "service_zaubtgf";
const templateID = "template_1wh6wuh";
const publicKey = "uSXlPDgWhWkOG8M-g";

// ==============BURGER MENU =================

const burger = document.querySelector(".plate");
const menu = document.querySelector("nav ul");
burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  if (burger.classList.contains("active")) {
    menu.style.left = "0";
  } else {
    menu.style.left = "-100%";
  }
});

// ============== MAJ AGE ======================

const currentAge = document.querySelector(".age");

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

let age = getAge("1990-12-26");

currentAge.textContent = age.toString() + " ans";

// ============ DISABLE BUTTON SUBMIT ==================

const contactForm = document.querySelector(".contact-form"),
  contactMessage = document.getElementById("contact_message"),
  submitButton = document.querySelector(".form-submit");

contactForm.addEventListener("input", () => {
  // Sélectionne tous les champs de texte et les zones de texte
  const formElements = [...contactForm.querySelectorAll("input, textarea")];

  // Vérifie si tous les champs de texte et les zones de texte sont remplis et si les champs ne sont pas remplis uniquement avec des espaces
  const allFieldsFilled = formElements.every((field) => {
    return field.value.trim() !== "";
  });

  if (allFieldsFilled) {
    submitButton.removeAttribute("disabled");
  } else {
    submitButton.setAttribute("disabled", "disabled");
  }
});

//==================== ROTATION ICONES =================

function spin(e) {
  const icon = e.target;
  icon.classList.add("animated");
  icon.removeEventListener("mouseover", spin);

  setTimeout(() => {
    icon.classList.remove("animated");
    icon.addEventListener("mouseover", spin);
  }, 2000);
}

const TechIcons = document.querySelectorAll(".logos-slides i");

TechIcons.forEach((icon) => {
  icon.addEventListener("mouseover", spin);
});

// =============EMAIL JS=====================

const sendMail = (e) => {
  e.preventDefault();

  emailjs.sendForm(serviceID, templateID, "#contact_form", publicKey).then(
    () => {
      // montre message envoyé
      contactMessage.textContent = "Message envoyé avec succès ✅";

      // supprime message après 5 secondes
      setTimeout(() => {
        contactMessage.textContent = "";
      }, 5000);

      //   vide les champs
      contactForm.reset();
    },
    () => {
      contactMessage.textContent = "Message non envoyé (service error) ❌";
    }
  );
};

contactForm.addEventListener("submit", sendMail);
