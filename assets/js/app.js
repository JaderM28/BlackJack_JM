//Estructura Patron Modular

(() => {
    'use strict'

    // Establecemos Array
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especial = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = []

    // Referencias HTML
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');
    
    btnPedir.disabled = true;
    btnDetener.disabled = true

    const resultPunt = document.querySelectorAll('span'),
        divCartasJugador = document.querySelectorAll('.divCartas')
    
    // Funcion Iniciar Juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck()

        puntosJugadores = []
        for(let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }

        resultPunt.forEach( elem => elem.textContent = 0)
        divCartasJugador.forEach( elem => elem.innerHTML = '')

        btnDetener.disabled = false;
        btnPedir.disabled = false;
    }
    
    // Esta Funcion Crea un Nuevo Deck
    const crearDeck = () => {
        deck = []
        for (const tipo of tipos) {
            for( let i = 2; i <= 10; i++){
                deck.push( i + tipo)
            } 
            for (const espec of especial){
                deck.push(espec + tipo)
            }
        }
        return _.shuffle( deck)
    }

    
    // Esta Funcion Permite Pedir Cartas
    const pedirCarta = () => {
        const indiceDeck = Math.floor(Math.random() * deck.length)
        return ( deck.length === 0)
            ? (() => { throw 'No hay Cartas en el Deck'; })()
            : deck.splice(indiceDeck, 1)[0] 
    }

    // Esta Funcion Convierte Carta a Puntos
    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1)
        return (!isNaN(valor)) 
                ? valor * 1 
                : (valor != 'A') ?10 :11
    }

    // Esta Funcion Acumula los Puntos
    const acumularPuntos = ( carta, turno) => {
        puntosJugadores[turno] += valorCarta( carta )
        resultPunt[turno].innerText = puntosJugadores[turno]
        return puntosJugadores[turno]
    }

    // Esta Funcion Crea Cartas
    const crearCarta = ( carta, turno ) => {
        const imgCarta = document.createElement('img');
            imgCarta.classList.add('carta')
            imgCarta.src = `./assets/cartas/${carta}.png`;
            divCartasJugador[turno].append( imgCarta)
    }

    // Esta Funcion Determina Ganador 
    const determinarGanador = () => {
        const [puntosMinimos, puntosComputadora] = puntosJugadores

        setTimeout(() => {
            if( puntosComputadora === puntosMinimos){
                Swal.fire({
                    icon: 'warning',
                    title: 'Nadie Gana, Empate!',
                    showConfirmButton: true
                })
            } else if (puntosMinimos > 21){
                Swal.fire({
                    icon: 'error',
                    title: 'Lo siento, Perdiste!',
                    showConfirmButton: true
                })
            } else if (puntosComputadora > 21){
                Swal.fire({
                    icon: 'success',
                    title: 'Felicidades, Ganaste!',
                    showConfirmButton: true
                })
            } else if (puntosComputadora > puntosMinimos){
                Swal.fire({
                    icon: 'error',
                    title: 'Lo siento, Perdiste!',
                    showConfirmButton: true
                })
            } 
        }, 500)
    }

    // Esta Funcion Muestra Puntos Computadora
    const turnoComputadora = ( puntosMinimos ) => {
        let puntosComputadora = 0

        do {
            const carta = pedirCarta()
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1)
            crearCarta(carta, puntosJugadores.length - 1)
            
            if(puntosMinimos > 21){
                break
            }
        }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) )

        determinarGanador()
    }

    // Seccion Eventos

    // Boton Pedir Cartas
    btnPedir.addEventListener('click', () => {
        
        const carta = pedirCarta()
        let puntosJugador = acumularPuntos(carta, 0)
        crearCarta(carta, 0)

        if(puntosJugador > 21){
            turnoComputadora(puntosJugador)

            btnPedir.disabled = true;
            btnDetener.disabled = true

        }else if (puntosJugador === 21){
            turnoComputadora(puntosJugador)

            btnPedir.disabled = true;
            btnDetener.disabled = true
        }
    })

    // Boton Detener Cartas
    btnDetener.addEventListener('click', () => {
        const [puntosJugador] = puntosJugadores

        btnPedir.disabled = true
        btnDetener.disabled = true

        turnoComputadora(puntosJugador)
    })

    // Boton Nuevo Juego
    btnNuevo.addEventListener('click', () => {
        
        inicializarJuego()
  
    })

})();

/* (function(){

})() */
















