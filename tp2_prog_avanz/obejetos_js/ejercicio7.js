const producto = {
    nombre: "Notebook",
    precio: 500000,
    disponible: true
};

console.log("Antes de eliminar:");
console.log(producto);

delete producto.disponible;

console.log("Después de eliminar:");
console.log(producto);