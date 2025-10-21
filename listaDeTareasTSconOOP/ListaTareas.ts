//import type { ... } → solo tipos o interfaces.
import type { interfazTarea , Estado , Vencimiento , Dificultad } from "./Tarea";
//import { ... } → funciones, variables o clases ejecutables.
import { constructorTarea } from "./Tarea";
import promptSync from "prompt-sync";
const prompt = promptSync();

/*
Creo una interfaz de la lista de tareas para definir el tipo de objeto que esperan recibir las funciones que
hacen modificaciones sobre la lista de tareas
*/
export interface interfazListaTareas {
  //El objeto listaTareas es un arreglo de objetos de tipo tarea, que respeta la interfazTarea
  listaTareas: interfazTarea[];

//metodos
  agregarTarea(): void;
    agregarDescripcion(): string;
    agregarVencimiento(): Vencimiento;
    agregarDificultad(): Dificultad;
    agregarTitulo(): string;
    ordenarTareas(): interfazListaTareas[];
      stringToNumber(tarea: interfazTarea): number;
  buscarTarea(): void;
  verTareas(): void;
    listarTareas(): void;
      editarTarea(indiceTarea : number): void;
        encontrarPosicion(idTarea : string) : number;
  
  //actualizarTarea() : void;
  //eliminarTarea() : void;
}

export function constructorListaTareas(this: interfazListaTareas) {
    this.listaTareas = [];
}

//defino funcion que llama al cosntructor del prototipo Tarea, en la cual pasarla como parámetro sería redundante y rompe la idea de encapsulación.
constructorListaTareas.prototype.agregarTarea = function (): void {
  //Las funciones auxiliares deben ser métodos del prototipo e invocarse como this.metodo().
    const titulo = this.agregarTitulo();
    const descripcion = this.agregarDescripcion();
    const estado: Estado = "pendiente"; // Estado inicial siempre es "pendiente"
    const dificultad= this.agregarDificultad();
    const vencimiento= this.agregarVencimiento();
    const ultimaModificacion = new Date() ;

    //el método tiene acceso directo a su propio arreglo this.listaTareas. No necesita recibirlo como argumento, porque ya forma parte del mismo objeto.
    const tarea = new (constructorTarea as any) ( titulo, descripcion, dificultad, vencimiento, ultimaModificacion, estado);
    this.listaTareas.push(tarea);

    console.log(`Tarea "${tarea.titulo}" agregada.`);
    this.ordenarTareas(this.listaTareas);
}

constructorListaTareas.prototype.agregarTitulo = function (): string {
  let titulo : string = prompt("Título: ") ?? "";
  if (titulo.length < 100 && titulo.length > 0) {
    return titulo;
  } else {
    console.log("El título debe tener entre 1 y 100 caracteres.");
    return this.agregarTitulo();
  }
}

constructorListaTareas.prototype.agregarDescripcion = function(): string {
  let descripcion : string  = prompt("Descripción: ") ?? "";
  /*
  El operador ?? se llama operador de coalescencia nula (nullish coalescing operator).
  Su función: devolver el primer valor que no sea null ni undefined.
  Si prompt() devuelve una cadena → usa esa cadena.
  Si prompt() devuelve null → usa "" (cadena vacía).
  si el usuario presiona Enter sin escribir nada, el valor devuelto es "" (cadena vacía), no null.
  null solo aparece si la función prompt() del navegador es cancelada (clic en Cancelar). Por eso es necesario
  */
  if (descripcion.length === 0) descripcion = "Sin descripción";
  else if (descripcion.length > 200) {
    console.log("La descripción no debe exceder los 200 caracteres.");
    return this.agregarDescripcion();
  }
  return descripcion;
}

constructorListaTareas.prototype.agregarVencimiento = function (): Vencimiento {
  const base: Vencimiento = "No especificado";
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
    const opcion = (prompt("¿Desea agregar una fecha de vencimiento? (s/n): ") ?? "").trim().toLowerCase();

    if (opcion === "n") return base;
    if (opcion !== "s") { console.log("Opción inválida"); continue; }

    for (;;) {
      const entrada = (prompt("Fecha de vencimiento (DD/MM/AAAA): ") ?? "").trim();
      /*
        Pide al usuario una fecha.
        Usa expresiones regulares (regex) para validar el formato.
        ^(0[1-9]|[12][0-9]|3[01]) → día válido (01 a 31).
        \/(0[1-9]|1[0-2]) → barra / y mes válido (01 a 12).
        \/(20\d{2})$ → barra / y un año entre 2000 y 2099.
        Si no coincide (!regex.test(...)), muestra error y repite el bucle.
        Si es correcto, marca valido = 1 y sale.
      */
      const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(20\d{2})$/;
      if (!regex.test(entrada)) { console.log("Formato inválido. Use DD/MM/AAAA."); continue; }
      return entrada as Vencimiento;
    }
  }
}

//Ejemplo de una funcion que no usa bucle infinito, sino do/while con variables bandera
constructorListaTareas.prototype.agregarDificultad = function () : Dificultad {
  let opcion : string, valido : number =0;
  let dificultad : Dificultad = "facil";
  
    do {
    opcion = (prompt("¿Desea agregar una dificultad? (s/n): ") ?? "").toLowerCase();
      if (opcion !== 's' && opcion !== 'n') console.log("Opción inválida");
      else if (opcion === 'n') {
        return dificultad;
      }
      else if (opcion === 's') {
        do {
        let cadena : string = (prompt("Dificultad (facil/media/dificil): ") ?? "").toLowerCase();
        if (cadena !== 'facil' && cadena !== 'media' && cadena !== 'dificil') {
          console.log("Dificultad inválida. Use facil, media o dificil.");
        }
        else return cadena as Dificultad;;
        } while (valido===0);
      }
    } while (valido===0);
    return dificultad;
}

constructorListaTareas.prototype.buscarTarea = function (): void {
  if (this.listaTareas.length === 0) { console.log("No hay tareas disponibles."); return; }

  const clave = (prompt("Ingrese una palabra clave para buscar: ") ?? "").trim().toLowerCase();

  //En este condicional en caso de que el usuario no ingresa nada, con trim convierto el null en cadena vacia, haciendo posible la operacion en el
  //condicional
  if (!clave) { console.log("Clave vacía."); return; }

  const resultados = this.listaTareas.filter(t =>
    t.titulo.toLowerCase().includes(clave) || t.descripcion.toLowerCase().includes(clave)
  );

  /*
  filter() crea un nuevo array con todos los elementos que cumplan la condición.
  includes() verifica si la cadena contiene la subcadena especificada.
  toLowerCase() convierte el string a minúsculas, entonces si el título de la tarea (en minúsculas) incluye la clave (en minúsculas), se incluye
  en resultados. Esto hace que la búsqueda no distinga entre mayúsculas y minúsculas.
  */

  if (resultados.length === 0) { console.log("No se encontraron tareas."); return; }

  console.log("\nTareas encontradas:");
  resultados.forEach((t, i) => console.log(`${i + 1}. ${t.titulo} - ${t.descripcion} [${t.estado}]`));

  // opcional: permitir ver detalle sobre resultados
  this.listarTareas(resultados);
};

constructorListaTareas.prototype.verTareas = function (): void {
  if (this.listaTareas.length === 0) return console.log("No hay tareas disponibles.");
  
  console.log("\nQue tareas desea ver:");
  console.log("1. Todas");
  console.log("2. Pendientes");
  console.log("3. En progreso");
  console.log("4. Completadas");
  console.log("5. volver al menú principal");

  let opcion : number = Number(prompt("Seleccione una opción (1-5): "));
  switch (opcion) {
    case 1:
      this.listarTareas(this.listaTareas);
      break;
    case 2:
      /*El metodo filter toma todas las tareas que cumplan con la condicion solicitada y las almacena
      en una nueva lista*/
      const pendientes : interfazTarea[] = this.listaTareas.filter(t => t.getEstado() === 'pendiente');
      this.listarTareas(pendientes);
      break;
    case 3:
      const enProgreso : interfazTarea[] = this.listaTareas.filter(t => t.getEstado() === 'en progreso');
      this.listarTareas(enProgreso);
      break;
    case 4:
      const completadas : interfazTarea[] = this.listaTareas.filter(t => t.getEstado() === 'completa');
      this.listarTareas(completadas);
      break;
    case 5:
      break;
    default:
      console.log("Opción inválida.");
      break;
  }
}

/*Este metodo puede llamarse desde buscarTarea y verTareas y puede recibir tanto la lista completa del prototipo como una lista filtrada
este parametro es opcional y por lo tanto lleva un signo de pregunta lista?*/
constructorListaTareas.prototype.listarTareas = function (listaTareas?: interfazTarea[]): void {
  //uso coalescencia nula para indicar que si lista no es null ni undefined, usa lista; de lo contrario, usa this.listaTareas
  const lista = listaTareas ?? this.listaTareas;
  if (lista.length === 0) { console.log("No hay tareas para mostrar."); return; }

  console.log("\nTareas:");
  //El metodo foreach recorre cada objeto del arreglo y asigna el objeto a la variable t y almacena en i el indice del mismo, mostrando la tarea
  //y el numero del indice de la misma
  lista.forEach((t, i) => console.log(`${i + 1}. ${t.titulo}`));

  const detalle : number = Number((prompt("¿Ver detalle? Número (0 para volver): ") ?? "").trim());
  if (!Number.isInteger(detalle) || detalle < 0 || detalle > lista.length) { console.log("Número inválido."); return; }
  if (detalle === 0) return;

  //accedo a los atributos de la tarea mediante mediante getters, respetando el encapsulamiento
  const t = lista[detalle - 1];
  console.log(`\nId de la tarea "${t.getId()}":`);
  console.log(`\nDetalle de la tarea "${t.getTitulo()}":`);
  console.log(`Estado: ${t.getEstado()}`);
  console.log(`Descripción: ${t.getDescripcion()}`);
  console.log(`Creación: ${t.getFechaCreacion().toLocaleString()}`);
  console.log(`Vencimiento: ${t.getVencimiento()}`);
  console.log(`Dificultad: ${t.getDificultad()}`);
  console.log(`Última modificación: ${t.getUltimaModificacion()}`);

  const editar = (prompt("¿Editar esta tarea? (s/n): ") ?? "").trim().toLowerCase();

  if (editar === "s")
    {
      const idTarea : string = t.getId();
      this.editarTarea(idTarea);
    }
};

constructorListaTareas.prototype.editarTarea = function(idTarea : string) {
  //busco la tarea que coincide con el id
  const indiceEncontrado = this.encontrarPosicion(idTarea);
  if (indiceEncontrado < 0 || indiceEncontrado >= this.listaTareas.length) { console.log("Tarea no encontrada."); return; }
  //doy la opcion de modificar los campos de la tarea
  console.log(`\nQue campo desea editar?`);
  console.log("1. Título");
  console.log("2. Descripción");
  console.log("3. Estado");
  console.log("4. Dificultad");
  console.log("5. Fecha de vencimiento");
  console.log("6. Volver al menú principal");
  const opcion = Number(prompt("Seleccione una opción (1-6): "));
  switch (opcion) {
    case 1:
      const nuevoTitulo = this.agregarTitulo();
      this.listaTareas[indiceEncontrado].setTitulo(nuevoTitulo);
      console.log("Título actualizado.");
      break;
    case 2:
      const nuevaDescripcion = this.agregarDescripcion();
      this.listaTareas[indiceEncontrado].setDescripcion(nuevaDescripcion);
      console.log("Descripción actualizada.");
      break;
    case 3:
      const entrada = (prompt("Nuevo estado (pendiente/en progreso/completa): ") ?? "").trim().toLowerCase();
        if (entrada === "pendiente" || entrada === "en progreso" || entrada === "completa" ) {
        let nuevoEstado: Estado = entrada; //
        this.listaTareas[indiceEncontrado].setEstado(nuevoEstado as Estado);
        console.log("Estado actualizado.");
        } else {
        console.log("Estado inválido");
        }
      break;
    case 4:
      const nuevaDificultad = this.agregarDificultad();
      this.listaTareas[indiceEncontrado].setDificultad(nuevaDificultad);
      console.log("Dificultad actualizada.");
      break;
    case 5:
      const nuevoVencimiento = this.agregarVencimiento();
      this.listaTareas[indiceEncontrado].setVencimiento(nuevoVencimiento);
      console.log("Fecha de vencimiento actualizada.");
      break;
    case 6:
      break;
    default:
      console.log("Opción inválida.");
      break;
  }
}

constructorListaTareas.prototype.encontrarPosicion = function (idTarea: string): number {
  for (let i = 0; i < this.listaTareas.length; i++) {
    if (this.listaTareas[i].getId() === idTarea) return i;
  }
  return -1;
};


/*
Compara esos números para ordenar las tareas:
-Si fechaI < fechaJ, intercambia posiciones → resultado descendente (más nueva arriba).
-"No especificado" retorna -1, quedando siempre al final.
Devuelve el arreglo ya ordenado.
*/
constructorListaTareas.prototype.ordenarTareas = function(): interfazTarea[] {
  for (let i=0; i< this.listaTareas.length; i++) {
    for (let j= i+1; j< this.listaTareas.length; j++) {
      if(this.stringToNumber(this.listaTareas[i]) < this.stringToNumber(this.listaTareas[j])) {
        let aux= this.listaTareas[i]
        this.listaTareas[i]= this.listaTareas[j];
        this.listaTareas[j]= aux;
      }
    }
  }
  return this.listaTareas
}

/*
Convierte la fecha de vencimiento de un string de la forma "DD/MM/AAAA" a un número yyyymmdd.
Ejemplo: "27/03/2025" → 20250327 y si encuentra no especificado lo va mandando para el final.
*/

constructorListaTareas.prototype.stringToNumber = function(tarea: interfazTarea): number {
  const vencimiento = tarea.getVencimiento();
  if (vencimiento === "No especificado")
    {return -1;} else {
      const y = Number(vencimiento.slice(6, 10));
      const m = Number(vencimiento.slice(3, 5));
      const d = Number(vencimiento.slice(0, 2));
      return y * 10000 + m * 100 + d;
    }
}

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