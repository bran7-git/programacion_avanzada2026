function actualizarEdad(persona, nuevaEdad) {
    persona.edad = nuevaEdad;
}

const persona = {
    nombre: "Juan",
    edad: 20
};

console.log("Antes:");
console.log(persona);

actualizarEdad(persona, 25);

console.log("Después:");
console.log(persona);