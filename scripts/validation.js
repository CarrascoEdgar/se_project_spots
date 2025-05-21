const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "button__inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
}

function showInputError(formEl, inputEl, errorMsg, config) {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add(config.inputErrorClass);

}

const hideInputError = (formEl, inputEl, config) => {
  const errorMsgEl = formEl.querySelector (`#${inputEl.id}-error`);
  errorMsgEl.textContent ="";
    inputEl.classList.remove(config.inputErrorClass);

}

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    disabledButton(buttonElement);
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const disabledButton = (buttonElement, config) => {
  buttonElement.disabled = true;
}

const resetValidation = (formEl, inputList) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input);
  })
}

const setEventListeners = (formEl, config) => {
   const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
   const buttonElement = formEl.querySelector(config.submitButtonSelector);
      toggleButtonState(inputList, buttonElement, config);


  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};


enableValidation(settings);
