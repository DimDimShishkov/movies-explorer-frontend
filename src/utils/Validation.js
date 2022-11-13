export class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
    this._submitButton = this._form.querySelector(
      `.${this._submitButtonSelector}`
    );
    this._inputsList = Array.from(
      this._form.querySelectorAll(`.${this._inputSelector}`)
    );
  }

  _hideValidationError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    const errorElement = this._form.querySelector(
      `.popup__input-error_type_${inputElement.id}`
    );
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _showValidationError(inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    const errorElement = this._form.querySelector(
      `.popup__input-error_type_${inputElement.id}`
    );
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _toggleButtonState(inputElement) {
    if (!inputElement.validity.valid) {
      this._showValidationError(inputElement);
    } else {
      this._hideValidationError(inputElement);
    }
  }

  _checkFormValidity() {
    if (this._form.checkValidity()) {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._inactiveButtonClass);
    } else {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._inactiveButtonClass);
    }
  }

  _setEventListeners(inputElement) {
    inputElement.addEventListener("input", () => {
      this._toggleButtonState(inputElement);
      this._checkFormValidity();
    });
  }

  resetValidation() {
    this._checkFormValidity();
    this._inputsList.forEach((inputElement) => {
      this._hideValidationError(inputElement);
    });
  }

  enableValidation() {
    this._inputsList.forEach((inputElement) => {
      this._setEventListeners(inputElement);
      this._hideValidationError(inputElement);
      this._checkFormValidity(inputElement);
    });
  }
}
