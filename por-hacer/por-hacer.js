const fs = require('fs');

let listadoPorHacer = [];

// funcion para guardar datos
const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) {
            throw new Error('No se pudo guardar', err);
        }

    });
}

// funcion para leer archivo json
const cargarDB = () => {


    //intentamos leer el archivo
    try {

        listadoPorHacer = require('../db/data.json');

    } catch (error) { // si marca error porque el archivo esta vacio, creamos un objeto vacio

        listadoPorHacer = [];
    }


}

//funcion para obtener el listado de tareas por hacer
const getListado = () => {

        cargarDB();

        return listadoPorHacer;

    }
    //                              marcamos por default que la variable valga true siempre que ejecute la funcion
const actualizar = (descripcion, completado = true) => {

    cargarDB();

    // la funcion findIndex regresa la posición de lo que buscamos dentro del arreglo
    // puede ser = 0 o mayor. y si no encuentra ninguna conincidencia, regresa -1
    // findIndex tiene un callback que regresa el resultado, en este caso ese resultado del
    // callback lo llamamos 'tarea'

    let index = listadoPorHacer.findIndex(tarea => { // esto es el nombre de la "tarea" dentro del arreglo

            return tarea.descripcion === descripcion;

        })
        // index es el la posicion en la cual encontro la descripcion dentro del arreglo, osea, un número
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }


}


const borrar = (descripcion) => {

    cargarDB();
    // filter regresa el mismo arreglo, pero filtrado. en este caso con los elementos
    // que no coincidan con el que queremos borrar.
    let listaFinal = listadoPorHacer.filter(tarea => {
            return tarea.descripcion !== descripcion;
        })
        // comprobamos si los elementos de cada listado son diferentes para saber si se
        // borró un elemento y corroborar que no tienen la misma cantidad de elementos
    if (listadoPorHacer.length === listaFinal.length) {
        return false;
    } else {
        // como guardar guarda listadoPorHacer, lo reescribimos con el nuevo arreglo
        listadoPorHacer = listaFinal;
        guardarDB();
        return true;
    }

}


// funcion para crear la accion
const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}