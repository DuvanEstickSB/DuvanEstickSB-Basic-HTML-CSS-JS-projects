var contadorClics = 0;
var tiempoSeleccionado = 5;
var tiempoRestante = 0;
var temporizador;
var testActivo = false;
var testFinalizado = false;

window.onload = function() {
    const areaClic = document.getElementById("area-clic");
    const textoClic = document.getElementById("texto-clic");
    const textoResultado = document.getElementById("texto-resultado");

    const boton5seg = document.getElementById("tiempo-5");
    const boton10seg = document.getElementById("tiempo-10");
    const boton20seg = document.getElementById("tiempo-20");
    const boton30seg = document.getElementById("tiempo-30");

    const botonesT = [boton5seg, boton10seg, boton20seg, boton30seg];
    boton5seg.classList.add("seleccionado");
    
    const botonReinicio = document.getElementById("boton-reinicio");

    function seleccionarTiempo(segundos, boton) {
        if (!testActivo && !testFinalizado) {
            tiempoSeleccionado = segundos;
            for (let i = 0; i < botonesT.length; i++) {
                botonesT[i].classList.remove("seleccionado");
            }
            boton.classList.add("seleccionado");
        }
    }

    boton5seg.onclick = function() { seleccionarTiempo(5, this); };
    boton10seg.onclick = function() { seleccionarTiempo(10, this); };
    boton20seg.onclick = function() { seleccionarTiempo(20, this); };
    boton30seg.onclick = function() { seleccionarTiempo(30, this); };

    areaClic.onclick = function() {
        if (!testActivo && !testFinalizado) {
            empezarTest();
        } 
        else if(testActivo) {
            contadorClics++;
            textoClic.textContent = contadorClics + " clics";
        }
    };
    
    botonReinicio.onclick = function() {
        if (testFinalizado) {
            reiniciarTest();
        }
    };

    function empezarTest() {
        testActivo = true;
        testFinalizado = false;
        contadorClics = 0;
        tiempoRestante = tiempoSeleccionado;
        
        textoClic.textContent = "¡CLICA AHORA!";
        
        temporizador = setInterval(function() {
            tiempoRestante--;
            textoClic.textContent = contadorClics + " clics (" + tiempoRestante + "s)";
            
            if (tiempoRestante <= 0) {
                finalizarTest();
            }
        }, 1000);
    }

    function finalizarTest() {
        clearInterval(temporizador);
        
        testActivo = false;
        testFinalizado = true;

        let cps = contadorClics / tiempoSeleccionado;
        cps = Math.round(cps * 100) / 100;
        
        textoClic.textContent = "TEST FINALIZADO";
        textoResultado.textContent = cps + " CPS (" + contadorClics + " clics totales)";
    }


    function reiniciarTest() {
        testFinalizado = false;
        contadorClics = 0;
        textoClic.textContent = "HACER CLICK PARA EMPEZAR";
        textoResultado.textContent = "0 CPS";
    }
}