//import type { ... } → solo tipos o interfaces.
import type { interfazTarea , Estado , Vencimiento , Dificultad } from "./Tarea";
//import { ... } → funciones, variables o clases ejecutables.
import { constructorTarea } from "./Tarea";
import promptSync from "prompt-sync";
const prompt = promptSync();
import { v4 as uuidv4 } from "uuid";

/*
Creo una interfaz de la lista de tareas para definir el tipo de objeto que esperan recibir las funciones que
hacen modificaciones sobre la lista de tareas
*/
export interface interfazListaTareas {
  //El objeto listaTareas es un arreglo de objetos de tipo tarea, que respeta la interfazTarea
listaTareas: interfazTarea[];

//metodos
agregarTarea () : void
  crearTarea(id : string, titulo : string,  estado: Estado, descripcion : string, dificultad : Dificultad, vencimiento: Vencimiento, fechaCreacion: Date, ultimaModificacion: Date): interfazTarea;
  insertarTarea(lista : interfazTarea[], tarea: interfazTarea) : interfazTarea[];
    agregarDescripcion(): string;
    agregarVencimiento(): Vencimiento;
    agregarDificultad(): Dificultad;
    agregarTitulo(): string;
      ordenarTareas(this: interfazListaTareas): interfazTarea[]
        stringToNumber(tarea: interfazTarea): number;
buscarTarea(): void;
  filtrarTareas(): interfazListaTareas;
    verTareas(): void;
      listarTareas(listaTareas?: interfazTarea[]): void
        editarTarea(idTarea : string): void;
          encontrarPosicion(idTarea : string) : number;
}

export function constructorListaTareas(this: interfazListaTareas) {
    this.listaTareas = [];
}

constructorListaTareas.prototype.agregarTarea = function () : void {
  const id = uuidv4();
  const titulo = this.agregarTitulo();
  const descripcion = this.agregarDescripcion();
  const estado: Estado = "pendiente"; // Estado inicial siempre es "pendiente"
  const dificultad: Dificultad= this.agregarDificultad();
  const vencimiento : Vencimiento= this.agregarVencimiento();
  const ultimaModificacion = new Date();
  const fechaCreacion = new Date();
  const tarea : interfazTarea = this.crearTarea
  (id, titulo, estado, descripcion, dificultad, vencimiento, fechaCreacion, ultimaModificacion);
  this.listaTareas = this.insertarTarea(this.listaTareas, tarea);
}

constructorListaTareas.prototype.insertarTarea = function(lista : interfazTarea[], tarea: interfazTarea) : interfazTarea[] {
  /*Aca lo que hago es recibir por parametro la lista de tareas y la tarea a insertar y devuevlo una nueva
  lista que copia con "..." todos los objetos de la lista anterior y le agrega el nuevo objeto a agregar*/
  return [...lista, tarea];
}

/*Crear tarea debe si o si recibir por parametro los datos para retornar el objeto tarea, porque si
llama desde alla las funciones impuras que retornan datos, entonces por conmposicion se vuelve una funcion 
impura*/

constructorListaTareas.prototype.crearTarea = function (id : string, titulo : string,  estado: Estado, descripcion : string, dificultad : Dificultad, vencimiento: Vencimiento, fechaCreacion: Date, ultimaModificacion: Date ): interfazTarea {
  const tarea : interfazTarea = new (constructorTarea as any) ( id, titulo, descripcion, dificultad, vencimiento, fechaCreacion, ultimaModificacion, estado);
  Object.freeze(tarea);
  return tarea;
}

/*
Para obtener el tiempo no puedo hacer uso de Date.now() porque:
-interactuo con el entorno, porque depende del reloj del sistema
-dos llamadas con los mismos argumentos retornan valores distintos: no hay transparencia referencial
Al usar epochMs obtengo un valor que se calcula por fuera de la funcion que 
-cumple con transparencia referencial: Con el mismo epochMs siempre retorna el mismo número, no consulta el 
reloj
-no provoca efectos secundarios, no muta nada
*/

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
  if (noHayTareas(this.listaTareas)) { console.log("No hay tareas disponibles."); return; }

  const clave = (prompt("Ingrese una palabra clave para buscar: ") ?? "").trim().toLowerCase();

  //En este condicional en caso de que el usuario no ingresa nada, con trim convierto el null en cadena vacia, haciendo posible la operacion en el
  //condicional
  if (claveVacia(clave)) { console.log("Clave vacía."); return; }

  const listaFiltrada = this.filtrarTareas(clave);
  
  if (noHayTareas(listaFiltrada)) { console.log("No se encontraron tareas."); return; }

  console.log("\nTareas encontradas:");
  listaFiltrada.forEach((t, i) => console.log(`${i + 1}. ${t.titulo} - ${t.descripcion} [${t.estado}]`));

  // opcional: permitir ver detalle sobre listaFiltrada
  this.listarTareas(listaFiltrada);
};

function noHayTareas(listaTareas : interfazTarea[]) : boolean {
  if (listaTareas.length === 0) {
    return true;
  } else {
    return false;
  }
}

function claveVacia(clave : string) : boolean {
  if (clave.length === 0) {
    return true;
  } else {
    return false;
  }
}

constructorListaTareas.prototype.filtrarTareas = function (clave : string) : interfazTarea[] {
  const listaFiltrada = this.listaTareas.filter(t =>
    t.titulo.toLowerCase().includes(clave) || t.descripcion.toLowerCase().includes(clave)
  )
  return listaFiltrada;
}

constructorListaTareas.prototype.verTareas = function (): void {
  if (noHayTareas(this.listaTareas)) return console.log("No hay tareas disponibles.");
  
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
  if (noHayTareas(lista)) { console.log("No hay tareas para mostrar."); return; }

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

constructorListaTareas.prototype.editarTarea = function(idTarea : string) : void {
  const fecha = new Date();
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
    /*Para la edicion de atributos realice funciones puras editar que reciben la lista de tareas completa
    realizan una copia del objeto a modificar y mediante spread retornan la tarea modificada habiendo copiado
    los campos que no requieren modificacion, y por ultimo hace lo mismo con los objetos de la lista de tareas,
    devolviendo una copia de la lista original con los cambios realizados, la cual se asigna a la lista original
    */
    case 1:
      const nuevoTitulo = this.agregarTitulo();
      this.listaTareas = editarTitulo(this.listaTareas, idTarea, nuevoTitulo, fecha);
      console.log("Título actualizado.");
      break;
    case 2:
      const nuevaDescripcion = this.agregarDescripcion();
      this.listaTareas = editarDescripcion(this.listaTareas, idTarea, nuevaDescripcion, fecha);
      console.log("Descripción actualizada.");
      break;
    case 3:
      const entrada = (prompt("Nuevo estado (pendiente/en progreso/completa): ") ?? "").trim().toLowerCase();
        if (entrada === "pendiente" || entrada === "en progreso" || entrada === "completa" ) {
        const nuevoEstado = entrada as Estado;
        this.listaTareas = editarEstado(this.listaTareas, idTarea, nuevoEstado, fecha);
        //this.listaTareas[indiceEncontrado].setEstado(nuevoEstado as Estado);
        console.log("Estado actualizado.");
        } else {
        console.log("Estado inválido");
        }
      break;
    case 4:
      const nuevaDificultad = this.agregarDificultad();
      this.listaTareas = editarDificultad(this.listaTareas, idTarea, nuevaDificultad, fecha);
      console.log("Dificultad actualizada.");
      break;
    case 5:
      const nuevoVencimiento = this.agregarVencimiento();
      this.listaTareas = editarVencimiento(this.listaTareas, idTarea, nuevoVencimiento, fecha);
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
  return this.listaTareas.findIndex(t => t.getId() === idTarea);
};

/*
LA funcion recibe los parametros: lista inmutable, idTarea, nuevoTitulo, fecha y devuelve nueva lista.
map recorre cada tarea t y si t.getId() === idTarea, llama la funcion pura t.setTitulo(nuevoTitulo, fecha) 
y usa ese nuevo objeto tarea. de modo que devuelve una lista con la tarea actualizada, sin mutar la original.
Si no coincide, devuelve t tal cual.
*/
function editarTitulo(
  lista: interfazTarea[],
  idTarea: string,
  nuevoTitulo: string,
  fecha: Date
): interfazTarea[] {
  return lista.map(t =>
    t.getId() === idTarea ? t.setTitulo(nuevoTitulo, fecha) : t
  );
}

function editarDescripcion(
  lista: interfazTarea[],
  idTarea: string,
  nuevaDescripcion: string,
  fecha: Date
): interfazTarea[] {
  return lista.map(t =>
    t.getId() === idTarea ? t.setDescripcion(nuevaDescripcion, fecha) : t
  );
}

function editarEstado(
  lista: interfazTarea[],
  idTarea: string,
  nuevoEstado: Estado,
  fecha: Date
): interfazTarea[] {
  return lista.map(t =>
    t.getId() === idTarea ? t.setEstado(nuevoEstado, fecha) : t
  );
}

function editarDificultad(
  lista: interfazTarea[],
  idTarea: string,
  nuevaDificultad: Dificultad,
  fecha: Date
): interfazTarea[] {
  return lista.map(t =>
    t.getId() === idTarea ? t.setDificultad(nuevaDificultad, fecha) : t
  );
}

function editarVencimiento(
  lista: interfazTarea[],
  idTarea: string,
  nuevoVencimiento: Vencimiento,
  fecha: Date
): interfazTarea[] {
  return lista.map(t =>
    t.getId() === idTarea ? t.setVencimiento(nuevoVencimiento, fecha) : t
  );
}
/*
Devuelve una copia del arreglo, ordenado de forma ascendente.
se asigna "a" a un elemento, "b" al siguiente y dependiendo si la comparacion lexicografica es mayor a que b, se intercambian
las posiciones
*/
constructorListaTareas.prototype.ordenarTareas = function (): interfazTarea[] {
  const ordenadas = [...this.listaTareas].sort((a, b) =>
  a.getTitulo().localeCompare(b.getTitulo(),)
);
return ordenadas;
};

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
