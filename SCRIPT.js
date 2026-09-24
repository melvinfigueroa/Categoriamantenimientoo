// 1. Tus credenciales
const supabaseUrl = 'https://supabase.co';
const supabaseKey = 'sb_publishable_RS7KswDeUEE7goFwlLqbMg_XYE2orcu';

// 2. Creamos el cliente UNA SOLA VEZ y de forma global
let supabaseClient = null;

// 3. Esperamos a que el HTML esté cargado antes de buscar los botones
document.addEventListener('DOMContentLoaded', () => {
    
    // Botón CONECTAR
    const btnConectar = document.getElementById('btnConectar');
    if (btnConectar) btnConectar.addEventListener('click', conectarSupabase);

    // Botón BUSCAR
    const btnBuscar = document.getElementById('btnBuscar');
    if (btnBuscar) btnBuscar.addEventListener('click', buscarCategoria);

    // Botón GUARDAR (Insertar)
    const btnGuardar = document.getElementById('btnGuardar');
    if (btnGuardar) btnGuardar.addEventListener('click', guardarCategoria);

    // Botón MODIFICAR (Actualizar)
    const btnModificar = document.getElementById('btnModificar');
    if (btnModificar) btnModificar.addEventListener('click', modificarCategoria);
});

// 4. Función: CONECTAR
function conectarSupabase() {
    try {
        if (!supabaseClient) {
            supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
        }
        alert("CONEXIÓN EXITOSA");
        console.log("Cliente Supabase inicializado correctamente:", supabaseClient);
    } catch (error) {
        alert("ERROR DE CONEXIÓN");
        console.error("Detalles del error:", error);
    }
}

// 5. Función: BUSCAR
async function buscarCategoria() {
    if (!supabaseClient) {
        alert("Primero debes conectarte 🔌");
        return;
    }

    const idInput = document.getElementById('id_categoria').value.trim();
    const nombreInput = document.getElementById('nombre_categoria').value.trim();

    if (!idInput && !nombreInput) {
        alert("Ingresa un ID o un Nombre para buscar ⚠️");
        return;
    }

    try {
        let query = supabaseClient.from('categorias').select('*');

        if (idInput) {
            query = query.eq('id_categoria', idInput);
        }
        if (nombreInput) {
            query = query.ilike('nombre', `%${nombreInput}%`); 
        }

        const { data, error } = await query;

        if (error) throw error;

        if (!data || data.length === 0) {
            alert("No se encontró ningún registro.");
            return;
        }

        // Asignar los datos encontrados al formulario
        document.getElementById('id_categoria').value = data[0].id_categoria;
        document.getElementById('nombre_categoria').value = data[0].nombre;
        
        const inputEstado = document.getElementById('estado');
        if (inputEstado) {
            inputEstado.value = data[0].estado;
        }

        alert(`✅ Se encontraron ${data.length} resultado(s).`);

    } catch (error) {
        alert("Error al buscar ❌: " + error.message);
        console.error("Detalle del error:", error);
    }
}

// 6. Función: GUARDAR (Nuevo registro)
async function guardarCategoria() {
    if (!supabaseClient) {
        alert("Primero debes conectarte 🔌");
        return;
    }

    const nombre = document.getElementById('nombre_categoria').value.trim();
    const estado = document.getElementById('estado').value.trim();

    if (!nombre || !estado) {
        alert("Por favor completa el Nombre y el Estado para guardar ⚠️");
        return;
    }

    try {
        const { data, error } = await supabaseClient
            .from('categorias')
            .insert([{ nombre: nombre, estado: estado }])
            .select();

        if (error) throw error;

        alert("✅ Categoría guardada con éxito.");
        console.log("Registro insertado:", data);
        
        // Opcional: limpiar o cargar el ID generado
        if (data && data.length > 0) {
            document.getElementById('id_categoria').value = data[0].id_categoria;
        }

    } catch (error) {
        alert("Error al guardar ❌: " + error.message);
        console.error("Detalle del error:", error);
    }
}

// 7. Función: MODIFICAR (Actualizar registro existente por ID)
async function modificarCategoria() {
    if (!supabaseClient) {
        alert("Primero debes conectarte 🔌");
        return;
    }

    const id = document.getElementById('id_categoria').value.trim();
    const nombre = document.getElementById('nombre_categoria').value.trim();
    const estado = document.getElementById('estado').value.trim();

    if (!id) {
        alert("Debes indicar el ID_CATEGORIA que deseas modificar ⚠️");
        return;
    }

    try {
        const { data, error } = await supabaseClient
            .from('categorias')
            .update({ nombre: nombre, estado: estado })
            .eq('id_categoria', id)
            .select();

        if (error) throw error;

        alert("✅ Categoría modificada con éxito.");
        console.log("Registro actualizado:", data);

    } catch (error) {
        alert("Error al modificar ❌: " + error.message);
        console.error("Detalle del error:", error);
    }
}
