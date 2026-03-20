//Pantallas
const screenLogin = document.getElementById('screen-login');
const mainContainer = document.getElementById('main-container');
const levelIntro = document.getElementById('level-intro');
const gamePlay = document.getElementById('game-play');

// inputs y textos
const inputUsername = document.getElementById('username');
const displayLevelTitle = document.getElementById('display-level-title');
const footerLevelName = document.getElementById('footer-level-name');
const questionText = document.getElementById('question-text');
const optionsWrapper = document.getElementById('options-wrapper');

// Botones
const btnStartApp = document.getElementById('btn-start-app');
const btnPlayLevel = document.getElementById('btn-play-level');
const levelButtons = document.querySelectorAll('.level-btn');
const btnNext = document.getElementById('btn-next');
const btnQuit = document.getElementById('btn-quit');

// 2. VARIABLES DE ESTADO
let currentUser = "";
let selectedLevel = 1;
let currentQuestionIndex = 0;
let questionsOfLevel = [];

let globalScore = 0;
let totalQuestionsAnswered = 0;
let levelsCompletedCount = 0;

// 3. FUNCIONES INICIALES

//registro / inicio
btnStartApp.addEventListener('click', () => {
    const name = inputUsername.value.trim();
    
    if (name !== "") {
        currentUser = name;
        screenLogin.classList.add('hidden');
        mainContainer.classList.remove('hidden');
        console.log("Bienvenido: " + currentUser);
    } else {
        alert("Ingresa tu nombre");
    }
});

// elegir nivel - sidebar
levelButtons.forEach(button => {
    button.addEventListener('click', () => {
        levelButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // actualizar datos del nivel
        selectedLevel = button.getAttribute('data-level');
        const levelName = "Nivel " + selectedLevel;
        
        displayLevelTitle.innerText = levelName;
        footerLevelName.innerText = levelName;

        gamePlay.classList.add('hidden');
        levelIntro.classList.remove('hidden');
    });
});

// INiciar el juego
btnPlayLevel.addEventListener('click', () => {
    levelIntro.classList.add('hidden');
    gamePlay.classList.remove('hidden');
    loadQuestions(selectedLevel);
});

//LOGICA DEL JUEGO
function loadQuestions(level) {
    questionsOfLevel = shuffleArray([...quizzData[level]]); 
    currentQuestionIndex = 0;
    renderQuestion();
}

function renderQuestion() {
    const currentQ = questionsOfLevel[currentQuestionIndex];
    btnNext.classList.add('hidden'); 
    questionText.innerText = currentQ.pregunta;
    optionsWrapper.innerHTML = "";
    
    // 1. Creamos una copia de las opciones para no alterar el archivo original
    // 2. Las mezclamos al azar
    const shuffledOptions = shuffleArray([...currentQ.opciones]);
    
    shuffledOptions.forEach((opcion, index) => {
        const letra = String.fromCharCode(65 + index);
        const button = document.createElement('button');
        button.className = "option-btn";
        button.innerHTML = `<span class="option-letter">${letra}</span> ${opcion}`;

        // La lógica de verificación sigue funcionando igual porque comparamos el texto
        button.onclick = () => checkAnswer(opcion, currentQ.respuesta, button);
        optionsWrapper.appendChild(button);
    });
}

function checkAnswer(selected, correct, buttonElement) {
    if (selected === correct) {
        buttonElement.style.backgroundColor = "#7ad47d";
        buttonElement.style.color = "white";

        const allOptions = optionsWrapper.querySelectorAll('.option-btn');
        allOptions.forEach(btn => btn.style.pointerEvents = "none");
        
        btnNext.classList.remove('hidden'); //BOTON CONTINUAR
    } else {
        buttonElement.style.backgroundColor = "#f99d97";
        buttonElement.style.color = "white";
        buttonElement.disabled = true; //DESHABILITADO
    }
}

//evento final 
btnNext.addEventListener('click', () => {
    currentQuestionIndex++;
    globalScore++; 
    totalQuestionsAnswered++;

    if (currentQuestionIndex < questionsOfLevel.length) {
        renderQuestion();
    } else {
        // nivel completado
        levelsCompletedCount++;

        if (selectedLevel == 4) {
            showFinalResults(globalScore, totalQuestionsAnswered);
        } else {
            alert(`¡Nivel ${selectedLevel} Superado! El siguiente nivel ha sido desbloqueado.`);
            
            //desbloquear el siguiente nivel
            const nextLevelNum = parseInt(selectedLevel) + 1;
            const nextBtn = document.querySelector(`.level-btn[data-level="${nextLevelNum}"]`);
            
            if (nextBtn) {
                nextBtn.classList.remove('locked');
                nextBtn.disabled = false;
                nextBtn.innerText = `Nivel ${nextLevelNum}`; // Quitamos el emoji de candado
            }

            gamePlay.classList.add('hidden');
            levelIntro.classList.remove('hidden');
        }
    }
});

//abandonar
btnQuit.addEventListener('click', () => {
    if (confirm("¿Estás seguro de que deseas abandonar el juego?")) {
        location.reload();
    }
});

function showFinalResults(score, totalQuestions) {
    document.getElementById('main-container').classList.add('hidden');
    document.getElementById('screen-results').classList.remove('hidden');
    
    // Cálculo de datos
    const accuracy = Math.round((score / totalQuestions) * 100);
    
    // Inyectar datos en el HTML
    document.getElementById('final-score').innerText = score;
    document.getElementById('final-accuracy').innerText = accuracy + "%";

    document.getElementById('final-levels').innerText = `${levelsCompletedCount}/4`;
}

document.getElementById('btn-restart').addEventListener('click', () => {
    location.reload(); 
});


/*mezclar respuestas*/
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const btnRestart = document.getElementById('btn-restart');
if (btnRestart) {
    btnRestart.addEventListener('click', () => {
        window.location.reload(); 
    });
}