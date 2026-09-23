// 1. Tus credenciales
const supabaseUrl = 'https://naookbfozaqhfuzljzoh.supabase.co';
const supabaseKey = 'sb_publishable_RS7KswDeUEE7goFwlLqbMg_XYE2orcu';

// 2. Crear el cliente una sola vez
let supabaseClient = null;


// 3. Esperar a que cargue el HTML
document.addEventListener('DOMContentLoaded', () => {

    // BOTÓN CONECTAR
    const btnConectar = document.getElementById('btnConectar');

    if (btnConectar) {
        btnConectar.addEventListener('click', conectarSupabase);
    } else {
        console.error("No se encontró el botón btnConectar");
    }


    // BOTÓN BUSCAR
    const btnBuscar = document.getElementById('btnBuscar');

    if (btnBuscar) {
        btnBuscar.addEventListener('click', buscarCategoria);
    } else {
        console.error("No se encontró el botón btnBuscar");
    }

});


// 4. CONECTAR CON SUPABASE
function conectarSupabase() {

    try {

        if (!supabaseClient) {

            supabaseClient = supabase.createClient(
                supabaseUrl,
                supabaseKey
            );

        }

        alert("CONEXIÓN EXITOSA");

        console.log(
            "Cliente Supabase conectado:",
            supabaseClient
        );

    } catch (error) {

        alert("ERROR DE CONEXIÓN");

        console.error(
            "Detalles del error:",
            error
        );

    }

}


// 5. BUSCAR CATEGORÍA POR NÚMERO
async function buscarCategoria() {

    // Verificar conexión
    if (!supabaseClient) {

        alert("Primero debes conectarte 🔌");

        return;
    }


    // Obtener el número escrito
    const numero = document
        .getElementById('numero')
        .value
        .trim();


    // Verificar que haya un número
    if (!numero) {

        alert("Ingresa un número para buscar ⚠️");

        return;
    }


    try {

        // Consulta a la tabla categorias
        let query = supabaseClient
            .from('categorias')
            .select('*');


        // BUSCAR POR EL CAMPO numero
        query = query.eq('numero', numero);


        // Ejecutar consulta
        const { data, error } = await query;


        // Verificar error
        if (error) {

            throw error;

        }


        // Si no encontró resultados
        if (!data || data.length === 0) {

            alert("No se encontró ninguna categoría ❌");

            return;
        }


        // Mostrar los datos encontrados
        document.getElementById('numero').value =
            data[0].numero;


        document.getElementById('id_categoria').value =
            data[0].id_categoria;


        document.getElementById('nombre_categoria').value =
            data[0].nombre;


        document.getElementById('estado').value =
            data[0].estado;


        // Mensaje
        alert("✅ Categoría encontrada");


        console.log(
            "Categoría encontrada:",
            data[0]
        );


    } catch (error) {

        alert(
            "Error al buscar ❌: " +
            error.message
        );

        console.error(
            "Detalle del error:",
            error
        );

    }

}
