function tienePropiedad(objeto, propiedad) {
    return propiedad in objeto;
}

const persona = {
    nombre: "Juan",
    edad: 20
};

console.log(tienePropiedad(persona, "nombre"));
console.log(tienePropiedad(persona, "apellido"));