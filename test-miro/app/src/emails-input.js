var deteleEmailBox = function (element) {
    element.parentNode.removeChild(element);
};
var isValidEmail = function (email) {
    var regEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return email.match(regEx) !== null;
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
    title.onkeydown = function (event) {
        if (event.code === 'Enter') {
            event.preventDefault();
            document.getElementById('emails-editor__input').focus();
        }
    };
    emailBox.append(title);
    emailBox.append(deleteBtn);
    emailsPanel[0].append(emailBox);
    if (!isValidEmail(email))
        showError(emailBox, title);
};
var checkCommaAndAddEmailBox = function (emailInput) {
    var inputValue = emailInput.value;
    var comma = ',';
    if (inputValue.indexOf(comma) === -1)
        return;
    if (inputValue.indexOf(comma) === inputValue.length) {
        addEmailBox(inputValue.slice(0, -1));
        emailInput.value = null;
    }
    else {
        var indexComma = inputValue.indexOf(comma);
        emailInput.value = emailInput.value.substring(indexComma + 1).trim();
        addEmailBox(inputValue.slice(0, indexComma));
        checkCommaAndAddEmailBox(emailInput);
    }
};
// export {
//   deteleEmailBox,
//   isValidEmail,
//   showError,
//   addEmailBox,
//   checkCommaAndAddEmailBox
// };
