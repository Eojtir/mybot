import { MemoryDB, addKeyword, createBot,createFlow,createProvider } from "@bot-whatsapp/bot";
import {BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys"


const provider = createProvider(BaileysProvider)
const flowBienvenido = addKeyword(['hola','ola', 'Hola']).addAnswer('¡Hola! ¿Cómo estás?') 
 // Agregamos la keyword
provider.initHttpServer(3002);

provider.http.server.post('/send_message', handleCtx(async (bot, req, res) => {
  const { number, message, mediaUrl } = req.body;
  console.log(mediaUrl)

  try {
    await bot.sendMessage(number, message, {});
    res.end('Message sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).end('Error sending message');
  }
}));


const main = async () =>{
  await createBot({
    database: new MemoryDB(), // Use memory as the bot's data storage.
    flow:createFlow([flowBienvenido]),
    provider
  })

}

main()