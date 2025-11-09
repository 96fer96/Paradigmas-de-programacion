/*voy a intentar de que mi cosntructor de tarea sea una funcion pura, por lo cual debo evitar usar uuid, date,
de modo que tengo dos alternativas, asignarlos en la instanciacion del objeto de forma automatica o pasarlos
por parametro al crear tarea
*/

export interface interfazTarea {
    id: string; //el id es un uuid
    titulo: string;
    descripcion: string;
    dificultad: Dificultad;
    vencimiento: Vencimiento;
    fechaCreacion: Date;
    ultimaModificacion: Date;
    estado: Estado;

    getId(): string;

    getFechaCreacion(): Date;
    
    getTitulo(): string;
    setTitulo(nuevoTitulo: string, fecha: Date): interfazTarea;

    getDescripcion(): string;
    setDescripcion(nuevaDescripcion : string, fecha: Date) : interfazTarea;

    getVencimiento() : Vencimiento;
    setVencimiento(nuevo: Vencimiento, fecha: Date): interfazTarea;

    getDificultad() : Dificultad;
    setDificultad(nueva: Dificultad, fecha: Date): interfazTarea;

    getEstado(): Estado;
    setEstado(nuevoEstado: Estado, fecha: Date): interfazTarea;
}

export type Dificultad = "facil" | "media" | "dificil";
export type Vencimiento = string | "No especificado";
export type Estado = "pendiente" | "en progreso" | "completa";

export function constructorTarea(
  this: interfazTarea,
  id : string,
  titulo : string,
  descripcion : string,
  dificultad: Dificultad,
  vencimiento: Vencimiento,
  fechaCreacion: Date,
  ultimaModificacion: Date,
  estado: Estado)
{
  this.id = id;
  this.titulo = titulo;
  this.descripcion = descripcion;
  this.dificultad = dificultad;
  this.vencimiento = vencimiento;
  this.fechaCreacion = fechaCreacion;
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

/*
Los setter reciben los atributos necesarios y retornan objetos nuevos tarea, con una copia (usando spread ...) de los
atributos que no son modificados
*/
constructorTarea.prototype.setTitulo = function (this: interfazTarea, nuevoTitulo: string, fecha: Date): interfazTarea {
  const copia = {
    ...this,
    titulo: nuevoTitulo,
    ultimaModificacion: fecha,
  };
  /*
  Copia es un objeto literal creado con spread. Ese objeto pierde los métodos del prototipo de constructorTarea
  de modo que mediante setPrototypeOf le indico al programa que ese objeto plano obtenga todos los metodos
  del prototipo, dicho de otras palabras setprototypeod significa: hacer que ese objeto sea un objeto del 
  prototipo de constructorTarea
  */
  return Object.setPrototypeOf(copia, constructorTarea.prototype);
};

constructorTarea.prototype.getDescripcion = function() : string {
  return this.descripcion;
}

constructorTarea.prototype.setDescripcion = function(this: interfazTarea, nuevaDescripcion : string, fecha: Date) : interfazTarea {
  const copia = {
    ...this,
    descripcion: nuevaDescripcion,
    ultimaModificacion: fecha,
  };
  return Object.setPrototypeOf(copia, constructorTarea.prototype);
}

constructorTarea.prototype.getEstado = function() : Estado {
  return this.estado;
}

constructorTarea.prototype.setEstado = function (
  this: interfazTarea,
  nuevoEstado: Estado,
  fecha: Date
): interfazTarea {
  const copia = {
    ...this,
    estado: nuevoEstado,
    ultimaModificacion: fecha,
  };
  return Object.setPrototypeOf(copia, constructorTarea.prototype);
};

constructorTarea.prototype.getDificultad = function() : Dificultad {
  return this.dificultad;
}

constructorTarea.prototype.setDificultad = function (
  this: interfazTarea,
  nuevaDificultad: Dificultad,
  fecha: Date
): interfazTarea {
  const copia = {
    ...this,
    dificultad: nuevaDificultad,
    ultimaModificacion: fecha,
  };
  return Object.setPrototypeOf(copia, constructorTarea.prototype);
};

constructorTarea.prototype.getVencimiento = function() : Vencimiento {
  return this.vencimiento;
}

constructorTarea.prototype.setVencimiento = function (
  this: interfazTarea,
  nuevoVencimiento: Vencimiento,
  fecha: Date
): interfazTarea {
  const copia = {
    ...this,
    vencimiento: nuevoVencimiento,
    ultimaModificacion: fecha,
  };
  return Object.setPrototypeOf(copia, constructorTarea.prototype);
};

constructorTarea.prototype.getUltimaModificacion = function() : Date {
  return this.ultimaModificacion;
}
