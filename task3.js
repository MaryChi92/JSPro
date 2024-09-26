"use strict"

class Form {
    constructor(name, phone, email, text) {
        this.form = document.querySelector('form');
        this.SelectedElsArray = [];
        this.name = this.select(name);
        this.phone = this.select(phone);
        this.email = this.select(email);
        this.text = this.select(text);
        this.regExpName = /[a-zа-яёА-ЯЁ]+/i;
        this.regExpPhone = /^\+\d{1}\(\d{3}\)\d{3}-\d{4}\b/;
        this.regExpEmail = /^[a-z\-.]+@[a-z]+.[a-z]+/;
        this.validate();
    }

    /**
     * Finds the required selector and saves it to an array.
     * @return {string} - value of the required selector.
     */
    select(element) {
        const selectedEl = this.form.querySelector(`.${element}`);
        this.SelectedElsArray.push(selectedEl);
        console.log(selectedEl.value)
        return selectedEl.value;
    }

    /**
     * Validates user's data according to the parameters described in regExp
     * If wrong - adds  'error' class
     */
    /* Я понимаю, что это плохое решение - использовать массив - очень криво, плюс повторение if,
    *  не получилось лаконичнее...*/
    validate() {
        if (!this.regExpName.test(this.name)) {
            this.addErrorClass(this.SelectedElsArray[0]);
        }
        if (!this.regExpPhone.test(this.phone)) {
            this.addErrorClass(this.SelectedElsArray[1]);
        }
        if (!this.regExpEmail.test(this.email)) {
            this.addErrorClass(this.SelectedElsArray[2]);
        }
        if (this.text === '') {
            this.addErrorClass(this.SelectedElsArray[3]);
        }
    }

    /**
     * Adds an 'error' class to the specified selector
     */
    addErrorClass(element) {
        element.classList.add('error');
    }
}
