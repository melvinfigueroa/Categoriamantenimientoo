// ==========================================
// CONEXIÓN CON SUPABASE
// ==========================================

const supabaseUrl = 'https://naookbfozaqhfuzljzoh.supabase.co';

const supabaseKey = 'sb_publishable_RS7KswDeUEE7goFwlLqbMg_XYE2orcu';

const supabaseClient = supabase.createClient(
    supabaseUrl,
    supabaseKey
);


// ==========================================
// BOTONES
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('btnConectar')
        .addEventListener('click', conectar);

    document.getElementById('btnBuscar')
        .addEventListener('click', buscar);

});


// ==========================================
// CONECTAR
// ==========================================

function conectar() {

    alert("CONEXIÓN EXITOSA");

}


// ==========================================
// BUSCAR POR NÚMERO
// ==========================================

async function buscar() {

    // Obtener el número escrito
    const numero = document
        .getElementById('id_categoria')
        .value
        .trim();


    // Verificar que escribió algo
    if (numero === '') {

        alert("Escribe el número de la categoría");

        return;
    }


    // Buscar en Supabase
    const { data, error } = await supabaseClient
        .from('categorias')
        .select('*')
        .eq('id_categoria', numero);


    // Verificar error
    if (error) {

        console.error(error);

        alert("ERROR: " + error.message);

        return;
    }


    // Verificar si existe
    if (!data || data.length === 0) {

        alert("No se encontró ese número");

        return;
    }


    // Mostrar los datos encontrados
    document.getElementById('id_categoria').value =
        data[0].id_categoria;

    document.getElementById('nombre_categoria').value =
        data[0].nombre;

    document.getElementById('estado').value =
        data[0].estado;


    alert("REGISTRO ENCONTRADO ✅");

    console.log("Registro encontrado:", data[0]);

}
