// --- CONFIGURACIÓN ---
const paresPorNivel = 5; 
const totalNiveles = 5;   

// --- BASE DE DATOS DE IMÁGENES ---
const baseDatos = [
    // --- NIVEL 1 ---
    { id: 1, img1: "images/n1_c1.png", img2: "images/n1_d1.png" }, 
    { id: 2, img1: "images/n1_c2.png", img2: "images/n1_d2.png" }, 
    { id: 3, img1: "images/n1_c3.png", img2: "images/n1_d3.png" },
    { id: 4, img1: "images/n1_c4.png", img2: "images/n1_d4.png" },
    { id: 5, img1: "images/n1_c5.png", img2: "images/n1_d5.png" },
    { id: 6, img1: "images/n1_c6.png", img2: "images/n1_d6.png" },
    { id: 7, img1: "images/n1_c7.png", img2: "images/n1_d7.png" },
    { id: 8, img1: "images/n1_c8.png", img2: "images/n1_d8.png" },
    { id: 9, img1: "images/n1_c9.png", img2: "images/n1_d9.png" }, 
    { id: 10, img1: "images/n1_c10.png", img2: "images/n1_d10.png" },
    // --- PAREJAS ADICIONALES (Niveles 3, 4, 5) ---
    { id: 11, img1: "images/n1_c11.jpg", img2: "images/n1_d11.jpg" },
    { id: 12, img1: "images/n1_c12.jpg", img2: "images/n1_d12.jpg" },
    { id: 13, img1: "images/n1_c13.jpg", img2: "images/n1_d13.jpg" },
    { id: 14, img1: "images/n1_c14.jpg", img2: "images/n1_d14.jpg" },
    { id: 15, img1: "images/n1_c15.jpg", img2: "images/n1_d15.jpg" },
    { id: 16, img1: "images/n1_c16.jpg", img2: "images/n1_d16.jpg" },
    { id: 17, img1: "images/n1_c17.jpg", img2: "images/n1_d17.jpg" },
    { id: 18, img1: "images/n1_c18.jpg", img2: "images/n1_d18.jpg" },
    { id: 19, img1: "images/n1_c19.jpg", img2: "images/n1_d19.jpg" },
    { id: 20, img1: "images/n1_c20.jpg", img2: "images/n1_d20.jpg" },
    { id: 21, img1: "images/n1_c21.jpg", img2: "images/n1_d21.jpg" },
    { id: 22, img1: "images/n1_c22.jpg", img2: "images/n1_d22.jpg" },
    { id: 23, img1: "images/n1_c23.jpg", img2: "images/n1_d23.jpg" },
    { id: 24, img1: "images/n1_c24.jpg", img2: "images/n1_d24.jpg" },
    { id: 25, img1: "images/n1_c25.jpg", img2: "images/n1_d25.jpg" }
];
// Variables de estado
let nivelActual = 1;
let cartasEnMesa = [];
let cartasSeleccionadas = [];
let paresEncontrados = 0;
let intentos = 0;
let puntos = 0;
let bloqueoTablero = true; 

// Elementos UI
const tablero = document.querySelector('#game');
const btnBoton = document.querySelector('#btn-start');
const lblNivel = document.querySelector('#level-indicator');
const lblStats = document.querySelector('#stats');

// --- INICIO ---
document.addEventListener('DOMContentLoaded', () => {
    //cargarNivel(nivelActual);
});

// Botón de Control
function accionBoton() {
    if (btnBoton.innerText === "¡Mezclar y Jugar!") {
        faseRevolver();
    } else if (btnBoton.innerText === "Siguiente Nivel") {
        nivelActual++;
        if (nivelActual > totalNiveles) {
            alert(`¡Juego Completado! Puntuación Final: ${puntos}`);
            nivelActual = 1; 
            puntos = 0; // Reiniciar puntos al terminar el juego
        }
        cargarNivel(nivelActual);
    }
}

// 1. CARGAR NIVEL
function cargarNivel(nivel) {
    tablero.innerHTML = '';
    cartasEnMesa = [];
    cartasSeleccionadas = [];
    paresEncontrados = 0;
    bloqueoTablero = true;
    
    lblNivel.innerText = `Nivel ${nivel}`;
    btnBoton.innerText = "¡Mezclar y Jugar!";
    btnBoton.disabled = false;
    lblStats.innerText = `Puntos: ${puntos} | Memoriza las parejas...`;

    // Seleccionar datos del nivel
    const inicio = (nivel - 1) * paresPorNivel;
    const fin = inicio + paresPorNivel;
    // Validamos que existan datos suficientes, si no, cortamos
    const datosNivel = baseDatos.slice(inicio, Math.min(fin, baseDatos.length));

    // Generar cartas
    datosNivel.forEach(dato => {
        crearCartaImagen(dato.id, dato.img1);
        crearCartaImagen(dato.id, dato.img2);
    });

    // Mostrar boca arriba
    setTimeout(() => {
        document.querySelectorAll('.card').forEach(c => c.classList.add('active'));
    }, 100);
}

// FUNCIÓN MODIFICADA PARA IMÁGENES
function crearCartaImagen(id, rutaImagen) {
    const carta = document.createElement('div');
    carta.classList.add('card');
    carta.dataset.valor = id;

    const caraTrasera = document.createElement('div');
    caraTrasera.classList.add('back');

    const caraFrente = document.createElement('div');
    caraFrente.classList.add('face');
    
    // --- MEJORA: Texto de respaldo si falla la imagen ---
    const texto = document.createElement('span');
    texto.innerText = id;
    texto.style.fontSize = '3rem';
    texto.style.fontWeight = 'bold';
    texto.style.color = '#8B6220';
    texto.style.display = 'none';
    caraFrente.appendChild(texto);

    //Creamos una etiqueta <img>
    const imagen = document.createElement('img');
    imagen.src = rutaImagen;
    imagen.alt = `Carta ${id}`;
    // Si la imagen no carga, ocultamos la imagen y mostramos el número
    imagen.onerror = function() { 
        this.style.display = 'none';
        texto.style.display = 'block';
    }; 
    
    caraFrente.appendChild(imagen);
    carta.appendChild(caraTrasera);
    carta.appendChild(caraFrente);
    
    carta.addEventListener('click', manejarClick);
    
    cartasEnMesa.push(carta);
    tablero.appendChild(carta);
}

// 2. REVOLVER
function faseRevolver() {
    btnBoton.disabled = true;
    lblStats.innerText = "Revolviendo...";

    // Voltear boca abajo
    document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));

    setTimeout(() => {
        // Mezclar
        for (let i = cartasEnMesa.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cartasEnMesa[i], cartasEnMesa[j]] = [cartasEnMesa[j], cartasEnMesa[i]];
        }
        
        // Reordenar en DOM
        cartasEnMesa.forEach(carta => tablero.appendChild(carta));
        
        bloqueoTablero = false;
        lblStats.innerText = `Puntos: ${puntos} | 0 intentos`;
        intentos = 0;
        btnBoton.innerText = "Jugando...";
    }, 600);
}

// 3. JUEGO
function manejarClick(e) {
    if (bloqueoTablero) return;

    const carta = e.target.closest('.card');
    if (!carta || carta.classList.contains('active') || cartasSeleccionadas.length >= 2) return;

    carta.classList.add('active');
    cartasSeleccionadas.push(carta);

    if (cartasSeleccionadas.length === 2) {
        intentos++;
        lblStats.innerText = `Puntos: ${puntos} | ${intentos} intentos`;
        verificarPareja();
    }
}

function verificarPareja() {
    const [c1, c2] = cartasSeleccionadas;

    if (c1.dataset.valor === c2.dataset.valor) {
        cartasSeleccionadas = [];
        paresEncontrados++;
        puntos += 100; // Sumar puntos por acierto
        lblStats.innerText = `Puntos: ${puntos} | ${intentos} intentos`;
        verificarVictoria();
    } else {
        puntos -= 10; // Restar puntos por error
        if (puntos < 0) puntos = 0; // Evitar puntos negativos
        lblStats.innerText = `Puntos: ${puntos} | ${intentos} intentos`;
        bloqueoTablero = true;
        setTimeout(() => {
            c1.classList.remove('active');
            c2.classList.remove('active');
            cartasSeleccionadas = [];
            bloqueoTablero = false;
        }, 1000);
    }
}

function verificarVictoria() {
    // Verificamos si encontramos todos los pares cargados en mesa
    // (Útil si un nivel tiene menos de 10 pares por falta de imágenes)
    if (paresEncontrados === (cartasEnMesa.length / 2)) {
        lblStats.innerText = `¡Nivel Completado! Puntos: ${puntos}`;
        btnBoton.innerText = "Siguiente Nivel";
        btnBoton.disabled = false;
    }
}

// Función para ocultar la bienvenida y arrancar el juego
function iniciarSistema() {
    // 1. Efecto visual de desvanecimiento (opcional, pero se ve bien)
    const welcomeScreen = document.getElementById('welcome-screen');
    welcomeScreen.style.opacity = '0';
    welcomeScreen.style.transition = 'opacity 0.5s';

    setTimeout(() => {
        // 2. Quitar la pantalla por completo
        welcomeScreen.style.display = 'none';
        
        // 3. Mostrar la interfaz del juego
        document.getElementById('ui-controls').style.display = 'flex';
        document.getElementById('stats').style.display = 'block';

        // 4. Cargar el primer nivel automáticamente
        // (Asegúrate de que no se cargue doble si tenías un cargarNivel al inicio)
        cargarNivel(1); 
        
    }, 500); // Espera 0.5s a que termine la animación
}
