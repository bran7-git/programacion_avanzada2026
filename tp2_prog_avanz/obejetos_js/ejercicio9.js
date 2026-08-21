const estudiante = {
    nombre: "Juan",
    edad: 20,
    direccion: {
        calle: "San Martín 123",
        ciudad: "Paraná",
        pais: "Argentina"
    }
};

const copiaEstudiante = JSON.parse(JSON.stringify(estudiante));

copiaEstudiante.nombre = "Pedro";
copiaEstudiante.direccion.ciudad = "Santa Fe";

console.log("Objeto original:");
console.log(estudiante);

console.log("Copia modificada:");
console.log(copiaEstudiante);