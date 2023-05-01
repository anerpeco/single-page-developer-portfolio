const inputs = document.querySelectorAll(".input");
const btnEl = document.querySelector(".btn");
const projectImgEl = document.querySelectorAll(".project_img");
const projectLinksEl = document.querySelectorAll(".project_links");
let errors = {
  name: [],
  email: [],
  message: [],
};
let validInput = [];
let media = window.matchMedia("(min-width: 90rem)");
const regex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// let nameValid = false;
// let emailValid = false;
// let messageValid = false;

for (let i = 0; i < projectImgEl.length; i++) {
  if (media.matches) {
    projectImgEl[i].addEventListener("mouseenter", handleMouseOver, false);
    projectLinksEl[i].addEventListener("mouseleave", handleMouseOut, false);
    function handleMouseOver() {
      console.log(projectImgEl[i]);
      projectLinksEl[i].style.visibility = "visible";
    }
    function handleMouseOut() {
      projectLinksEl[i].style.visibility = "hidden";
    }
  }
}

btnEl.addEventListener("click", () => {
  validInput = [];
  inputs.forEach((element) => {
    let inputValue = element.value;
    let inputName = element.getAttribute("name");
    errors[inputName] = [];

    if (inputName === "email" && !validateEmail(inputValue)) {
      errors[inputName].push("Looks like this is not an email");
      element.classList.add("error_border");
      validInput.push(false);
    } else if (inputValue === "") {
      errors[inputName].push("Sorry, invalid format here");
      element.classList.add("error_border");
      validInput.push(false);
    } else {
      element.classList.remove("error_border");
      validInput.push(true);
    }

    populateErrors();
  });

  saveData();
});

const populateErrors = () => {
  const errorMsgList = document.querySelectorAll(".error_container");
  for (let elem of errorMsgList) {
    elem.remove();
  }

  for (let key of Object.keys(errors)) {
    let input = document.querySelector(`.${key}`);
    input.style.marginBottom = "2rem";

    let messageContainer = document.createElement("div");
    messageContainer.classList.add("error_container");

    errors[key].forEach((error) => {
      let messageClass = "error_msg";
      messageContainer.innerHTML = `<p class="${messageClass}">${error}</p>`;
      input.parentNode.insertBefore(messageContainer, input.nextSibling);
      input.style.marginBottom = "0";
    });
  }
};

const validateEmail = (email) => {
  if (regex.test(email)) {
    return true;
  }
  return false;
};

function saveData() {
  let checker = (arr) => arr.every(Boolean);

  if (checker(validInput)) {
    const form = document.querySelector("#form");
    const submitButton = document.querySelector("#submit");
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbxA4qG2bzP09-LpXE9VIFJMvfb9L86Bcd-SmTfVPPK59V9odgRhxwkWjv96Kxv9oy2n/exec";

    form.addEventListener("submit", (e) => {
      submitButton.disabled = true;
      e.preventDefault();
      let requestBody = new FormData(form);
      fetch(scriptURL, { method: "POST", body: requestBody })
        .then((response) => {
          alert("Success!", response);
          submitButton.disabled = false;
        })
        .catch((error) => {
          alert("Error!", error.message);
          submitButton.disabled = false;
        });
    });
  }
}
