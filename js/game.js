/*
charater = personagem
shuffle = embaralhar
lock = trancar
disabled = desativado

*/
const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

//array que representa os nomes de cada imagem do BD
const characters = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
];

//função que cria dinamicamente todas as divs necessárias
const createElement = (tag, className) => {

    const element = document.createElement(tag);
    element.className = className;
    return element;
}


let firstCard = '';
let secondCard = '';
let lockCard = false;

//verifica se todas as cartas estiverem com o disabled-card, assim acaba o jogo
const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if(disabledCards.length === 20){
        setTimeout(() => {
            alert(`Parabéns ${spanPlayer.innerHTML}, você conseguiu em ${timer.innerHTML} segundos!`);
            clearInterval(this.loop);
            lockCard = true;
        }, 550);
    }
}

//Pega as cartas para verificar se são iguais
const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');
    let isMatch = firstCharacter === secondCharacter;

    if(isMatch){
        // Adiciona uma classe no elemento filho para deixar a carte cinza
        firstCard.firstChild.classList.add('disabled-card'); 
        secondCard.firstChild.classList.add('disabled-card');

        resetCards(isMatch);

        checkEndGame();
    } else {
        lockCard = true;

        //vira as cartas do avesso depois de um tempo removendo a classe reveal-card
        setTimeout(() => {
            firstCard.classList.remove('reveal-card'); 
            secondCard.classList.remove('reveal-card');
            resetCards();
        }, 500);
    }
}

//função para, após verificar corretamente as cartas iguais, resetar variáveis e funções
const resetCards = (isMatch = false) => {
    if(isMatch){
        firstCard.removeEventListener('click', revealCard);
        secondCard.removeEventListener('click', revealCard);
    }
    [firstCard, secondCard, lockCard] = ['', '', false];
}

//função para revelar e checar se as cartas são iguais
const revealCard = ({target}) => {

    //para não validar se vc clicar duas vezes na mesma carta (...que bug FDP!!!)
    var sameTurn = target.parentNode.className.includes('reveal-card')
    if(sameTurn){
        return;
    }

    //para vc não clicar em tres cartas diferentes ou mais na hora da verificação
    if(lockCard) return false;
    
    //verificar se a carta estiver vazia de classe reveal-card, se estiver, coloca
    //evita também que seja colocada duas vezes na mesma
    if(firstCard == ''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if(secondCard == '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }

   
}


/*
função para criar os elementos HTML através do JavaScript,
criando divs de classes "card", tendo duas divs filhas
PS: essa função precisa da função createElement para funcionar
*/
const createCard = (character) => {
    
    //criando as divs já colocando as classes
    //ATENÇÃO: createElement não é nativa do JavaScript
    const card = createElement('div', 'card');
    const frente = createElement('div', 'face frente');
    const verso = createElement('div', 'face verso');

    //criando a tag img na div face frente
    frente.style.backgroundImage = `url(../images/${character}.jpg)`;

    card.appendChild(frente);
    card.appendChild(verso);

    card.addEventListener('click', revealCard);

    //para colocar um elemento data na div e identificar o nome da imagem junto (no campo characcter)
    card.setAttribute('data-character', character);

    return card;

}

//função que carrega o jogo
const loadGame = () => {

    const duplicateCharacters = [...characters, ...characters];

    /*
    o método .sort() ordem a array em ordem alfabética ou em crescente
    o -0.5 é para gerar um número aleatório entre positivo e negativo
    se o numero retornado for negativo, ele bota um numero aleatorio atrás
    se for positivo coloca na frente
    se for 0 ele não altera a ordem
    */
    const shuffleArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    /*
    Para cada elemento da array "duplicateCharacters", (que é a array characters duas vezes),
    ele usa a função createCard
    "character" é o nome de cada elemento pego da array, será usado para manipular esses elementos
    */
    shuffleArray.forEach((character) => {

        const card = createCard(character);

        //grid é a div criada manualmente no HTML
        grid.appendChild(card);

    });
}

//modificando o cronomêtro a cada um segundo na tela
const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = Number(timer.innerHTML);
        timer.innerHTML = currentTime + 1;
    }, 1000);
}

//invocar o player digitado na pagina inicial
window.onload = () => {

    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();

    loadGame();
}

