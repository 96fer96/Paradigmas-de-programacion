import { v4 as uuidv4 } from "uuid";

export interface interfazTarea {
    readonly id: string; //el id es un uuid
    titulo: string;
    descripcion: string;
    dificultad: Dificultad;
    vencimiento: Vencimiento;
    readonly fechaCreacion: Date;
    ultimaModificacion: Date;
    estado: Estado;

    getId(): string;

    getFechaCreacion(): Date;
    
    getTitulo(): string;
    setTitulo(nuevoTitulo : string): void;

    getDescripcion(): string;
    setDescripcion(nuevaDescripcion : string) : void;

    getVencimiento() : Vencimiento;
    setVencimiento(nuevoVencimiento : Vencimiento) : void;

    getDificultad() : Dificultad;
    setDificultad(nuevaDificultad : Dificultad) : void;

    getEstado(): Estado;
    setEstado(nuevoEstado : Estado) : void;
}

export type Dificultad = "facil" | "media" | "dificil";
export type Vencimiento = string | "No especificado";
export type Estado = "pendiente" | "en progreso" | "completa";

export function constructorTarea(
  this: interfazTarea,
  //id : string,
  titulo : string,
  descripcion : string,
  dificultad: Dificultad,
  vencimiento: Vencimiento,
  //fechaCreacion: Date,
  ultimaModificacion: Date,
  estado: Estado)
{
  /*
  uso Object.defineProperty dentro del constructor modo que creo el atributo readonly manualmente, sin que TypeScript lo marque como error, ya que 
  cuando lo uso, me indica que el atributo es solo de lectura incluso cuando lo creo por primera vez en mi funcion cosntructora.
  */

  /*Al crear una tarea automaticamente asigno, no recibo por parametro un uuid*/
  Object.defineProperty(this, "id", {
    value: uuidv4(),
    writable: false, // impide modificarlo luego
    enumerable: true,
  });

  Object.defineProperty(this, "fechaCreacion", {
    value: new Date(),
    writable: false,
    enumerable: true,
  });
  this.titulo = titulo;
  this.descripcion = descripcion;
  this.dificultad = dificultad;
  this.vencimiento = vencimiento;
  this.ultimaModificacion = ultimaModificacion;
  this.estado = estado;
}

constructorTarea.prototype.getId = function() : string {
  return this.id;
}

constructorTarea.prototype.getFechaCreacion = function() : Date {
  
  return this.fechaCreacion;
}

constructorTarea.prototype.getTitulo = function() : string {
  return this.titulo;
}

constructorTarea.prototype.setTitulo = function(nuevoTitulo : string ) : void{
  this.titulo = nuevoTitulo;
  this.ultimaModificacion = new Date();
}

constructorTarea.prototype.getDescripcion = function() : string {
  return this.descripcion;
}

constructorTarea.prototype.setDescripcion = function(nuevaDescripcion : string) {
  this.descripcion = nuevaDescripcion;
  this.ultimaModificacion = new Date();
}

constructorTarea.prototype.getEstado = function() : Estado {
  return this.estado;
}

constructorTarea.prototype.setEstado = function(nuevoEstado : Estado) : void {
  this.estado = nuevoEstado;
  this.ultimaModificacion = new Date();
}

constructorTarea.prototype.getDificultad = function() : Dificultad {
  return this.dificultad;
}

constructorTarea.prototype.setDificultad = function(nuevaDificultad : Dificultad) {
  this.dificultad = nuevaDificultad;
  this.ultimaModificacion = new Date();
}

constructorTarea.prototype.getVencimiento = function() : Vencimiento {
  return this.vencimiento;
}

constructorTarea.prototype.setVencimiento = function(nuevoVencimiento : Date) {
  this.vencimiento = nuevoVencimiento;
  this.ultimaModificacion = new Date();
}

constructorTarea.prototype.getUltimaModificacion = function() : Date {
  return this.ultimaModificacion;
}

/*
Pendiente:
-definir los getters y setters
*/


/*
Problemas surgidos:
-Si quiero mantener el tipado fuerte con interface, debo agregar los metodos del prototipo al interface.
-El compilador de ts me advierte de posibles casos en los que el flujo es undefined incluso despues de haber
hecho las validaciones
-No puedo exportar las funciones del prototipo y tampoco puedo hacer un prototipo de funciones indicando que 
se exportan
-no puedo hacer "export { prototype.eliminarTarea} o export {eliminarTarea}" o "export { constructorTarea.prototype.eliminarTarea}"
*/