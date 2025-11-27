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