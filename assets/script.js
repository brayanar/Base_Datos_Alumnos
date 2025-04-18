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
        this.calificaciones = calificaciones || [];
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

    const nombreAlumno = document.querySelector("#nombre").value;
    const apellidosAlumno = document.querySelector("#apellidos").value;
    const edadAlumno = document.querySelector("#edad").value;
    const rutAlumno = document.querySelector("#rut").value;
    const direccionAlumno = document.querySelector("#direccion").value;
    const telefonoAlumno = document.querySelector("#telefono").value;
    const correoAlumno = document.querySelector("#correo").value;

    if (!nombreAlumno || !apellidosAlumno || !edadAlumno) {
        alert("Por favor indique los datos del Alumno.");
        return;
    }

    if (alumnoEditandoIndex !== null) {
        // Actualizar los datos del alumno existente
        alumnos[alumnoEditandoIndex] = new alumno(
            nombreAlumno,
            apellidosAlumno,
            edadAlumno,
            rutAlumno,
            direccionAlumno,
            telefonoAlumno,
            correoAlumno
        );
        console.log(`Alumno actualizado:`, alumnos[alumnoEditandoIndex]);
        alert("Alumno actualizado correctamente.");
        alumnoEditandoIndex = null; // Reiniciar el índice
    } else {
        // Crear un nuevo alumno
        nvoAlumno = new alumno(
            nombreAlumno,
            apellidosAlumno,
            edadAlumno,
            rutAlumno,
            direccionAlumno,
            telefonoAlumno,
            correoAlumno
        );
        nvoAlumno.pushAlumno();
        console.log("Array de alumnos:", alumnos);
        alert("Alumno guardado correctamente.");
    }

    // Limpiar los inputs del formulario
    limpiarFormulario();

    // Reiniciar los botones "Seleccionar"
    reiniciarBotonesSeleccionar();
}

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

    // Reiniciar el índice del alumno editando
    alumnoEditandoIndex = null;
}

document.getElementById("btnGuardarAlumno").addEventListener("click", guardarAlumno);


function pantallainscripcion() {

    const pInscripcion = document.getElementById("pInscripcion")

    pInscripcion.style.display = ""
}

document.getElementById("pInscribir").addEventListener("click", pantallainscripcion);


/* function prueba() {    

    const inputElement = document.getElementById('nombre');
    if (inputElement) {
        inputElement.value = alumnos[0].nombre;
    } else {
        console.error('No se encontró el elemento input con el ID "miInputId".');
    }

} */


// Función para buscar alumnos

function buscarAlumno(event) {
    event.preventDefault();

    const searchValue = document.querySelector("#search").value.toLowerCase(); // Obtiene el valor del input
    const resultados = alumnos.filter((alumno, index) =>
        alumno.nombre.toLowerCase().includes(searchValue) ||
        alumno.apellidos.toLowerCase().includes(searchValue) ||
        alumno.rut.toString().includes(searchValue)
    );

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
    document.querySelector("#search").value = ""; // Limpia el input de búsqueda
    setTimeout(() => {
        resultsList.innerHTML = ""; // Limpia los resultados después de un breve tiempo
    }, 10000); // Opcional: Limpia los resultados después de 10 segundos
}

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

// Agregar el evento al formulario de búsqueda
document.querySelector("form[role='search']").addEventListener("submit", buscarAlumno);