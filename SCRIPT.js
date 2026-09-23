const supabaseUrl = 'https://naookbfozaqhfuzljzoh.supabase.co';
const supabaseKey = 'sb_publishable_RS7KswDeUEE7goFwlLqbMg_XYE2orcu';

let supabaseClient;


// INICIAR
document.addEventListener('DOMContentLoaded', function () {

    const btnConectar = document.getElementById('btnConectar');
    const btnBuscar = document.getElementById('btnBuscar');

    if (btnConectar) {
        btnConectar.addEventListener('click', conectarSupabase);
    }

    if (btnBuscar) {
        btnBuscar.addEventListener('click', buscarCategoria);
    }

});


// CONECTAR
function conectarSupabase() {

    try {

        supabaseClient = supabase.createClient(
            supabaseUrl,
            supabaseKey
        );

        alert('CONEXIÓN EXITOSA');

        console.log('Supabase conectado');

    } catch (error) {

        console.error(error);

        alert('ERROR: ' + error.message);

    }

}


// BUSCAR
async function buscarCategoria() {

    console.log('Botón BUSCAR presionado');

    if (!supabaseClient) {

        alert('Primero presiona CONECTAR');

        return;

    }


    const campoID = document.getElementById('id_categoria');

    if (!campoID) {

        alert('No existe el campo id_categoria en el HTML');

        return;

    }


    const id = campoID.value.trim();


    if (id === '') {

        alert('Escribe el número de la categoría');

        return;

    }


    console.log('ID que se está buscando:', id);


    try {

        const { data, error } = await supabaseClient
            .from('categorias')
            .select('*')
            .eq('id_categoria', Number(id))
            .single();


        if (error) {

            console.error('ERROR SUPABASE:', error);

            alert('No se encontró la categoría: ' + error.message);

            return;

        }


        console.log('CATEGORÍA ENCONTRADA:', data);


        // MOSTRAR RESULTADOS

        document.getElementById('id_categoria').value =
            data.id_categoria;

        document.getElementById('nombre_categoria').value =
            data.nombre;

        document.getElementById('estado').value =
            data.estado;


        alert('✅ CATEGORÍA ENCONTRADA');


    } catch (error) {

        console.error(error);

        alert('ERROR: ' + error.message);

    }

}
