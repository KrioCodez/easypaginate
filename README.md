<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&duration=1000&pause=3000&color=F70000&background=000000&center=true&vCenter=true&width=435&lines=EasyPaginate;Make+paginations+easy;supports+latest+discord.js+versions!;Made+by+phantom_raja" alt="Typing SVG" /></a>

---

# EasyPaginate
## 📝 D E T A I L S:
- This package is very usefull for those who are looking for a very easy to use and customize pagination for discord embeds.

---

## ⚙ I N S T A L L A T I O N:
- to use this package, You can install it thru npm 
```bash
npm install easypaginate@latest
```

## 💻 F U N C T I O N S:
To set this up, this package returns a class when required. We can use that class to configure the pagination system however we want!

```js
const Paginator = require("easypaginate")
const Settings = new Paginator({
    errors: {
        previous: "This is the first page!", // [OPTIONAL] displays when no more pages behind.
        next: "This is the last page!" // [OPTIONAL] displays when no more pages left.
    },
    previousButton: {
        text: "◀", // [OPTIONAL] the text of the previous page button.
        style: 1 // [OPTIONAL] style of the button. Can be any number from 1 to 3.
    },
    nextButton: {
        text: "▶", // [OPTIONAL] the text of the next page button.
        style: 1 // [OPTIONAL] style of the button. Can be any number from 1 to 3.
    },
    timeoutInSeconds: 30 // [OPTIONAL] timeout time. Will reset on button press. Timeouts when no input.
    displayPages: true // [OPTIONAL] displays the current page and total pages. Comes with watermark.
    isInteraction: false // <REQUIRED> set true if your bot uses slash commands, false if it doesnt.
})
```
When the class is configured, The the ``.paginate()`` function can be used

``.paginate()``
The function that paginates the embeds.

- Parameters:
1. Message: the message or the interaction recieved
2. The embeds that have to be paginated (Must be given in an array)

```js
client.on("messageCreate", async (message) => {
    if (message.content === "!embedtest") {
        const embeds = [
            new discord.EmbedBuilder()
            .setDescription("Hello!")
            .setColor("Aqua"),
            new discord.EmbedBuilder()
            .setDescription("Bye!!!!")
            .setColor("Green")
        ]
        await Settings.paginate(message, embeds)
    }
})
```

---
## 👀 P R E V I E W:
<img title="First Page" alt="Alt text" src="./screenshots/page 1.png">
<img title="Second Page" alt="Alt text" src="./screenshots/page 2.png">