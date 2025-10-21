"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructorListaTareas = constructorListaTareas;
//import { ... } → funciones, variables o clases ejecutables.
var Tarea_1 = require("./Tarea");
var prompt_sync_1 = require("prompt-sync");
var prompt = (0, prompt_sync_1.default)();
function constructorListaTareas() {
    this.listaTareas = [];
}
//defino funcion que llama al cosntructor del prototipo Tarea, en la cual pasarla como parámetro sería redundante y rompe la idea de encapsulación.
constructorListaTareas.prototype.agregarTarea = function () {
    //Las funciones auxiliares deben ser métodos del prototipo e invocarse como this.metodo().
    var titulo = this.agregarTitulo();
    var descripcion = this.agregarDescripcion();
    var estado = "pendiente"; // Estado inicial siempre es "pendiente"
    var dificultad = this.agregarDificultad();
    var vencimiento = this.agregarVencimiento();
    var ultimaModificacion = new Date();
    //el método tiene acceso directo a su propio arreglo this.listaTareas. No necesita recibirlo como argumento, porque ya forma parte del mismo objeto.
    var tarea = new Tarea_1.constructorTarea(titulo, descripcion, dificultad, vencimiento, ultimaModificacion, estado);
    this.listaTareas.push(tarea);
    console.log("Tarea \"".concat(tarea.titulo, "\" agregada."));
    this.ordenarTareas(this.listaTareas);
};
constructorListaTareas.prototype.agregarTitulo = function () {
    var _a;
    var titulo = (_a = prompt("Título: ")) !== null && _a !== void 0 ? _a : "";
    if (titulo.length < 100 && titulo.length > 0) {
        return titulo;
    }
    else {
        console.log("El título debe tener entre 1 y 100 caracteres.");
        return this.agregarTitulo();
    }
};
constructorListaTareas.prototype.agregarDescripcion = function () {
    var _a;
    var descripcion = (_a = prompt("Descripción: ")) !== null && _a !== void 0 ? _a : "";
    /*
    El operador ?? se llama operador de coalescencia nula (nullish coalescing operator).
    Su función: devolver el primer valor que no sea null ni undefined.
    Si prompt() devuelve una cadena → usa esa cadena.
    Si prompt() devuelve null → usa "" (cadena vacía).
    si el usuario presiona Enter sin escribir nada, el valor devuelto es "" (cadena vacía), no null.
    null solo aparece si la función prompt() del navegador es cancelada (clic en Cancelar). Por eso es necesario
    */
    if (descripcion.length === 0)
        descripcion = "Sin descripción";
    else if (descripcion.length > 200) {
        console.log("La descripción no debe exceder los 200 caracteres.");
        return this.agregarDescripcion();
    }
    return descripcion;
};
constructorListaTareas.prototype.agregarVencimiento = function () {
    var _a, _b;
    var base = "No especificado";
    /*El for (;;) { ... } es una forma compacta de escribir un bucle infinito.
    cuando escribo for (inicializacion;condicion;actualizacion) sin nada, es decir: for(;;)
    -No hay inicialización
    -No hay condición
    -No hay actualización
    Por lo tanto, la condición del bucle siempre es “verdadera”.
    Como quiero repetir hasta que el usuario ingrese algo válido. El bucle for (;;) mantiene la ejecución en un ciclo infinito, y se rompe solo
    cuando aparece un return, de modo que con "continue" repite el bucle.
    Es idéntico a while (true), pero no depende de una variable bandera por lo tanto es mas simple porque usa menos variables.
    */
    for (;;) {
        var opcion = ((_a = prompt("¿Desea agregar una fecha de vencimiento? (s/n): ")) !== null && _a !== void 0 ? _a : "").trim().toLowerCase();
        if (opcion === "n")
            return base;
        if (opcion !== "s") {
            console.log("Opción inválida");
            continue;
        }
        for (;;) {
            var entrada = ((_b = prompt("Fecha de vencimiento (DD/MM/AAAA): ")) !== null && _b !== void 0 ? _b : "").trim();
            /*
              Pide al usuario una fecha.
              Usa expresiones regulares (regex) para validar el formato.
              ^(0[1-9]|[12][0-9]|3[01]) → día válido (01 a 31).
              \/(0[1-9]|1[0-2]) → barra / y mes válido (01 a 12).
              \/(20\d{2})$ → barra / y un año entre 2000 y 2099.
              Si no coincide (!regex.test(...)), muestra error y repite el bucle.
              Si es correcto, marca valido = 1 y sale.
            */
            var regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(20\d{2})$/;
            if (!regex.test(entrada)) {
                console.log("Formato inválido. Use DD/MM/AAAA.");
                continue;
            }
            return entrada;
        }
    }
};
//Ejemplo de una funcion que no usa bucle infinito, sino do/while con variables bandera
constructorListaTareas.prototype.agregarDificultad = function () {
    var _a, _b;
    var opcion, valido = 0;
    var dificultad = "facil";
    do {
        opcion = ((_a = prompt("¿Desea agregar una dificultad? (s/n): ")) !== null && _a !== void 0 ? _a : "").toLowerCase();
        if (opcion !== 's' && opcion !== 'n')
            console.log("Opción inválida");
        else if (opcion === 'n') {
            return dificultad;
        }
        else if (opcion === 's') {
            do {
                var cadena = ((_b = prompt("Dificultad (facil/media/dificil): ")) !== null && _b !== void 0 ? _b : "").toLowerCase();
                if (cadena !== 'facil' && cadena !== 'media' && cadena !== 'dificil') {
                    console.log("Dificultad inválida. Use facil, media o dificil.");
                }
                else
                    return cadena;
                ;
            } while (valido === 0);
        }
    } while (valido === 0);
    return dificultad;
};
constructorListaTareas.prototype.buscarTarea = function () {
    var _a;
    if (this.listaTareas.length === 0) {
        console.log("No hay tareas disponibles.");
        return;
    }
    var clave = ((_a = prompt("Ingrese una palabra clave para buscar: ")) !== null && _a !== void 0 ? _a : "").trim().toLowerCase();
    //En este condicional en caso de que el usuario no ingresa nada, con trim convierto el null en cadena vacia, haciendo posible la operacion en el
    //condicional
    if (!clave) {
        console.log("Clave vacía.");
        return;
    }
    var resultados = this.listaTareas.filter(function (t) {
        return t.titulo.toLowerCase().includes(clave) || t.descripcion.toLowerCase().includes(clave);
    });
    /*
    filter() crea un nuevo array con todos los elementos que cumplan la condición.
    includes() verifica si la cadena contiene la subcadena especificada.
    toLowerCase() convierte el string a minúsculas, entonces si el título de la tarea (en minúsculas) incluye la clave (en minúsculas), se incluye
    en resultados. Esto hace que la búsqueda no distinga entre mayúsculas y minúsculas.
    */
    if (resultados.length === 0) {
        console.log("No se encontraron tareas.");
        return;
    }
    console.log("\nTareas encontradas:");
    resultados.forEach(function (t, i) { return console.log("".concat(i + 1, ". ").concat(t.titulo, " - ").concat(t.descripcion, " [").concat(t.estado, "]")); });
    // opcional: permitir ver detalle sobre resultados
    this.listarTareas(resultados);
};
constructorListaTareas.prototype.verTareas = function () {
    if (this.listaTareas.length === 0)
        return console.log("No hay tareas disponibles.");
    console.log("\nQue tareas desea ver:");
    console.log("1. Todas");
    console.log("2. Pendientes");
    console.log("3. En progreso");
    console.log("4. Completadas");
    console.log("5. volver al menú principal");
    var opcion = Number(prompt("Seleccione una opción (1-5): "));
    switch (opcion) {
        case 1:
            this.listarTareas(this.listaTareas);
            break;
        case 2:
            /*El metodo filter toma todas las tareas que cumplan con la condicion solicitada y las almacena
            en una nueva lista*/
            var pendientes = this.listaTareas.filter(function (t) { return t.getEstado() === 'pendiente'; });
            this.listarTareas(pendientes);
            break;
        case 3:
            var enProgreso = this.listaTareas.filter(function (t) { return t.getEstado() === 'en progreso'; });
            this.listarTareas(enProgreso);
            break;
        case 4:
            var completadas = this.listaTareas.filter(function (t) { return t.getEstado() === 'completa'; });
            this.listarTareas(completadas);
            break;
        case 5:
            break;
        default:
            console.log("Opción inválida.");
            break;
    }
};
/*Este metodo puede llamarse desde buscarTarea y verTareas y puede recibir tanto la lista completa del prototipo como una lista filtrada
este parametro es opcional y por lo tanto lleva un signo de pregunta lista?*/
constructorListaTareas.prototype.listarTareas = function (listaTareas) {
    var _a, _b;
    //uso coalescencia nula para indicar que si lista no es null ni undefined, usa lista; de lo contrario, usa this.listaTareas
    var lista = listaTareas !== null && listaTareas !== void 0 ? listaTareas : this.listaTareas;
    if (lista.length === 0) {
        console.log("No hay tareas para mostrar.");
        return;
    }
    console.log("\nTareas:");
    //El metodo foreach recorre cada objeto del arreglo y asigna el objeto a la variable t y almacena en i el indice del mismo, mostrando la tarea
    //y el numero del indice de la misma
    lista.forEach(function (t, i) { return console.log("".concat(i + 1, ". ").concat(t.titulo)); });
    var detalle = Number(((_a = prompt("¿Ver detalle? Número (0 para volver): ")) !== null && _a !== void 0 ? _a : "").trim());
    if (!Number.isInteger(detalle) || detalle < 0 || detalle > lista.length) {
        console.log("Número inválido.");
        return;
    }
    if (detalle === 0)
        return;
    //accedo a los atributos de la tarea mediante mediante getters, respetando el encapsulamiento
    var t = lista[detalle - 1];
    console.log("\nId de la tarea \"".concat(t.getId(), "\":"));
    console.log("\nDetalle de la tarea \"".concat(t.getTitulo(), "\":"));
    console.log("Estado: ".concat(t.getEstado()));
    console.log("Descripci\u00F3n: ".concat(t.getDescripcion()));
    console.log("Creaci\u00F3n: ".concat(t.getFechaCreacion().toLocaleString()));
    console.log("Vencimiento: ".concat(t.getVencimiento()));
    console.log("Dificultad: ".concat(t.getDificultad()));
    console.log("\u00DAltima modificaci\u00F3n: ".concat(t.getUltimaModificacion()));
    var editar = ((_b = prompt("¿Editar esta tarea? (s/n): ")) !== null && _b !== void 0 ? _b : "").trim().toLowerCase();
    if (editar === "s") {
        var idTarea = t.getId();
        this.editarTarea(idTarea);
    }
};
constructorListaTareas.prototype.editarTarea = function (idTarea) {
    var _a;
    //busco la tarea que coincide con el id
    var indiceEncontrado = this.encontrarPosicion(idTarea);
    if (indiceEncontrado < 0 || indiceEncontrado >= this.listaTareas.length) {
        console.log("Tarea no encontrada.");
        return;
    }
    //doy la opcion de modificar los campos de la tarea
    console.log("\nQue campo desea editar?");
    console.log("1. Título");
    console.log("2. Descripción");
    console.log("3. Estado");
    console.log("4. Dificultad");
    console.log("5. Fecha de vencimiento");
    console.log("6. Volver al menú principal");
    var opcion = Number(prompt("Seleccione una opción (1-6): "));
    switch (opcion) {
        case 1:
            var nuevoTitulo = this.agregarTitulo();
            this.listaTareas[indiceEncontrado].setTitulo(nuevoTitulo);
            console.log("Título actualizado.");
            break;
        case 2:
            var nuevaDescripcion = this.agregarDescripcion();
            this.listaTareas[indiceEncontrado].setDescripcion(nuevaDescripcion);
            console.log("Descripción actualizada.");
            break;
        case 3:
            var entrada = ((_a = prompt("Nuevo estado (pendiente/en progreso/completa): ")) !== null && _a !== void 0 ? _a : "").trim().toLowerCase();
            if (entrada === "pendiente" || entrada === "en progreso" || entrada === "completa") {
                var nuevoEstado = entrada; //
                this.listaTareas[indiceEncontrado].setEstado(nuevoEstado);
                console.log("Estado actualizado.");
            }
            else {
                console.log("Estado inválido");
            }
            break;
        case 4:
            var nuevaDificultad = this.agregarDificultad();
            this.listaTareas[indiceEncontrado].setDificultad(nuevaDificultad);
            console.log("Dificultad actualizada.");
            break;
        case 5:
            var nuevoVencimiento = this.agregarVencimiento();
            this.listaTareas[indiceEncontrado].setVencimiento(nuevoVencimiento);
            console.log("Fecha de vencimiento actualizada.");
            break;
        case 6:
            break;
        default:
            console.log("Opción inválida.");
            break;
    }
};
constructorListaTareas.prototype.encontrarPosicion = function (idTarea) {
    for (var i = 0; i < this.listaTareas.lenght; i++) {
        if (this.listaTareas[i].getId() == idTarea) {
            return i;
        }
    }
};
/*
Compara esos números para ordenar las tareas:
-Si fechaI < fechaJ, intercambia posiciones → resultado descendente (más nueva arriba).
-"No especificado" retorna -1, quedando siempre al final.
Devuelve el arreglo ya ordenado.
*/
constructorListaTareas.prototype.ordenarTareas = function () {
    for (var i = 0; i < this.listaTareas.length; i++) {
        for (var j = i + 1; j < this.listaTareas.length; j++) {
            if (this.stringToNumber(this.listaTareas[i]) < this.stringToNumber(this.listaTareas[j])) {
                var aux = this.listaTareas[i];
                this.listaTareas[i] = this.listaTareas[j];
                this.listaTareas[j] = aux;
            }
        }
    }
    return this.listaTareas;
};
/*
Convierte la fecha de vencimiento de un string de la forma "DD/MM/AAAA" a un número yyyymmdd.
Ejemplo: "27/03/2025" → 20250327 y si encuentra no especificado lo va mandando para el final.
*/
constructorListaTareas.prototype.stringToNumber = function (tarea) {
    var vencimiento = tarea.getVencimiento();
    if (vencimiento === "No especificado") {
        return -1;
    }
    else {
        var y = Number(vencimiento.slice(6, 10));
        var m = Number(vencimiento.slice(3, 5));
        var d = Number(vencimiento.slice(0, 2));
        return y * 10000 + m * 100 + d;
    }
};
/*constructorListaTareas.prototype.eliminarTarea = function() : void {
  this.verTareas(this.listaTareas);
  let indice : number = Number(prompt("Número de la tarea a eliminar: ")) - 1;
  if (!Number.isInteger(indice) || indice < 0 || indice >= this.listaTareas.length) return console.log("Número inválido.");
  let [tareaEliminada] : (interfazTarea | undefined)[] = this.listaTareas.splice(indice, 1);
  /*
splice(indice, 1) modifica el array original y devuelve un array con los elementos eliminados.
En este caso, como pido un objeto, siempre devuelve un array de 1 elemento.
La desestructuración con [ ] extrae ese único objeto y lo asigna a tareaEliminada, haciendo que tareaEliminada sea
directamente una Tarea, no un array.
tareaEliminada es del tipo Tarea | undefined.
Tarea si realmente se eliminó una.
undefined si no había nada en esa posición (aunque la validación ya evite esto, ts necesita asegurarse).
  console.log(`Tarea "${tareaEliminada.titulo}" eliminada.`);
}*/ 
