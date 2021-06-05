const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  aliases: [],
  usage: "@user reason",
  description: "Ban mentioned user and reason",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has("BAN_MEMBERS")) return;

    const member = message.mentions.members.first();
    if (!member) return message.reply("Please mention a member to ban!");

    if (message.member.roles.highest.position <= member.roles.highest.position)
      return message.reply(
        "You can punish because u either have the same role or your role is lower."
      );

    const reason = args.slice(1).join(" ") || "No Reason Provided";
    const embed = new MessageEmbed()
      .setTitle(`Successfully Banned!`)
      .addField("Banned User", member)
      .addField("Moderator", `<@${message.author.id}>`)
      .addField("Reason", reason)
      .setColor("RED")
      .setTimestamp();

    const memberEmbed = new MessageEmbed()
      .setTitle(`You have been banned from ${message.guild.name}!`)
      .addField("Moderator", message.author)
      .addField("Reason", reason);

    member.ban({ reason });
    message.channel.send(embed);
  },
};
