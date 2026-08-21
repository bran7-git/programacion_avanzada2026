const persona1 = {
    nombre: "Juan",
    edad: 20
};

const persona2 = {
    ciudad: "Paraná",
    pais: "Argentina"
};

const personaCombinada = Object.assign({}, persona1, persona2);

console.log(personaCombinada);