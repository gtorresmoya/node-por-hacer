require('colors');

const { guardaDB, leerDB } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu, 
    pausaMenu,
    leerInput
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
                console.log(tareas.listadoArr);
                break;
            default:
                break;
        }

        guardaDB(JSON.stringify(tareas.listadoArr));

        await pausaMenu(); 

    } while( opt !== '0' );
}

main();