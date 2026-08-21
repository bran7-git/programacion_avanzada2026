function crearMultiplicador(x) {
    return function(numero) {
        return numero * x;
    };
}

const multiplicarPor3 = crearMultiplicador(3);

console.log(multiplicarPor3(5));
console.log(multiplicarPor3(10));