const libro = {
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",

    descripcion() {
        return `El libro "${this.titulo}" fue escrito por ${this.autor}.`;
    }
};

console.log(libro.descripcion());