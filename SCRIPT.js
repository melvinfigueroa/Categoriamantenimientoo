// 1. Tus credenciales
const supabaseUrl = 'https://supabase.co';
const supabaseKey = 'sb_publishable_RS7KswDeUEE7goFwlLqbMg_XYE2orcu';

// 2. Creamos el cliente UNA SOLA VEZ y de forma global
let supabaseClient = null;

// 3. Esperamos a que el HTML esté cargado antes de buscar los botones
document.addEventListener('DOMContentLoaded', () => {
    
    // Asignamos el evento click al botón CONECTAR
    const btnConectar = document.getElementById('btnConectar');
    if (btnConectar) {
        btnConectar.addEventListener('click', conectarSupabase);
    } else {
        console.error("No se encontró el botón btnConectar en el HTML");
    }

    // Asignamos el evento click al botón BUSCAR
    const btnBuscar = document.getElementById('btnBuscar');
    if (btnBuscar) {
        btnBuscar.addEventListener('click', buscarCategoria);
    } else {
        console.error("No se encontró el botón btnBuscar en el HTML");
    }  
});

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
}

// 5. Función que se ejecuta al hacer clic en BUSCAR
async function buscarCategoria() {
    // Verificar que el cliente esté conectado
    if (!supabaseClient) {
        alert("Primero debes conectarte 🔌");
        return;
    }

    // Obtener los valores del formulario
    const idInput = document.getElementById('id_categoria').value.trim();
    const nombreInput = document.getElementById('nombre_categoria').value.trim();

    // Validar que al menos uno esté lleno
    if (!idInput && !nombreInput) {
        alert("Ingresa un ID o un Nombre para buscar ⚠️");
        return;
    }

    try {
        // Construir la consulta base en la tabla 'categorias'
        let query = supabaseClient.from('categorias').select('*');

        // Filtrar según lo que el usuario escribió
        if (idInput) {
            query = query.eq('id_categoria', idInput);
        }
        if (nombreInput) {
            query = query.ilike('nombre', `%${nombreInput}%`); 
        }

        // Ejecutar la consulta en Supabase
        const { data, error } = await query;

        if (error) throw error;

        console.log("Datos recibidos de Supabase:", data);

        // Si el arreglo regresa vacío, significa que el registro no existe
        if (!data || data.length === 0) {
            alert("No se encontró ese número");
            return;
        }

        // ASIGNACIÓN SEGURO: Acceder al primer elemento del arreglo con [0]
        document.getElementById('id_categoria').value = data[0].id_categoria;
        document.getElementById('nombre_categoria').value = data[0].nombre;
        document.getElementById('estado').value = data[0].estado;

        alert(`✅ Se encontraron ${data.length} resultado(s).`);

    } catch (error) {
        alert("Error al buscar ❌: " + error.message);
        console.error("Detalle del error:", error);
    }
}
