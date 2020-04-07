var deteleEmailBox = function (element) {
    element.parentNode.removeChild(element);
};
var isValidEmail = function (email) {
    return email.indexOf('@') !== -1;
};
var showError = function (emailBox, title) {
    emailBox.setAttribute('class', 'emails-editor__box transparent-box col-auto');
    title.setAttribute('class', 'emails-editor__title invalid-email');
};
var addEmailBox = function (email) {
    var emailsPanel = document.getElementsByClassName('emails-editor');
    var emailBox = document.createElement('div');
    var title = document.createElement('div');
    var deleteBtn = document.createElement('button');
    emailBox.setAttribute('class', 'emails-editor__box col-auto');
    deleteBtn.setAttribute('class', 'emails-editor__delete');
    deleteBtn.onclick = function () { deteleEmailBox(emailBox); };
    title.setAttribute('class', 'emails-editor__title');
    title.setAttribute('contenteditable', 'true');
    title.setAttribute('spellcheck', 'false');
    title.innerText = email;
    title.onfocus = function () {
        emailBox.setAttribute('class', 'emails-editor__box transparent-box col-auto');
        title.setAttribute('class', 'emails-editor__title');
    };
    title.onblur = function () {
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
};
