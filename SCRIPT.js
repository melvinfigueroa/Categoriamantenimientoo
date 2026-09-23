// 1. Tus credenciales
const supabaseUrl = 'https://naookbfozaqhfuzljzoh.supabase.co'
const supabaseKey = 'sb_publishable_RS7KswDeUEE7goFwlLqbMg_XYE2orcu'

// 2. Creamos el cliente UNA SOLA VEZ y de forma global
let supabaseClient = null;

// 3. Esperamos a que el HTML esté cargado antes de buscar el botón
document.addEventListener('DOMContentLoaded', () => {
    
    // Asignamos el evento click al botón CONECTAR
    const btnConectar = document.getElementById('btnConectar');
    
    if (btnConectar) {
        btnConectar.addEventListener('click', conectarSupabase);
    } else {
        console.error("No se encontró el botón btnConectar en el HTML");
    }
});
const btnBuscar = document.getElementById('btnBuscar');
    if (btnBuscar) {
        btnBuscar.addEventListener('click', buscarCategoria);
    } else {
        console.error("No se encontró el botón btnBuscar en el HTML");
    }

// 4. Función que se ejecuta al hacer clic en CONECTAR
function conectarSupabase() {
    try {
        // Si aún no se ha creado el cliente, lo creamos
        if (!supabaseClient) {
            supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
        }
        
        // Si se crea correctamente, mostramos el mensaje
        alert("CONEXIÓN EXITOSA");
        console.log("Cliente Supabase inicializado correctamente:", supabaseClient);
        
    } catch (error) {
        alert("ERROR DE CONEXIÓN");
        console.error("Detalles del error:", error);
    }
async function buscarCategoria() {
    // 1. Verificar que el cliente esté conectado
    if (!supabaseClient) {
        alert("Primero debes conectarte 🔌");
        return;
    }

    // 2. Obtener los valores del formulario
    const inputId = document.getElementById('id_categoria');
    const inputNombre = document.getElementById('nombre_categoria');
    const inputEstado = document.getElementById('estado');

    if (!inputId || !inputNombre || !inputEstado) {
        console.error("Error: Uno o más inputs no se encontraron en el HTML. Revisa los IDs.");
        alert("Error de estructura en el formulario HTML ⚠️");
        return;
    }

    const id = inputId.value.trim();
    const nombre = inputNombre.value.trim();

    // 3. Validar que al menos uno esté lleno
    if (!id && !nombre) {
        alert("Ingresa un ID o un Nombre para buscar ⚠️");
        return;
    }

    try {
        // 4. Construir la consulta base
        let query = supabaseClient.from('categorias').select('*');

        // 5. Filtrar según lo que el usuario escribió
        if (id) {
            query = query.eq('id_categoria', id);
        } else if (nombre) {
            query = query.ilike('nombre', `%${nombre}%`); 
        }

        // 6. Ejecutar la consulta
        const { data, error } = await query;

        if (error) throw error;

        // 7. Si no hay resultados
        if (!data || data.length === 0) {
            alert("No se encontró ninguna categoría ❌");
            return;
        }

        // 8. CORREGIDO: Asignar el primer resultado usando el índice [0]
        inputId.value = data[0].id_categoria;
        inputNombre.value = data[0].nombre; // Asegúrate de que en tu tabla de Supabase la columna se llame 'nombre'
        inputEstado.value = data[0].estado; // Asegúrate de que en tu tabla de Supabase la columna se llame 'estado'

        alert(`✅ Se encontraron ${data.length} resultado(s).`);

    } catch (error) {
        alert("Error al buscar ❌: " + error.message);
        console.error("Detalle del error:", error);
    }
}
