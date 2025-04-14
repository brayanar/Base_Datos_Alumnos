class alumno {

    constructor(nombre, apellidos, edad, materias, calificaciones) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
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

        const nvoAlumno = new alumno(nombreAlumno, apellidosAlumno, edadAlumno, materiasAlumno);

        nvoAlumno.pushAlumno()
        console.log("Array de alumnos: ", alumnos)
    }
}

document.getElementById("btnGuardarAlumno").addEventListener("click", guardarAlumno);