class alumno {

    constructor(nombre, apellidos, edad, rut, direccion, telefono, correo, materias, calificaciones) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.rut = rut;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correo = correo;
        this.materias = materias || [];
        this.calificaciones = calificaciones || {};
    };

    pushAlumno() {
        alumnos.push(this)
        return;
    }
}





let alumnos = []
let nvoAlumno = []
let alumnoEditandoIndex = null; // Índice del alumno que se está editando

function guardarAlumno() {
    event.preventDefault();

    const nombreAlumno = document.querySelector("#nombre").value.trim();
    const apellidosAlumno = document.querySelector("#apellidos").value.trim();
    const edadAlumno = document.querySelector("#edad").value.trim();
    const rutAlumno = document.querySelector("#rut").value.trim();
    const direccionAlumno = document.querySelector("#direccion").value.trim();
    const telefonoAlumno = document.querySelector("#telefono").value.trim();
    const correoAlumno = document.querySelector("#correo").value.trim();
    const materiasAlumno = Array.from(document.querySelector("#materias").selectedOptions)
        .map(option => option.value)
        .filter(value => value !== "Selecciona una materia"); // Excluir opciones inválidas

    console.log("Materias seleccionadas:", materiasAlumno); // Depuración

    if (!nombreAlumno || !apellidosAlumno || !edadAlumno) {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
    }

    if (materiasAlumno.length === 0) {
        alert("Por favor, seleccione al menos una materia.");
        return;
    }

    if (alumnoEditandoIndex !== null) {
        // Actualizar un alumno existente
        const alumno = alumnos[alumnoEditandoIndex];
        alumno.nombre = nombreAlumno;
        alumno.apellidos = apellidosAlumno;
        alumno.edad = edadAlumno;
        alumno.rut = rutAlumno;
        alumno.direccion = direccionAlumno;
        alumno.telefono = telefonoAlumno;
        alumno.correo = correoAlumno;

        materiasAlumno.forEach(materia => {
            if (!alumno.materias.includes(materia)) {
                alumno.materias.push(materia);
                alumno.calificaciones[materia] = []; // Inicializar calificaciones para la nueva materia
            }
        });

        alert("Alumno actualizado correctamente.");
        alumnoEditandoIndex = null;
    } else {
        // Crear un nuevo alumno
        const calificacionesIniciales = {};
        materiasAlumno.forEach(materia => {
            calificacionesIniciales[materia] = []; // Inicializar calificaciones para cada materia
        });

        const nuevoAlumno = new alumno(
            nombreAlumno,
            apellidosAlumno,
            edadAlumno,
            rutAlumno,
            direccionAlumno,
            telefonoAlumno,
            correoAlumno,
            materiasAlumno,
            calificacionesIniciales
        );

        nuevoAlumno.pushAlumno();
        alert("Alumno guardado correctamente.");
    }

    limpiarFormulario();
    reiniciarBotonesSeleccionar();
    actualizarSelectAlumnos(); // Actualizar el select de alumnos después de guardar
}

document.getElementById("btnGuardarAlumno").addEventListener("click", guardarAlumno);





function reiniciarBotonesSeleccionar() {
    const botonesSeleccionar = document.querySelectorAll("#resultsList button");
    botonesSeleccionar.forEach(boton => {
        boton.textContent = "Seleccionar";
        boton.disabled = false; // Habilitar los botones nuevamente
    });
}




function limpiarFormulario() {
    document.querySelector("#nombre").value = "";
    document.querySelector("#apellidos").value = "";
    document.querySelector("#edad").value = "";
    document.querySelector("#rut").value = "";
    document.querySelector("#direccion").value = "";
    document.querySelector("#telefono").value = "";
    document.querySelector("#correo").value = "";
    document.querySelector("#materias").selectedIndex = 0; // Reiniciar la selección de materias

    // Reiniciar el índice del alumno editando
    alumnoEditandoIndex = null;
}



// Evento para mostrar la sección de inscripción

document.getElementById("pInscribir").addEventListener("click", () => {
    const pInscripcion = document.getElementById("pInscripcion");
    pInscripcion.style.display = "";

});




// Función para buscar alumnos

function buscarAlumno(event) {
    event.preventDefault();

    const searchValue = document.querySelector("#search").value.toLowerCase(); // Obtiene el valor del input
    const resultados = alumnos.filter((alumno, index) =>
        alumno.nombre.toLowerCase().includes(searchValue) ||
        alumno.apellidos.toLowerCase().includes(searchValue) ||
        alumno.rut.toString().includes(searchValue)
    );

    const h3 = document.querySelector("#h3ResultsList");

    const resultsList = document.querySelector("#resultsList");
    resultsList.innerHTML = "";

    if (resultados.length > 0) {
        resultados.forEach((alumno, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                ${alumno.nombre} ${alumno.apellidos} (RUT: ${alumno.rut})
                <button onclick="cargarDatosAlumno(${alumnos.indexOf(alumno)})">Seleccionar</button>
            `;
            resultsList.appendChild(listItem);
        });
        h3.innerHTML = "Resultados de la búsqueda:";

    } else {
        const noResultsItem = document.createElement("li");
        noResultsItem.textContent = "No se encontraron alumnos con ese criterio.";
        resultsList.appendChild(noResultsItem);
    }

    document.querySelector("#search").value = ""; 
    setTimeout(() => {
        h3.innerHTML = "";
        resultsList.innerHTML = "";
    }, 10000);
}

// Agregar el evento al formulario de búsqueda
document.querySelector("form[role='search']").addEventListener("submit", buscarAlumno);





function cargarDatosAlumno(index) {
    const alumnoSeleccionado = alumnos[index];

    // Cargar los datos del alumno en los inputs
    document.querySelector("#nombre").value = alumnoSeleccionado.nombre;
    document.querySelector("#apellidos").value = alumnoSeleccionado.apellidos;
    document.querySelector("#edad").value = alumnoSeleccionado.edad;
    document.querySelector("#rut").value = alumnoSeleccionado.rut;
    document.querySelector("#direccion").value = alumnoSeleccionado.direccion;
    document.querySelector("#telefono").value = alumnoSeleccionado.telefono;
    document.querySelector("#correo").value = alumnoSeleccionado.correo;

    // Guardar el índice del alumno que se está editando
    alumnoEditandoIndex = index;

    // Deshabilitar el botón "Seleccionar" correspondiente
    const botonesSeleccionar = document.querySelectorAll("#resultsList button");
    botonesSeleccionar.forEach((boton, i) => {
        if (i === index) {
            boton.textContent = "Editando...";
            boton.disabled = true;
        } else {
            boton.textContent = "Seleccionar";
            boton.disabled = false;
        }
    });

    console.log(`Datos del alumno ${alumnoSeleccionado.nombre} cargados para edición.`);
}



// Función para guardar las notas
function guardarNotas(index, materia) {
    const inputs = document.querySelectorAll(`.nota-input[data-index="${index}"]`);
    const notas = Array.from(inputs).map(input => parseFloat(input.value) || 0);

    // Validar que las notas sean válidas
    if (notas.some(nota => nota < 0 || nota > 10)) {
        alert("Por favor, ingresa notas válidas (entre 0 y 10).");
        return;
    }

    // Guardar las notas en la materia correspondiente
    if (!alumnos[index].calificaciones[materia]) {
        alumnos[index].calificaciones[materia] = [];
    }
    alumnos[index].calificaciones[materia].push(...notas);

    alert(`Notas guardadas para ${alumnos[index].nombre} en la materia ${materia}.`);
    console.log(`Alumno actualizado:`, alumnos[index]);
}

document.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", event => {
        const materiaSeleccionada = event.target.textContent.trim();
        mostrarGrid(materiaSeleccionada);
    });
});


// Función para calcular el promedio de notas

function calcularPromedio(notas) {
    // Filtrar notas válidas (números mayores o iguales a 0)
    const notasValidas = notas.filter(nota => !isNaN(nota) && nota >= 0);

    if (notasValidas.length === 0) return "Sin notas"; // Si no hay notas válidas, retorna "Sin notas"

    const suma = notasValidas.reduce((acc, nota) => acc + nota, 0); // Sumar las notas válidas
    const promedio = suma / notasValidas.length; // Dividir entre la cantidad de notas válidas
    return promedio.toFixed(2); // Redondear a 2 decimales
}


// Función para actualizar el promedio al cambiar una nota

function actualizarPromedio(index, materia) {
    const inputs = document.querySelectorAll(`.nota-input[data-index="${index}"][data-materia="${materia}"]`);
    const notas = Array.from(inputs).map(input => parseFloat(input.value) || NaN); // Convertir valores a números o NaN

    // Actualizar las notas en el objeto del alumno
    alumnos[index].calificaciones[materia] = notas;

    // Calcular el nuevo promedio
    const promedio = calcularPromedio(notas);

    // Actualizar la celda del promedio en la tabla
    const row = inputs[0].closest("tr");
    const promedioCell = row.querySelector(".promedio-cell");
    promedioCell.textContent = promedio;
}



// Grilla de alumnos en todas las pantallas

function mostrarGrid(materiaSeleccionada) {
    const dataGrid = document.querySelector("#dataGrid tbody");
    const h1Grid = document.querySelector("#h1Grid");

    // Limpiar el grid y el título
    dataGrid.innerHTML = "";
    h1Grid.textContent = `Notas para la materia: ${materiaSeleccionada}`;

    // Filtrar alumnos inscritos en la materia seleccionada
    const alumnosFiltrados = alumnos.filter(alumno =>
        alumno.materias.some(materia => materia.toLowerCase().trim() === materiaSeleccionada.toLowerCase().trim())
    );

    if (alumnosFiltrados.length === 0) {
        const row = dataGrid.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 9; // Número de columnas
        cell.textContent = "No hay alumnos inscritos en esta materia.";
        return;
    }

    // Crear filas para cada alumno
    alumnosFiltrados.forEach((alumno, index) => {
        const row = dataGrid.insertRow();

        // Columna para el nombre del alumno
        const nameCell = row.insertCell();
        nameCell.textContent = alumno.nombre;

        // Columna para el apellido del alumno
        const lastNameCell = row.insertCell();
        lastNameCell.textContent = alumno.apellidos;

        // Crear columnas para las 6 notas
        for (let i = 0; i < 6; i++) {
            const notaCell = row.insertCell();
            const nota = alumno.calificaciones[materiaSeleccionada]?.[i] || ""; // Obtener la nota o dejar vacío
            notaCell.innerHTML = `
                <input type="number" class="nota-input" data-index="${index}" data-nota="${i}" data-materia="${materiaSeleccionada}" min="0" max="10" value="${nota}" placeholder="Nota ${i + 1}" onchange="actualizarPromedio(${index}, '${materiaSeleccionada}')">
            `;
        }

        // Columna para el promedio
        const promedioCell = row.insertCell();
        promedioCell.classList.add("promedio-cell");
        promedioCell.textContent = calcularPromedio(alumno.calificaciones[materiaSeleccionada] || []);
    });
}





let grupos = []; 


// Función para crear un grupo

function crearGrupo() {
    const nombreGrupo = document.querySelector("#nombreGrupo").value.trim();

    if (!nombreGrupo) {
        alert("Por favor, ingresa un nombre para el grupo.");
        return;
    }

    if (grupos.some(grupo => grupo.nombre === nombreGrupo)) {
        alert("Ya existe un grupo con este nombre.");
        return;
    }

    grupos.push({ nombre: nombreGrupo, alumnos: [] });
    actualizarListaGrupos(); // Actualiza la lista de grupos
    alert(`Grupo "${nombreGrupo}" creado correctamente.`);
    document.querySelector("#nombreGrupo").value = ""; // Limpia el input
}




// Función para asignar un alumno a un grupo
function asignarAlumnoAGrupo() {
    const grupoSeleccionado = document.querySelector("#grupoSelect").value;
    const alumnoSeleccionadoIndex = parseInt(document.querySelector("#alumnoSelect").value, 10);

    if (!grupoSeleccionado || isNaN(alumnoSeleccionadoIndex)) {
        alert("Por favor, selecciona un grupo y un alumno.");
        return;
    }

    const grupo = grupos.find(grupo => grupo.nombre === grupoSeleccionado);
    const alumno = alumnos[alumnoSeleccionadoIndex];

    if (grupo.alumnos.some(a => a.rut === alumno.rut)) {
        alert("El alumno ya está asignado a este grupo.");
        return;
    }

    grupo.alumnos.push(alumno);
    actualizarListaGrupos();
    alert(`Alumno "${alumno.nombre} ${alumno.apellidos}" asignado al grupo "${grupoSeleccionado}".`);
}




// Función para actualizar la lista de grupos y sus alumnos
function actualizarListaGrupos() {
    const dropdownMenu = document.querySelector("#dropdownMenu");
    dropdownMenu.innerHTML = ""; // Limpia la lista antes de actualizarla

    grupos.forEach(grupo => {
        const grupoItem = document.createElement("li");
        grupoItem.innerHTML = `
            <a class="dropdown-item" href="#pGrilla">${grupo.nombre}</a>
        `;
        dropdownMenu.appendChild(grupoItem); // Agrega el <li> al <ul>
    });
}




// Función para actualizar el select de grupos
function actualizarSelectGrupos() {
    const grupoSelect = document.querySelector("#grupoSelect");
    grupoSelect.innerHTML = '<option selected disabled>Selecciona un grupo...</option>';

    console.log("Grupos registrados:", grupos); // Depuración

    grupos.forEach(grupo => {
        const option = document.createElement("option");
        option.value = grupo.nombre;
        option.textContent = grupo.nombre;
        grupoSelect.appendChild(option);
    });
}




// Función para actualizar el select de alumnos
function actualizarSelectAlumnos() {
    const alumnoSelect = document.querySelector("#alumnoSelect");
    alumnoSelect.innerHTML = '<option selected disabled>Selecciona un alumno...</option>';

    console.log("Hay ", alumnos.length, " alumnos registrados.");

    if (alumnos.length == 0) {
        const option = document.createElement("option");
        option.disabled = true;
        option.textContent = "No hay alumnos registrados.";
        alumnoSelect.appendChild(option);
        return;
    }

    alumnos.forEach((alumno, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${alumno.nombre} ${alumno.apellidos}`;
        alumnoSelect.appendChild(option);
    });
}




// Eventos
document.querySelector("#btnCrearGrupo").addEventListener("click", () => {
    crearGrupo();
    actualizarSelectGrupos(); // Actualizar el select de grupos después de crear un grupo
    actualizarSelectAlumnos(); // Actualizar el select de alumnos después de crear un grupo
});

document.querySelector("#btnAsignarAlumno").addEventListener("click", asignarAlumnoAGrupo);

document.querySelector("#pGruposLink").addEventListener("click", () => {
    const pGrupos = document.querySelector("#pGrupos");
    pGrupos.style.display = ""; // Mostrar la sección de grupos

    const pInscripcion = document.querySelector("#pInscripcion");
    pInscripcion.style.display = "none"; // Ocultar la sección de inscripción
});
