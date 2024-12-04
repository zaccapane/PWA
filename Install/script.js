// Registra il service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-workers.js')
            .then((registration) => {
                console.log('Service Worker registrato con successo:', registration);
            })
            .catch((error) => {
                console.log('Registrazione Service Worker fallita:', error);
            });
    });
}

// Logica di installazione
let deferredPrompt;
const installBanner = document.getElementById('install-banner');
const installButton = document.getElementById('install-button');

window.addEventListener('beforeinstallprompt', (e) => {
    // Previene che il banner di installazione appaia immediatamente
    e.preventDefault();
    
    // Salva l'evento per mostrarlo successivamente
    deferredPrompt = e;
    
    // Mostra il banner personalizzato
    installBanner.classList.remove('hidden');
});

installButton.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Mostra il prompt di installazione
        deferredPrompt.prompt();
        
        // Attendi la scelta dell'utente
        const result = await deferredPrompt.userChoice;
        
        if (result.outcome === 'accepted') {
            console.log('App installata');
        } else {
            console.log('Installazione rifiutata');
        }
        
        // Resetta il prompt
        deferredPrompt = null;
        
        // Nascondi il banner
        installBanner.classList.add('hidden');
    }
});

// Gestisci il caso in cui l'app è già installata
window.addEventListener('appinstalled', (evt) => {
    console.log('App installata con successo');
});