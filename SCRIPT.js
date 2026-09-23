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


//Asignamos el evento clic al botón BUSCAR
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

async function buscarCategoria() {

    const numero = document.getElementById("id_categoria").value.trim();

    if (numero === "") {
        alert("Escribe el número");
        return;
    }

    const { data, error } = await supabaseClient
        .from("categorias")
        .select("*")
        .eq("id_categoria", numero);

    if (error) {
        alert("Error: " + error.message);
        console.error(error);
        return;
    }

    if (data.length === 0) {
        alert("No existe ese número");
        return;
    }

    document.getElementById("nombre_categoria").value = data[0].nombre;
    document.getElementById("estado").value = data[0].estado;

    alert("Registro encontrado");
}
