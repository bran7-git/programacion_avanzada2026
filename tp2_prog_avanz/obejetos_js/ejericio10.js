const libro = {
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    _añoDePublicacion: 1943,

    get añoDePublicacion() {
        return this._añoDePublicacion;
    },

    set añoDePublicacion(nuevoAño) {
        this._añoDePublicacion = nuevoAño;
    }
};

libro.añoDePublicacion = 1945;

console.log("Año de publicación:", libro.añoDePublicacion);