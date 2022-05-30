import validator from 'validator';

export default class Contato{
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }
    
    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
          e.preventDefault();
          this.validate(e);
        });
      }
    
    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        const btn = el.querySelector('.btn');
        let error = false;
        console.log('foi');

        if(emailInput.value && !validator.isEmail(emailInput.value)) {
            emailInput.classList.add('error');
            const divEmail = el.querySelector('.email-group');
            const span = document.createElement('span');
            span.classList.add('error-message');
            span.innerHTML = 'E-mail inválido';
            divEmail.appendChild(span);
            error = true;
        }

        if(!emailInput.value){
            emailInput.classList.add('error');
            const divEmail = el.querySelector('.email-group');
            const spanEmail = document.createElement('span');
            spanEmail.classList.add('error-message');
            spanEmail.innerHTML = 'Insira um e-mail';
            divEmail.appendChild(spanEmail);
            error = true;
        }

        if(!passwordInput.value){
            passwordInput.classList.add('error');
            const div = el.querySelector('.password-group');
            const span = document.createElement('span');
            span.classList.add('error-message');
            span.innerHTML = 'Insira uma senha';
            div.appendChild(span);
            error = true;
        }

        el.addEventListener('change', () => {
            if(emailInput.value){
                emailInput.classList.remove('error');
                const divEmail = el.querySelector('.email-group');
                const spanEmail = divEmail.querySelector('.error-message');
                if(spanEmail) divEmail.removeChild(spanEmail);
            }

            if(passwordInput.value){
                passwordInput.classList.remove('error');
                const div = el.querySelector('.password-group');
                const span = div.querySelector('.error-message');
                if(span) div.removeChild(span);
            }
        })

        if(error){
            btn.addEventListener('click', e => {
                if(e.target){
                    const divs = el.querySelectorAll('.form-group');

                    for(let i = 0; i < divs.length; i++){
                        let span = divs[i].querySelector('.error-message');
                        if(span){
                            divs[i].removeChild(span);
                            let input = divs[i].querySelector('.error');
                            input.classList.remove('error');
                        }
                    }
                }
            })
        }
        else{
            el.submit();
        }
    }
}