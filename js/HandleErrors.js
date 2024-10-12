const buttonSubmit = document.querySelector('#button-submit');



const findMessageContainer = (element) => {

    const elementParent = element.parentElement;

    let messageElement = null;

    if (elementParent.classList.contains('form__flex__inner')) {
        messageElement = elementParent.querySelector('.message');
    } else if (elementParent.classList.contains('form__label__input')) {
        messageElement = elementParent.parentElement.nextElementSibling;
    } else if (elementParent.classList.contains('form__label__checkbox')) {
        messageElement = elementParent.nextElementSibling;
    }

    return messageElement;
}

const clearErrorMessage = (element) => {
    const message = findMessageContainer(element);
    element.style.border = '1px solid hsl(187, 24%, 22%)'
    message.style.display = 'none'
    message.textContent = '';
}

const showErrorMessage = (element) => {

    const message = findMessageContainer(element);

    if (element.type === 'text') {
        if (element.validity.valueMissing) {
            message.style.display = 'block';
            message.textContent = 'This field is required';
            element.style.border = '1px solid red'
        }
    } else if (element.type === 'email') {
        if (element.validity.valueMissing) {
            message.style.display = 'block';
            message.textContent = 'This field is required';
            element.style.border = '1px solid red'
        } else if (element.validity.typeMismatch) {
            message.style.display = 'block';
            message.textContent = 'Please enter a valid email address';
            element.style.border = '1px solid red'
        }
    } else if (element.type === 'radio') {
        if (element.validity.valueMissing) {
            message.style.display = 'block';
            message.textContent = 'Please select a query type';
            element.style.border = '1px solid red'
        }

    } else if (element.type === 'checkbox') {
        if (element.validity.valueMissing) {
            message.style.display = 'block';
            message.textContent = 'To submit this form, please consent to being contacted';
            element.style.border = '1px solid red'
        }
    } else {
        if (element.validity.valueMissing) {
            message.style.display = 'block';
            message.textContent = 'This field is required';
            element.style.border = '1px solid red'
        }
    }

}

const clearForm = (elements) => {
    elements.forEach((element) => {
        if (element.type === 'radio') {
            element.checked = false;
        } else if (element.type === 'checkbox') {
            element.checked = false
        } else {
            element.value = '';
        }
    });
}

const showFlashMessage = () => {
    const flash = document.querySelector('#flash');

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    if (flash.classList.contains('hidden')) {
        flash.classList.remove('hidden');
        flash.classList.add('visible');
    }

    setTimeout(() => {
        if (flash.classList.contains('visible')) {
            flash.classList.remove('visible');
            flash.classList.add('hidden');
        }

    }, 3000);
}


buttonSubmit.addEventListener('click', (e) => {
    e.preventDefault();

    const form = document.querySelector('#form');

    const elements = Array.from(form.elements).filter((element) => element.type !== 'button');

    let submit = true;

    elements.forEach((element) => {
        if (!element.checkValidity()) {
            showErrorMessage(element);
            submit = false;
        } else {
            clearErrorMessage(element);

        }
    });

    if (submit === true) {
        clearForm(elements);
        showFlashMessage();
    }


});