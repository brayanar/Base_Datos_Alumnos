const pInscripcion = document.getElementById("pInscripcion");
const pGrilla = document.getElementById("pGrilla");
const pGrupos = document.getElementById("pGrupos");

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





function guardarEnLocalStorage() {
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
    localStorage.setItem("grupos", JSON.stringify(grupos));
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
        .filter(value => value !== "Selecciona una materia");

    // Validar campos obligatorios
    if (!nombreAlumno || !apellidosAlumno) {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
    }

    // Validar la edad (permitir vacío o entre 1 y 80)
    if (edadAlumno && (isNaN(edadAlumno) || edadAlumno < 1 || edadAlumno > 80)) {
        alert("Por favor, ingrese una edad válida (entre 1 y 80 años) o deje el campo vacío.");
        return;
    }

    // Validar el RUT (permitir vacío o entre 8 y 9 números)
    if (rutAlumno && (!/^\d{8,9}$/.test(rutAlumno))) {
        alert("Por favor, ingrese un RUT válido (entre 8 y 9 números) o deje el campo vacío.");
        return;
    }

    if (materiasAlumno.length === 0) {
        alert("Por favor, seleccione al menos una materia.");
        return;
    }

    if (alumnoEditandoIndex !== null) {
        const alumno = alumnos[alumnoEditandoIndex];
        alumno.nombre = nombreAlumno;
        alumno.apellidos = apellidosAlumno;
        alumno.edad = edadAlumno || null; 
        alumno.rut = rutAlumno || null;
        alumno.direccion = direccionAlumno;
        alumno.telefono = telefonoAlumno;
        alumno.correo = correoAlumno;

        materiasAlumno.forEach(materia => {
            if (!alumno.materias.includes(materia)) {
                alumno.materias.push(materia);
                alumno.calificaciones[materia] = [];
            }
        });

        alert("Alumno actualizado correctamente.");
        alumnoEditandoIndex = null;
    } else {
        // Crear un nuevo alumno
        const calificacionesIniciales = {};
        materiasAlumno.forEach(materia => {
            calificacionesIniciales[materia] = [];
        });

        const nuevoAlumno = new alumno(
            nombreAlumno,
            apellidosAlumno,
            edadAlumno || null,
            rutAlumno || null,
            direccionAlumno,
            telefonoAlumno,
            correoAlumno,
            materiasAlumno,
            calificacionesIniciales
        );

        nuevoAlumno.pushAlumno();
        alert("Alumno guardado correctamente.");
    }

    guardarEnLocalStorage();
    limpiarFormulario();
    reiniciarBotonesSeleccionar();
    actualizarSelectAlumnos();
}

document.getElementById("btnGuardarAlumno").addEventListener("click", guardarAlumno);






function reiniciarBotonesSeleccionar() {
    const botonesSeleccionar = document.querySelectorAll("#resultsList button");
    botonesSeleccionar.forEach(boton => {
        boton.textContent = "Seleccionar";
        boton.disabled = false;
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
    document.querySelector("#materias").selectedIndex = 0;

    alumnoEditandoIndex = null;
}





// Función para buscar alumnos

function buscarAlumno(event) {
    event.preventDefault();

    const searchValue = document.querySelector("#search").value.toLowerCase();
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

document.querySelector("form[role='search']").addEventListener("submit", buscarAlumno);





function cargarDatosAlumno(index) {
    const alumnoSeleccionado = alumnos[index];

    document.querySelector("#nombre").value = alumnoSeleccionado.nombre;
    document.querySelector("#apellidos").value = alumnoSeleccionado.apellidos;
    document.querySelector("#edad").value = alumnoSeleccionado.edad;
    document.querySelector("#rut").value = alumnoSeleccionado.rut;
    document.querySelector("#direccion").value = alumnoSeleccionado.direccion;
    document.querySelector("#telefono").value = alumnoSeleccionado.telefono;
    document.querySelector("#correo").value = alumnoSeleccionado.correo;

    alumnoEditandoIndex = index;

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
}



// Función para guardar las notas
function guardarNotas(index, grupo) {
    const inputs = document.querySelectorAll(`.nota-input[data-index="${index}"][data-materia="${grupo}"]`);
    const notas = Array.from(inputs).map(input => parseFloat(input.value) || 0);

    // Validar que las notas sean válidas
    if (notas.some(nota => nota < 0 || nota > 7)) {
        alert("Por favor, ingresa notas válidas (entre 0 y 7).");
        return;
    }

    // Guardar las notas en el grupo correspondiente
    if (!alumnos[index].calificaciones[grupo]) {
        alumnos[index].calificaciones[grupo] = []; 
    }
    alumnos[index].calificaciones[grupo] = notas;

    guardarEnLocalStorage();
    alert(`Notas guardadas para ${alumnos[index].nombre} en el grupo "${grupo}".`);
    console.log(`Alumno actualizado:`, alumnos[index]);
}






function calcularPromedio(notas) {
    const notasValidas = notas.filter(nota => !isNaN(nota) && nota >= 0 && nota <= 7);

    if (notasValidas.length === 0) return "Sin notas"; // Si no hay notas válidas, retorna "Sin notas"

    const suma = notasValidas.reduce((acc, nota) => acc + nota, 0); 
    const promedio = suma / notasValidas.length; 
    return promedio.toFixed(2); 
}



function actualizarPromedio(index, grupo) {
    const inputs = document.querySelectorAll(`.nota-input[data-index="${index}"][data-materia="${grupo}"]`);
    const notas = Array.from(inputs).map(input => parseFloat(input.value) || 0);

    alumnos[index].calificaciones[grupo] = notas;

    const promedio = calcularPromedio(notas);

    const row = inputs[0].closest("tr");
    const promedioCell = row.querySelector(".promedio-cell");
    promedioCell.textContent = promedio;

    guardarEnLocalStorage();
}




function mostrarGrid(materiaSeleccionada) {
    const dataGrid = document.querySelector("#dataGrid tbody");
    const h1Grid = document.querySelector("#h1Grid");

    dataGrid.innerHTML = "";
    h1Grid.textContent = `Notas para la materia: ${materiaSeleccionada}`;

    const alumnosFiltrados = alumnos.filter(alumno =>
        alumno.materias.some(materia => materia.toLowerCase().trim() === materiaSeleccionada.toLowerCase().trim())
    );

    if (alumnosFiltrados.length === 0) {
        const row = dataGrid.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 9;
        cell.textContent = "No hay alumnos inscritos en esta materia.";
        h1Grid.textContent += " - Promedio General: Sin datos";
        return;
    }

    let sumaPromedios = 0;

    // Crear filas para cada alumno
    alumnosFiltrados.forEach((alumno, index) => {
        const row = dataGrid.insertRow();

        // Columna para el nombre del alumno
        const nameCell = row.insertCell();
        nameCell.textContent = alumno.nombre;

        // Columna para el apellido del alumno
        const lastNameCell = row.insertCell();
        lastNameCell.textContent = alumno.apellidos;

        for (let i = 0; i < 6; i++) {
            const notaCell = row.insertCell();
            const nota = alumno.calificaciones[materiaSeleccionada]?.[i] || "";
            notaCell.innerHTML = `
                <input type="number" class="nota-input" data-index="${index}" data-nota="${i}" data-materia="${materiaSeleccionada}" min="1" max="7" value="${nota}" placeholder="Nota ${i + 1}" onchange="actualizarPromedio(${index}, '${materiaSeleccionada}')">
            `;
        }

        const promedioCell = row.insertCell();
        promedioCell.classList.add("promedio-cell");
        const promedio = calcularPromedio(alumno.calificaciones[materiaSeleccionada] || []);
        promedioCell.textContent = promedio;

        // Sumar el promedio al total
        sumaPromedios += parseFloat(promedio) || 0;
    });

    // Calcular el promedio general
    const promedioGeneral = (sumaPromedios / alumnosFiltrados.length).toFixed(2);
    h1Grid.textContent += ` - Promedio General: ${promedioGeneral}`;
}




let grupos = []; 



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
    guardarEnLocalStorage();
    actualizarListaGrupos();
    alert(`Grupo "${nombreGrupo}" creado correctamente.`);
    document.querySelector("#nombreGrupo").value = "";
}




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
    guardarEnLocalStorage();
    actualizarListaGrupos();
    alert(`Alumno "${alumno.nombre} ${alumno.apellidos}" asignado al grupo "${grupoSeleccionado}".`);
}




function actualizarListaGrupos() {
    const dropdownMenu = document.querySelector("#dropdownMenu");
    dropdownMenu.innerHTML = "";

    grupos.forEach((grupo, index) => {
        const grupoItem = document.createElement("li");
        grupoItem.innerHTML = `
            <a class="dropdown-item" href="#pGrilla" onclick="mostrarGrupo(${index}); mostrarSeccionGrilla();">${grupo.nombre}</a>
        `;
        dropdownMenu.appendChild(grupoItem);
    });
}

function mostrarSeccionGrilla() {
    pGrilla.style.display = "";
    pInscripcion.style.display = "none";
    pGrupos.style.display = "none";
}




function actualizarSelectGrupos() {
    const grupoSelect = document.querySelector("#grupoSelect");
    grupoSelect.innerHTML = '<option selected disabled>Selecciona un grupo...</option>';

    console.log("Grupos registrados:", grupos);

    grupos.forEach(grupo => {
        const option = document.createElement("option");
        option.value = grupo.nombre;
        option.textContent = grupo.nombre;
        grupoSelect.appendChild(option);
    });
}




function actualizarSelectAlumnos() {
    const alumnoSelect = document.querySelector("#alumnoSelect");
    alumnoSelect.innerHTML = '<option selected disabled>Selecciona un alumno...</option>';

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





function mostrarGrupo(grupoIndex) {
    const dataGrid = document.querySelector("#dataGrid tbody");
    const h1Grid = document.querySelector("#h1Grid");

    dataGrid.innerHTML = "";
    h1Grid.textContent = `Alumnos del grupo: ${grupos[grupoIndex].nombre}`;

    const alumnosFiltrados = grupos[grupoIndex].alumnos;

    if (alumnosFiltrados.length === 0) {
        const row = dataGrid.insertRow();
        const cell = row.insertCell();
        cell.textContent = "No hay alumnos asignados a este grupo.";
        h1Grid.textContent += " - Promedio General: Sin datos";
        return;
    }

    let sumaPromedios = 0;

    alumnosFiltrados.forEach((alumno, index) => {
        const row = dataGrid.insertRow();

        const nameCell = row.insertCell();
        nameCell.textContent = alumno.nombre;

        const lastNameCell = row.insertCell();
        lastNameCell.textContent = alumno.apellidos;

        for (let i = 0; i < 6; i++) {
            const notaCell = row.insertCell();
            const nota = alumno.calificaciones[grupos[grupoIndex].nombre]?.[i] || "";
            notaCell.innerHTML = `
                <input type="number" class="nota-input" data-index="${index}" data-nota="${i}" data-materia="${grupos[grupoIndex].nombre}" min="0" max="10" value="${nota}" placeholder="Nota ${i + 1}" onchange="actualizarPromedio(${index}, '${grupos[grupoIndex].nombre}')">
            `;
        }

        const promedioCell = row.insertCell();
        promedioCell.classList.add("promedio-cell");
        const promedio = calcularPromedio(alumno.calificaciones[grupos[grupoIndex].nombre] || []);
        promedioCell.textContent = promedio;

        sumaPromedios += parseFloat(promedio) || 0;
    });

    const promedioGeneral = (sumaPromedios / alumnosFiltrados.length).toFixed(2);
    h1Grid.textContent += ` - Promedio General: ${promedioGeneral}`;
}




function ordenarPorNota(columna, ascendente) {
    const dataGrid = document.querySelector("#dataGrid tbody");
    const filas = Array.from(dataGrid.rows);

    filas.sort((a, b) => {
        const notaA = parseFloat(a.cells[columna + 2].querySelector("input").value) || 0;
        const notaB = parseFloat(b.cells[columna + 2].querySelector("input").value) || 0;

        return ascendente ? notaA - notaB : notaB - notaA;
    });

    filas.forEach(fila => dataGrid.appendChild(fila));
}


document.querySelector("#btnCrearGrupo").addEventListener("click", () => {
    crearGrupo();
});

document.querySelector("#btnAsignarAlumno").addEventListener("click", asignarAlumnoAGrupo);

document.querySelector("#pGruposLink").addEventListener("click", () => {
    pGrupos.style.display = "";

    pInscripcion.style.display = "none"; 
    pGrilla.style.display = "none";
});

document.querySelectorAll(".dropdownClass .dropdown-item").forEach(item => {
    item.addEventListener("click", (event) => {
        const materiaSeleccionada = event.target.textContent.toLowerCase().trim();
        mostrarGrid(materiaSeleccionada);
    });
});

document.querySelector("#pInscribir").addEventListener("click", () => {
    pInscripcion.style.display = ""; 

    pGrilla.style.display = "none"; 
    pGrupos.style.display = "none";
})

document.querySelector("#btnGO").addEventListener("click", () => {
    pInscripcion.style.display = ""; 

    pGrilla.style.display = "none"; 
    pGrupos.style.display = "none";
})



document.querySelectorAll("th.sortable").forEach(th => {

    th.addEventListener("click", () => {
        ascendente = !ascendente;
    });
});



cargarDesdeLocalStorage();

function cargarDesdeLocalStorage() {
    const alumnosGuardados = localStorage.getItem("alumnos");
    const gruposGuardados = localStorage.getItem("grupos");

    if (alumnosGuardados) {
        alumnos = JSON.parse(alumnosGuardados);
    }

    if (gruposGuardados) {
        grupos = JSON.parse(gruposGuardados);
    }
}

