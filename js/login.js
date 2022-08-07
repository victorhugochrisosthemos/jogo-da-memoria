/*
projeto realizado com o apoio dos vídeos do canal do Dev

target = alvo
*/
const input = document.querySelector('.login_input') 
const button = document.querySelector('.login_button')
const form = document.querySelector('.login-form')

//os colchetes, entre o target, significa que pegará o evento e logo o remove
const validateInput = ({target}) => { 
    //o target no caso é a string passada no input
    if (target.value.length > 1){
        button.removeAttribute('disabled');
        return;
        // o return impete que leia o restante do código da função, daí nem precisa colocar o else
    }
    //o set atributo recebe dois valores necessariamente, por isso o ''
    button.setAttribute('disabled', '')
}

const handleSubmit = (event) => {

    //bloqueia o evento padrão de formulário(recarregar a página)
    event.preventDefault()

    //acesso e grava valor no Local Storage
    localStorage.setItem('player', input.value)

    //direcionando a pessoa para outra página
    window.location = 'pages/game.html'
}

//quando for digitado algo no input, efetua a função validateInput
//não precisa passar valor na função porque o target pega direto
input.addEventListener('input', validateInput)

//com o formulário enviado, é efetuado a função handleSubmit
form.addEventListener('submit', handleSubmit) 