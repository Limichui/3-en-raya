// Inicializa el jugador actual 'X'
let jugador = 'X';

// Inicializa el tablero como un array vacío de 9 elementos
let tablero = ['', '', '', '', '', '', '', '', ''];

// Variable para controlar si el juego sigue activo
let juegoActivo = true;

// Reglas para ganar: combinaciones de índices que representan las posiciones de las celdas
const reglasParaGanar = [
    [0, 1, 2], // Fila superior
    [3, 4, 5], // Fila del medio
    [6, 7, 8], // Fila inferior
    [0, 3, 6], // Columna izquierda
    [1, 4, 7], // Columna central
    [2, 5, 8], // Columna derecha
    [0, 4, 8], // Diagonal principal
    [2, 4, 6]  // Diagonal inversa
];

window.addEventListener('load', () => {

    // Selecciona todas las celdas del tablero
    const cells = document.querySelectorAll('.cell');

    // Selecciona el elemento que muestra los mensajes del juego
    const mensaje = document.getElementById('mensaje');

    // Selecciona el botón de reinicio
    const reiniciarBtn = document.getElementById('reiniciar');

    // Inicializa el mensaje indicando que es el turno del  jugador 'X'
    mensaje.textContent = `Turno del jugador ${jugador}`;
   
    function visualizarClickCelda(e) {
        // Obtiene la celda que fue clickeada
        const clickCelda= e.target;

        // Obtiene el índice de la celda clickeada (del 0 al 8)
        const cellIndex = clickCelda.getAttribute('data-index');

        // Si la celda ya fue clickeada o el juego ya terminó, no hacer nada
        if (tablero[cellIndex] !== '' || !juegoActivo) {
            return;
        }

        // Actualiza el estado del tablero con el símbolo del jugador actual
        tablero[cellIndex] = jugador;

        // Muestra el símbolo del jugador actual en la celda clickeada
        clickCelda.textContent = jugador;

        // Verifica si hay un ganador o si el juego ha terminado
        verificarGanador();
    }

    function verificarGanador() {
        // Variable para determinar si un jugador ha ganado
        let ganador = false;

        // Recorre todas las reglas para ganar
        for (let i = 0; i < reglasParaGanar.length; i++) {
            const reglaGanadora = reglasParaGanar[i];
            
            // Obtiene los valores de las posiciones del tablero de la regla actual
            let a = tablero[reglaGanadora[0]];
            let b = tablero[reglaGanadora[1]];
            let c = tablero[reglaGanadora[2]];

            // Si alguna de las posiciones está vacía, pasa a la siguiente condición
            if (a === '' || b === '' || c === '') {
                continue;
            }

            // Si los tres valores son iguales, significa que un jugador ha ganado
            if (a === b && b === c) {
                ganador = true;
                break;
            }
        }

        // Si alguien ganó, muestra un mensaje y termina el juego
        if (ganador) {
            mensaje.textContent = `¡Jugador ${jugador} ha ganado!`;
            juegoActivo = false;
            return;
        }

        // Si no hay más espacios vacíos y nadie ganó, es un empate
        if (!tablero.includes('')) {
            mensaje.textContent = '¡Empate!';
            juegoActivo = false;
            return;
        }

        // Cambia el turno al otro jugador
        jugador = jugador === 'X' ? 'O' : 'X';

        // Actualiza el mensaje para indicar el turno del próximo jugador
        mensaje.textContent = `Turno del jugador ${jugador}`;
    }

    function reiniciarJuego() {
        // Restablece el jugador actual a 'X'
        jugador = 'X';

        // Limpia el tablero (vacía todos los espacios)
        tablero = ['', '', '', '', '', '', '', '', ''];

        // Activa el juego nuevamente
        juegoActivo = true;

        // Restablece el mensaje
        mensaje.textContent = `Turno del jugador ${jugador}`;

        // Limpia el contenido de todas las celdas
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }

    // Añade un evento de click a cada celda del tablero
    cells.forEach(cell => cell.addEventListener('click', visualizarClickCelda));

    // Añade un evento de click al botón de reinicio
    reiniciarBtn.addEventListener('click', reiniciarJuego);

});

