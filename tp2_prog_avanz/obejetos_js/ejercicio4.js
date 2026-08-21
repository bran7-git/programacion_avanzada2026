const producto = {
    nombre: "Notebook",
    precio: 500000,
    disponible: true
};

for (const propiedad in producto) {
    console.log(`${propiedad}: ${producto[propiedad]}`);
}