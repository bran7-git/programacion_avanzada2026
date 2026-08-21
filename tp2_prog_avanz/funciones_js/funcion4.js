function crearPersona(nombre, edad) {
    return {
        nombre: nombre,
        edad: edad
    };
}

const persona = crearPersona("Juan", 20);

console.log(persona);