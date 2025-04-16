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

function guardarAlumno() {
    event.preventDefault()
    const nombreAlumno = document.querySelector("#nombre").value
    const apellidosAlumno = document.querySelector("#apellidos").value
    const edadAlumno = document.querySelector("#edad").value
    const rutAlumno = document.querySelector("#rut").value
    const direccionAlumno = document.querySelector("#direccion").value
    const telefonoAlumno = document.querySelector("#telefono").value
    const correoAlumno = document.querySelector("#correo").value

    const materiasAlumno = {};
    const checkboxes = document.querySelectorAll('input[name="materias"]:checked');

    if (checkboxes.length === 0) {
        event.preventDefault();
        alert("Por favor, selecciona al menos una materia.");
    } else {
        for (let i = 0; i < checkboxes.length; i++) {
            const checkbox = checkboxes[i];
            materiasAlumno[checkbox.value] = checkbox.value;
        }
    };

    if (!nombreAlumno || !apellidosAlumno || !edadAlumno) {
        alert("Porfavor indique los datos del Alumno.");
        return;
    } else {
        console.log("Materias seleccionadas: ", materiasAlumno);

        const nvoAlumno = new alumno(nombreAlumno, apellidosAlumno, edadAlumno, materiasAlumno, rutAlumno, direccionAlumno, telefonoAlumno, correoAlumno);

        nvoAlumno.pushAlumno()
        console.log("Array de alumnos: ", alumnos)
    }
}

document.getElementById("btnGuardarAlumno").addEventListener("click", guardarAlumno);


function pantallainscripcion () {

    const pInscripcion = document.getElementById("pInscripcion")

    pInscripcion.style.display = ""
}

document.getElementById("pInscribir").addEventListener("click", pantallainscripcion);