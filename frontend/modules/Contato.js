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
        const nomeInput = el.querySelector('input[name="nome"]');
        const emailInput = el.querySelector('input[name="email"]');
        const telefoneInput = el.querySelector('input[name="telefone"]');
        const btn = el.querySelector('.btn');
        let error = false;

        if(emailInput.value && !validator.isEmail(emailInput.value)) {
            emailInput.classList.add('error');
            const divEmail = el.querySelector('div[name="email-group"]');
            const span = document.createElement('span');
            span.classList.add('error-message');
            span.innerHTML = 'e-mail inválido';
            divEmail.appendChild(span);
            error = true;
        }

        if(!nomeInput.value) {
            nomeInput.classList.add('error');
            const divNome = el.querySelector('div[name="nome-group"]');
            const span = document.createElement('span');
            span.classList.add('error-message');
            span.innerHTML = 'Este campo é obrigatório';
            divNome.appendChild(span);
            error= true;
        }
    
        if(!emailInput.value && !telefoneInput.value){
            emailInput.classList.add('error');
            telefoneInput.classList.add('error');
            const divEmail = el.querySelector('div[name="email-group"]');
            const divTelefone = el.querySelector('div[name="telefone-group"]');
            const spanEmail = document.createElement('span');
            const spanTelefone = document.createElement('span');
            spanEmail.classList.add('error-message');
            spanTelefone.classList.add('error-message');
            spanEmail.innerHTML = 'Pelo menos um contato deve ser fornecido: e-mail ou telefone';
            spanTelefone.innerHTML = 'Pelo menos um contato deve ser fornecido: e-mail ou telefone';
            divEmail.appendChild(spanEmail);
            divTelefone.appendChild(spanTelefone);
            error = true;
        }

        console.log('sim');
        el.addEventListener('change', () => {
            if(nomeInput.value){
                nomeInput.classList.remove('error');
                const div = el.querySelector('div[name="nome-group"]');
                const span = div.querySelector('.error-message');
                if(span) div.removeChild(span);
            }
            if(emailInput.value || telefoneInput.value){
                emailInput.classList.remove('error');
                const divEmail = el.querySelector('div[name="email-group"]');
                const spanEmail = divEmail.querySelector('.error-message');
                if(spanEmail) divEmail.removeChild(spanEmail);

                telefoneInput.classList.remove('error');
                const divTelefone = el.querySelector('div[name="telefone-group"]');
                const spanTelefone = divTelefone.querySelector('.error-message');
                if(spanTelefone) divTelefone.removeChild(spanTelefone);
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