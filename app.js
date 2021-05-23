require('colors');

const { guardaDB, leerDB } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu, 
    pausaMenu,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async() => {
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();
    if(tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas();
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== '0'){
                    const ok = await confirmar('¿Esta seguro que desea Borrar?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente');
                    }
                }
                break;
            default:
                break;
        }

        guardaDB(JSON.stringify(tareas.listadoArr));

        await pausaMenu(); 

    }  while( opt !== '0' );
}

main();