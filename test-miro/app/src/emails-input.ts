const deteleEmailBox = (element: HTMLDivElement) => {
  element.parentNode.removeChild(element);
}

const isValidEmail = (email: string): boolean => {
  return email.indexOf('@') !== -1;
}

const showError = (emailBox: HTMLDivElement, title: HTMLDivElement) => {
  emailBox.setAttribute('class', 'emails-editor__box transparent-box col-auto');
  title.setAttribute('class', 'emails-editor__title invalid-email');
}

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

  emailBox.append(title);
  emailBox.append(deleteBtn);
  emailsPanel[0].append(emailBox);

  if (!isValidEmail(email)) {
    showError(emailBox, title);
  }
}