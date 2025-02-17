const { ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");

module.exports = class Setting {
    constructor(details = {}) {
        if (!details.errors) details.errors = {};
        if (!details.errors.previous || typeof details.errors.previous !== "string") details.errors.previous = "This is the first page!";
        if (!details.errors.next || typeof details.errors.next !== "string") details.errors.next = "This is the last page!";
        if (!details.previousButton) details.previousButton = {};
        if (!details.nextButton) details.nextButton = {};
        if (!details.previousButton.text || typeof details.previousButton.text !== "string") details.previousButton.text = "◀";
        if (!details.previousButton.style || typeof details.previousButton.style !== "number" || details.previousButton.style > 3 || details.previousButton.style <= 0) details.previousButton.style = 1;
        if (!details.nextButton.text || typeof details.nextButton.text !== "string") details.nextButton.text = "▶";
        if (!details.nextButton.style || typeof details.nextButton.style !== "number" || details.nextButton.style > 3 || details.nextButton.style <= 0) details.nextButton.style = 1;
        if (!details.timeoutInSeconds || typeof details.timeoutInSeconds !== "number") details.timeoutInSeconds = 30;
        if (typeof details.displayPages !== "boolean") details.displayPages = true;
        if (typeof details.isInteraction !== "boolean" ) throw new Error("details.isInteractions has to be mentioned! [easypaginate]")
        this.details = details;
    }

    /**
     * 
     * @param {*} message Interaction or message sent or made by user
     * @param {*} embeds The embeds that have to be paginated
     */

    async paginate(message, embeds) {
        if (!message) throw new Error("Message/Interaction arguement not given! [easypaginate]");
        if (!embeds || embeds.length < 0) throw new Error("Embeds given are invalid! [easypaginate]")
        try {
            const { isInteraction, displayPages, nextButton, previousButton, timeoutInSeconds } = this.details;
            var user;
            if (isInteraction === true) user = message.user;
            else user = message.author;
            var currentPage = 0;
            const buttons = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setCustomId("previous")
                .setLabel(previousButton.text)
                .setStyle(previousButton.style),
                new ButtonBuilder()
                .setCustomId("next")
                .setLabel(nextButton.text)
                .setStyle(nextButton.style)
            );
            if (displayPages === true) {
                embeds[0].setFooter({ text: `Powered by easypaginate ◆ ${currentPage+1}/${embeds.length}` });
            }
            var sentMessage;
            if (isInteraction === true) {
                await message.reply({ embeds: [embeds[0]], components: [buttons] });
            } else {
                sentMessage = await message.channel.send({ embeds: [embeds[0]], components: [buttons] });
            }

            const filter = i => i.user.id = user.id;
            const collector = message.channel.createMessageComponentCollector({
                filter: filter,
                time: timeoutInSeconds*1000
            })

            collector.on("collect", async (i) => {
                await i.deferUpdate();
            
                if (i.customId == "previous") {
                    if (embeds[currentPage - 1]) {
                        currentPage = currentPage - 1;
                        embeds[currentPage].setFooter({ text: `Powered by easypaginate ◆ ${currentPage + 1}/${embeds.length}` });
            
                        if (isInteraction) {
                            await message.editReply({ embeds: [embeds[currentPage]], components: [buttons] });
                        } else {
                            await sentMessage.edit({ embeds: [embeds[currentPage]], components: [buttons] });
                        }
                    } else {
                        await i.followUp({ content: "This is the first page!", ephemeral: true });
                    }
                }
            
                if (i.customId == "next") {
                    if (embeds[currentPage + 1]) {
                        currentPage = currentPage + 1;
                        embeds[currentPage].setFooter({ text: `Powered by easypaginate ◆ ${currentPage + 1}/${embeds.length}` });
            
                        if (isInteraction) {
                            await message.editReply({ embeds: [embeds[currentPage]], components: [buttons] });
                        } else {
                            await sentMessage.edit({ embeds: [embeds[currentPage]], components: [buttons] });
                        }
                    } else {
                        await i.followUp({ content: "This is the last page!", ephemeral: true });
                    }
                }
            
                collector.resetTimer();
            });
            

            collector.on("end", async() => {
                if (isInteraction === true) {
                    await message.editReply({ embeds: [embeds[currentPage]], components: [] });
                } else {
                    await sentMessage.delete();
                    await message.channel.send({ embeds: [embeds[currentPage]] });
                }
            })
        } catch(e) {
            throw new Error(`Error while pagination [easypaginate]: ${e}`);
        }
    }
}