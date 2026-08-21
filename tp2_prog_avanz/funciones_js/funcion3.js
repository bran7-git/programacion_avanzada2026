function saludar(nombre = "Invitado") {
    return `Hola, ${nombre}`;
}

console.log(saludar("Juan"));
console.log(saludar());