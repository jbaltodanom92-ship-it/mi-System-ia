// --- REGISTRO DE PWA (Indispensable para instalar) ---
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(() => console.log("PWA lista para instalación"))
        .catch(err => console.log("Fallo en SW", err));
}

// --- LÓGICA DE LOGIN E IA ---
const usuarios = {
    "Jose Alfredo Baltodano Mora": { pin: "1234", cargo: "Admin", genero: "masculino" },
    "Auditor_QA": { pin: "5678", cargo: "QA_Auditor", genero: "femenino" }
};

function iniciarAsistenteVoz(mensaje, genero) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(mensaje);
    
    // Selección de voz según género detectado
    const voces = synth.getVoices();
    if (genero === "masculino") {
        utterance.voice = voces.find(v => v.name.includes("David") || v.lang.includes("es"));
    } else {
        utterance.voice = voces.find(v => v.name.includes("Helena") || v.lang.includes("es"));
    }
    synth.speak(utterance);
}

// Función que mencionaste para WhatsApp: Copia y Limpia
function copiarParaWhatsApp() {
    const codigoInput = document.getElementById('inputCodigo');
    const resultadoArea = document.getElementById('resultado');
    
    // Lógica de copiado al portapapeles
    navigator.clipboard.writeText(resultadoArea.innerText).then(() => {
        alert("Código copiado para WhatsApp");
        
        // REGLA SOLICITADA: Limpiar campos tras copiar
        codigoInput.value = "";
        resultadoArea.innerHTML = "";
    });
}

// Alarma de fin de jornada con voz
function alarmaSalida(minutosRestantes) {
    const msj = `Ya faltan ${minutosRestantes} minutos para salir, por favor ve guardando tu trabajo.`;
    iniciarAsistenteVoz(msj, "masculino");
}
