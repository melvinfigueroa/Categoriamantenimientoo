// 1. Credenciales de Supabase
const supabaseUrl = 'https://naookbfozaqhfuzljzoh.supabase.co';
const supabaseKey = 'sb_publishable_RS7KswDeUEE7goFwlLqbMg_XYE2orcu';

// 2. Cliente de Supabase
let supabaseClient = null;


// 3. Cargar cuando el HTML esté listo
document.addEventListener('DOMContentLoaded', () => {

    // Botón CONECTAR
    const btnConectar = document.getElementById('btnConectar');

    if (btnConectar) {
        btnConectar.addEventListener('click', conectarSupabase);
    }

    // Botón BUSCAR
    const btnBuscar = document.getElementById('btnBuscar');

    if (btnBuscar) {
        btnBuscar.addEventListener('click', buscarCategoria);
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

        console.log("Supabase conectado correctamente");

    } catch (error) {

        alert("ERROR DE CONEXIÓN");

        console.error(error);

    }

}


// 5. BUSCAR CATEGORÍA POR ID
async function buscarCategoria() {

    // Verificar conexión
    if (!supabaseClient) {

        alert("Primero debes conectarte 🔌");

        return;

    }


    // Obtener el número escrito
    const id = document
        .getElementById('id_categoria')
        .value
        .trim();


    // Verificar que se haya escrito
    if (!id) {

        alert("Ingresa el número de la categoría ⚠️");

        return;

    }


    try {

        // Buscar en la tabla categorias
        const { data, error } = await supabaseClient
            .from('categorias')
            .select('*')
            .eq('id_categoria', id);


        // Verificar error
        if (error) {

            throw error;

        }


        // Si no encontró
        if (!data || data.length === 0) {

            alert("No se encontró la categoría ❌");

            return;

        }


        // Mostrar los datos encontrados
        document.getElementById('id_categoria').value =
            data[0].id_categoria;

        document.getElementById('nombre_categoria').value =
            data[0].nombre;

        document.getElementById('estado').value =
            data[0].estado;


        alert("✅ Categoría encontrada");


        console.log("Datos encontrados:", data[0]);


    } catch (error) {

        alert("Error al buscar: " + error.message);

        console.error("Error:", error);

    }

}
