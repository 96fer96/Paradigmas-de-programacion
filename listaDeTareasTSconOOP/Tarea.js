"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructorTarea = constructorTarea;
var uuid_1 = require("uuid");
function constructorTarea(
//id : string,
titulo, descripcion, dificultad, vencimiento, 
//fechaCreacion: Date,
ultimaModificacion, estado) {
    /*
    uso Object.defineProperty dentro del constructor modo que creo el atributo readonly manualmente, sin que TypeScript lo marque como error, ya que
    cuando lo uso, me indica que el atributo es solo de lectura incluso cuando lo creo por primera vez en mi funcion cosntructora.
    */
    /*Al crear una tarea automaticamente asigno, no recibo por parametro un uuid*/
    Object.defineProperty(this, "id", {
        value: (0, uuid_1.v4)(),
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
constructorTarea.prototype.getId = function () {
    return this.id;
};
constructorTarea.prototype.getFechaCreacion = function () {
    return this.fechaCreacion;
};
constructorTarea.prototype.getTitulo = function () {
    return this.titulo;
};
constructorTarea.prototype.setTitulo = function (nuevoTitulo) {
    this.titulo = nuevoTitulo;
    this.ultimaModificacion = new Date();
};
constructorTarea.prototype.getDescripcion = function () {
    return this.descripcion;
};
constructorTarea.prototype.setDescripcion = function (nuevaDescripcion) {
    this.descripcion = nuevaDescripcion;
    this.ultimaModificacion = new Date();
};
constructorTarea.prototype.getEstado = function () {
    return this.estado;
};
constructorTarea.prototype.setEstado = function (nuevoEstado) {
    this.estado = nuevoEstado;
    this.ultimaModificacion = new Date();
};
constructorTarea.prototype.getDificultad = function () {
    return this.dificultad;
};
constructorTarea.prototype.setDificultad = function (nuevaDificultad) {
    this.dificultad = nuevaDificultad;
    this.ultimaModificacion = new Date();
};
constructorTarea.prototype.getVencimiento = function () {
    return this.vencimiento;
};
constructorTarea.prototype.setVencimiento = function (nuevoVencimiento) {
    this.vencimiento = nuevoVencimiento;
    this.ultimaModificacion = new Date();
};
constructorTarea.prototype.getUltimaModificacion = function () {
    return this.ultimaModificacion;
};
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
