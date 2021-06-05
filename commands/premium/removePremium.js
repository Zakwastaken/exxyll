const premiumSchema = require("../../models/premium");
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "del-premium",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== "788260234409672754") return;

    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!member) return message.reply("Please specify a valid member!");

    premiumSchema.findOne(
      {
        User: member.id,
      },
      async (err, data) => {
        if (!data)
          return message.reply("User was previously not added to database!");
        data.delete();
        message.channel.send("Removed user from database!");
      }
    );
  },
};