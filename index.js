const Discord = require("discord.js-selfbot-v13");
const { joinVoiceChannel, getVoiceConnection, VoiceConnectionStatus } = require('@discordjs/voice');
const colors = require("colors");
const express = require('express');
const app = express();

// Discord bot configuration
const token = process.env.DISCORD_TOKEN; // Retrieve the token from Replit environment variables
const channel_id = [
  "1007951763472650240"
]

let videoStreamConnection; // To store the voice connection for video streaming

channel_id.forEach(channelid => {
  const client = new Discord.Client({
    checkUpdate: false
  });

  client.on("ready", async () => {
    if (channelid == channel_id[0]) {
      console.log(colors.red("Online channel") + " | Ready!");
      console.log("- Logined as " + client.user.tag);
    }

    const channel = client.channels.cache.get(channelid);

    if (channel) {
      if (channel.type == "GUILD_VOICE") {
        videoStreamConnection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator,
        });

        videoStreamConnection.on(VoiceConnectionStatus.Ready, () => {
          console.log('- Connected to channel! (' + channel.name + ')');
          startVideoStream();
        });
      } else {
        console.log("- The channel isn't a voice channel! (" + channelid + ")")
      }
    } else {
      console.log("- Channel isn't found! (" + channelid + ")");
    }
  });

  client.login(token)
    .catch(async () => {
      if (channelid == channel_id[0]) {
        console.log(colors.red("Online channel") + " | Error!");
        console.log("- Token is incorrect!");
      }
    });
});

// Express app configuration
app.get('/', (req, res) => {
  res.send('Served by: Express in nodejs');
});

app.listen(3000, () => {});

// Discord bot presence
const { Client } = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const name3 = "YouTube" //ชื่อปุ๋ม
const like = "https://youtu.be/0tOXxuLcaog?si=8VbjbJO2rK5ZKzsp" //ลิ้งดิส
const png1 = "https://cdn.discordapp.com/attachments/1007951763472650240/1196060823248982127/b359cca0e53c15a71b5ff8af3ae5ff5d.jpg" //ใส่ลิ้งรูป

client.on("ready", async () => {
  console.log(`${client.user.username} is online !`);
  startVideoStream();
});

function startVideoStream() {
  const a = new Date(Date.now());
  const c = { timeZone: "Asia/Bangkok", day: "numeric", month: "2-digit", year: "numeric" };
  const b = a.toLocaleDateString("th-TH", c);
  const d = new Discord.RichPresence()
    .setApplicationId("1189081472716513382")
    .setType("STREAMING")
    .setURL("https://www.twitch.tv/snow_yo_")
    .setState(` ${b} - ${getCurrentTime()}`)
    .setName("YouTube")
    .setDetails(`[ ในวันที่คุณล้ม แสดงว่าคุณลื่น ]`)
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage(png1)
    .addButton(name3, like);
  client.user.setActivity(d);
}

function getCurrentTime() {
  const a = new Date(Date.now());
  const c = { timeZone: "Asia/Bangkok", hour: "2-digit", minute: "2-digit", hour12: false };
  return a.toLocaleTimeString("en-US", c);
}

client.login(process.env.DISCORD_TOKEN); //ใส่โทเค่น