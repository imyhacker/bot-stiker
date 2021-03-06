const {
  create,
  Client,
  decryptMedia
} = require("@open-wa/wa-automate");

create().then((client) => start(client));

async function start(client) {
  client.onMessage(async (msg) => {
    // console.log(msg);
    if (msg.body === "!cek") {
      client.sendText(msg.from, "👋 Hello! BOT AKTIF");
      client;
    } else if (msg.body.startsWith("!url ")) {
	let url = msg.body.split(" ")[1];
	await client.sendStickerfromUrl(msg.from, url);
	} else if (msg.body === "!stiker") {
	if (quotedMsg && quotedMsg.type == 'image') {
    const mediaData = await decryptMedia(quotedMsg);
    const imageBase64 = `data:${msg.mimetype};base64,${mediaData.toString(
          "base64"
        )}`;
      await client.sendImageAsSticker(msg.from, imageBase64);
	  }
	} else if (msg.mimetype) {
      if (msg.caption === "!stiker" && msg.type === "image") {
        const mediaData = await decryptMedia(msg);
        const imageBase64 = `data:${msg.mimetype};base64,${mediaData.toString(
          "base64"
        )}`;
        await client.sendImageAsSticker(msg.from, imageBase64);
      }
    }
  });
}