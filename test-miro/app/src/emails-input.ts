/**
 * Remove email component from panel
 */
const deteleEmailBox = (element: HTMLDivElement) => {
  element.parentNode.removeChild(element);
}

/**
 * Email validation
 */
const isValidEmail = (email: string): boolean => {
  const regEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  return email.match(regEx) !== null;
}

/**
 * Add error bottom-line and remove blue background
 */
const showError = (emailBox: HTMLDivElement, title: HTMLDivElement) => {
  emailBox.setAttribute('class', 'emails-editor__box transparent-box col-auto');
  title.setAttribute('class', 'emails-editor__title invalid-email');
}

/**
 * Add email component to panel
 */
const addEmailBox = (email: string) => {
  const emailsPanel = document.getElementsByClassName('emails-editor');
  const emailBox = document.createElement('div');
  const title = document.createElement('div');
  const deleteBtn = document.createElement('button');

  emailBox.setAttribute('class', 'emails-editor__box col-auto');
  deleteBtn.setAttribute('class', 'emails-editor__delete');
  deleteBtn.onclick = () => { deteleEmailBox(emailBox); };
  title.setAttribute('class', 'emails-editor__title');
  title.setAttribute('contenteditable', 'true');
  title.setAttribute('spellcheck', 'false');
  title.innerText = email;

  title.onfocus = () => {
    emailBox.setAttribute('class', 'emails-editor__box transparent-box col-auto');
    title.setAttribute('class', 'emails-editor__title');
  };
  title.onblur = () => {
    emailBox.setAttribute('class', 'emails-editor__box col-auto');
    if (!isValidEmail(title.innerText)) {
      showError(emailBox, title);
    }
  };
  title.onkeydown = (event) => {
    if (event.code === 'Enter') {
      event.preventDefault();
      document.getElementById('emails-editor__input').focus();
    }
  }

  emailBox.append(title);
  emailBox.append(deleteBtn);
  emailsPanel[0].append(emailBox);

  if (!isValidEmail(email)) showError(emailBox, title);
}

/**
 * Check comma in input and add component if exist
 */
const checkCommaAndAddEmailBox = (emailInput: HTMLInputElement) => {
  const inputValue = emailInput.value;
  const comma = ',';

  if (inputValue.indexOf(comma) === -1) return;

  if (inputValue.indexOf(comma) === inputValue.length) {
    addEmailBox(inputValue.slice(0, -1));
    emailInput.value = null;
  } else {
    const indexComma = inputValue.indexOf(comma);
    emailInput.value = emailInput.value.substring(indexComma + 1).trim();

    addEmailBox(inputValue.slice(0, indexComma));
    checkCommaAndAddEmailBox(emailInput);
  }
}

// export {
//   deteleEmailBox,
//   isValidEmail,
//   showError,
//   addEmailBox,
//   checkCommaAndAddEmailBox
// };