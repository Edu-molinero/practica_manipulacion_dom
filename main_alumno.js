/* =========================================================================
   Tema 5 – Práctica DOM - Archivo del Alumno
   
   INSTRUCCIONES:
   1. Completa la funcionalidad de cada ejercicio siguiendo los comentarios
   2. Usa solo JavaScript vanilla (sin librerías externas)
   3. Sigue el patrón del Ejercicio 1 que está completado como ejemplo
   ========================================================================= */

/* ==============================================================
   Ejercicio 1 – Selectores y modificación (EJEMPLO COMPLETADO)
   ============================================================== */

// 1. Seleccionamos los elementos que vamos a usar
const contenido = document.getElementById('contenido');
const btnEj1 = document.getElementById('btn-ej1');

// 2. Añadimos el evento click al botón
btnEj1.addEventListener('click', function () {

    const primerParrafo = contenido.querySelector('p');
    primerParrafo.textContent = 'Este texto ha sido modificado con JavaScript';

    const segundoParrafo = contenido.querySelectorAll('p')[1];
    if (segundoParrafo) {
        segundoParrafo.style.color = 'blue';
    }

    const todosLosParrafos = contenido.querySelectorAll('p');
    for (let i = 0; i < todosLosParrafos.length; i++) {
        todosLosParrafos[i].classList.add('resaltado');
    }
});

/* ============================================================
   TODO: Ejercicio 2 – Crear y eliminar elementos del DOM
   ============================================================ */

// TODO: 1. Seleccionar los botones con IDs: btn-add y btn-remove
const contenido2 = document.getElementById('contenido2');
const btnAdd = document.getElementById('btn-add');
const btnRemove = document.getElementById('btn-remove');



// TODO: 2. Crear función para el botón "Añadir párrafo"
//         - Crear un nuevo elemento <p>
//         - Asignar texto: "Nuevo párrafo añadido"
//         - Añadir clase Bootstrap: "mb-2"
//         - Agregarlo al contenedor #contenido
//         - Aplicar eventos hover (función del ejercicio 3)
// Aplicar hover/toggle a un párrafo
function aplicarHover(parrafo) {
    if (!parrafo) return;
    parrafo.style.cursor = 'pointer';
    parrafo.addEventListener('mouseover', function () {
        parrafo.style.backgroundColor = '#e7f5ff';
    });
    parrafo.addEventListener('mouseout', function () {
        parrafo.style.backgroundColor = '';
    });
    parrafo.addEventListener('click', function () {
        parrafo.classList.toggle('completada');
    });
}

// Reusable fade + remove helper
function eliminarConFade(element) {
    if (!element) return;
    element.classList.add('fade-out');
    const onTransitionEnd = function () {
        if (element.parentNode) element.parentNode.removeChild(element);
        element.removeEventListener('transitionend', onTransitionEnd);
    };
    element.addEventListener('transitionend', onTransitionEnd);
    setTimeout(function () {
        if (element.parentNode) {
            try { element.parentNode.removeChild(element); } catch (e) { /* ignore */ }
        }
    }, 700);
}

function anadirParrafo() {
    const nuevoParrafo = document.createElement('p');
    nuevoParrafo.textContent = 'Nuevo párrafo añadido';
    nuevoParrafo.classList.add('mb-2');

    if (contenido2.firstChild) {
        contenido2.insertBefore(nuevoParrafo, contenido2.firstChild);
    } else {
        contenido2.appendChild(nuevoParrafo);
    }
    aplicarHover(nuevoParrafo);
}
if (btnAdd) btnAdd.addEventListener('click', anadirParrafo);
function eliminarParrafo() {
    // Primero, intentar borrar párrafos añadidos en Ejercicio 2 (#contenido2)
    if (contenido2) {
        const parrafos2 = contenido2.getElementsByTagName('p');
        if (parrafos2.length > 0) {
            // Como los párrafos nuevos se insertan al principio, el más reciente es parrafos2[0]
            const masReciente = parrafos2[0];
            eliminarConFade(masReciente);
            return;
        }
    }

    // Si no hay párrafos en contenido2, actuamos sobre contenido (Ejercicio 1)
    if (!contenido) return;
    const parrafosEj1 = contenido.querySelectorAll('p');
    if (parrafosEj1.length <= 1) {
        alert('El primer párrafo no puede ser eliminado.');
        return;
    }
    const ultimo = parrafosEj1[parrafosEj1.length - 1];
    const primero = parrafosEj1[0];
    if (!ultimo || ultimo === primero) {
        alert('El primer párrafo no puede ser eliminado.');
        return;
    }
    eliminarConFade(ultimo);
}





/* ==========================================
   TODO: Ejercicio 3 – Eventos de ratón (hover)
   ========================================== */

// TODO: 1. Crear función para cuando entra el ratón
//         - Cambiar backgroundColor a '#e7f5ff'

// TODO: 2. Crear función para cuando sale el ratón
//         - Restaurar backgroundColor a ''

// TODO: 3. Crear función para aplicar eventos hover a un párrafo
//         - Usar addEventListener para 'mouseover' y 'mouseout'

// TODO: 4. Aplicar hover a todos los párrafos existentes inicialmente


const contenido3 = document.querySelector('#contenido3');
contenido3.addEventListener('mouseover', function () {
    contenido3.style.backgroundColor = '#e7f5ff';
});
contenido3.addEventListener('mouseout', function () {
    contenido3.style.backgroundColor = '';
});

contenido.addEventListener('mouseover', function () {
    contenido.style.backgroundColor = '#e7f5ff';
});
contenido.addEventListener('mouseout', function () {
    contenido.style.backgroundColor = '';
});


/* ======================================================
   TODO: Ejercicio 4 – Trabajar con inputs y formularios
   ====================================================== */

// TODO: 1. Seleccionar elementos: input (#nuevoTexto), botón (#btn-cambiar), mensaje error (#msg-ej4)

// TODO: 2. Crear función para el botón "Cambiar texto"
//         - Obtener valor del input (usar .trim())
//         - Si está vacío: mostrar mensaje error, enfocar input
//         - Si tiene texto: ocultar error, cambiar texto del primer párrafo
const inputNuevoTexto = document.getElementById('nuevoTexto');
const btnCambiar = document.getElementById('btn-cambiar');
const msgEj4 = document.getElementById('msg-ej4');

if (btnCambiar && inputNuevoTexto) {
    btnCambiar.addEventListener('click', function () {
        const valor = inputNuevoTexto.value.trim();
        if (!valor) {
            if (msgEj4) msgEj4.classList.remove('d-none');
            inputNuevoTexto.focus();
            return;
        }
        
        if (msgEj4) msgEj4.classList.add('d-none');

        const primer = contenido.querySelector('p');
        if (primer) primer.textContent = valor;
    });
}

/* ===================================================
   TODO: Ejercicio 5 – Lista de tareas (To-Do List)
   =================================================== */

// TODO: 1. Seleccionar elementos: input (#tareaInput), botones (#btn-tarea, #btn-borrar-completadas), lista (#listaTareas)

// TODO: 2. Función para añadir tarea
//         - Obtener texto del input
//         - Si no está vacío: crear <li>, añadir texto, agregar evento click para toggle clase 'completada'
//         - Limpiar input y enfocar

// TODO: 3. Función para borrar tareas completadas
//         - Buscar todos los <li> con clase 'completada'
//         - Eliminar cada uno de la lista
const tareaInput = document.getElementById('tareaInput');
const btnTarea = document.getElementById('btn-tarea');
const btnBorrarCompletadas = document.getElementById('btn-borrar-completadas');
const listaTareas = document.getElementById('listaTareas');

function anadirTarea() {
    const textoTarea = tareaInput.value.trim();
    if (textoTarea) {
        const nuevoLi = document.createElement('li');
        nuevoLi.textContent = textoTarea;
        nuevoLi.addEventListener('click', function () {
            this.classList.toggle('completada');
        });
        listaTareas.appendChild(nuevoLi);
        tareaInput.value = '';
        tareaInput.focus();
    }
}
if (btnTarea && tareaInput && listaTareas) btnTarea.addEventListener('click', anadirTarea);

function borrarCompletadas() {
    const tareasCompletadas = listaTareas.querySelectorAll('li.completada');
    tareasCompletadas.forEach(function (tarea) {
        listaTareas.removeChild(tarea);
    });
}
if (btnBorrarCompletadas && listaTareas) btnBorrarCompletadas.addEventListener('click', borrarCompletadas);






/* ===================================================
   CONSEJOS PARA LOS ALUMNOS:
   
   - Usa console.log() para depurar tu código
   - Prueba cada función por separado antes de continuar
   - Recuerda usar IDs únicos para cada elemento
   - Las clases CSS ya están definidas en custom.css
   - Si algo no funciona, revisa la consola del navegador
   =================================================== */