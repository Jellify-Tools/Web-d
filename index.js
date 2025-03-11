const axios = require('axios');

const webhookUrl = 'https://discord.com/api/webhooks/1348892648609415168/vHIiyiQnsFGuCVyFYb9PPA4d3lGgnlebMojxXsngnZl1-YFqTwbNPCcqZVhV0sBU1COx';

let messageId = null;

async function sendMessage() {
    try {
        const response = await axios.post(webhookUrl, {
            content: `Initiale Nachricht gesendet um: ${new Date().toLocaleTimeString()}`
        });

        messageId = response.data.id;
        console.log('Nachricht gesendet:', messageId);

        // Starte das Aktualisieren der Nachricht
        updateMessage();
    } catch (error) {
        console.error('Fehler beim Senden der Nachricht:', error);
    }
}

async function updateMessage() {
    setInterval(async () => {
        try {
            const delay = Math.floor(Math.random() * 1000); // Simulierter Delay
            await axios.patch(`${webhookUrl}/messages/${messageId}`, {
                content: `Aktualisierte Nachricht um: ${new Date().toLocaleTimeString()} mit einem Delay von ${delay}ms`
            });
            console.log('Nachricht aktualisiert:', messageId);
        } catch (error) {
            console.error('Fehler beim Aktualisieren der Nachricht:', error);
        }
    }, 3000);
}

sendMessage();
