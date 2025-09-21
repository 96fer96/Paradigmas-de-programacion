import promptSync from "prompt-sync";

const prompt = promptSync();
let opcion = 0;

do {
    console.log("Menu calculadora: Ingresar la opcion deseada");
    console.log("1. Sumar");
    console.log("2. Restar");
    console.log("3. Multiplicar");
    console.log("4. Dividir");
    console.log("5. Salir");

    opcion = Number(prompt("Ingrese la opcion: "));

    if (opcion >= 1 && opcion <= 4) {
        let valores = [];
        switch (opcion) {
            case 1:
                valores= obtenerValores();
                sumar(valores);
                break;
            case 2:
                valores= obtenerValores();
                restar(valores);
                break;
            case 3:
                valores= obtenerValores();
                multiplicar(valores);
                break;
            case 4:
                valores= obtenerValores();
                dividir(valores);
                break;
        }
    } else if (opcion === 5) {
        console.log("Saliendo de la calculadora. ¡Hasta luego!");
    } else {
        console.log("Opción no válida. Por favor, intente de nuevo.");
    }
} while (opcion!==5);

function sumar(valores) {
    let suma=0;
    for (let i=0; i<valores.length; i++){
        suma += valores[i];
    }
    console.log("El resultado de la suma es: " + suma);
}

function restar(valores) {
    let resta=valores[0];
    for (let i=1; i<valores.length; i++){
        resta -= valores[i];
    }
    console.log("El resultado de la resta es: " + resta);
}

function multiplicar(valores) {
    let multiplicacion=valores[0];
    for (let i=1; i<valores.length; i++){
        multiplicacion *= valores[i];
    }
    console.log("El resultado de la multiplicacion es: " + multiplicacion);
}

function dividir(valores) {
    let division=valores[0];
    for (let i=1; i<valores.length; i++){
        if (i!==0){
            if (valores[i] !== 0) {
            division /= valores[i];
            } else {
                console.log("Error: No se puede dividir por cero.");
            }
        }
        
    }
    console.log("El resultado de la division es: " + division);
}

function obtenerValores() {
    const cantidad = Number(prompt("Cuantos valores desea ingresar?: "));
        const valores = [];

        for (let i = 1; i <= cantidad; i++) {
        const num = Number(prompt(`Ingrese el valor ${i}: `));
        valores.push(num);
        }
        return valores;
    }