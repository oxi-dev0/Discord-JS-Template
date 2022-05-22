<h1 align="center"> Discord JS Template </h2>
<p align="center">
    <a href="#">
        <img src="https://img.shields.io/github/repo-size/oxi-dev0/Discord-JS-Template" alt="Repo Size">
    </a>
    <a href="#">
        <img src="https://img.shields.io/github/stars/oxi-dev0/Discord-JS-Template" alt="Stars">
    </a>
    <a href="#">
        <img src="https://img.shields.io/github/forks/oxi-dev0/Discord-JS-Template" alt="Forks">
    </a>
    <a href="#">
        <img src="https://img.shields.io/github/watchers/oxi-dev0/Discord-JS-Template" alt="Watchers">
    </a>
</p>

<h3 align="center"> A Discord.JS bot template for easy and clean development </h3>
<h6 align="center"> Please Note: You will need experience with creating discord bots and using discord.js to be able to use this template. It is just intended to make the initial development of the bot faster, and easier to read and handle. </h1>

<h3> Initial Setup </h3>

1. Edit `Config/config.js` to have your bot's token and intents. Also, configure the command prefix, and presence.
2. Edit `Config/functions.js` to have your server's moderator role id.
3. Edit `Config/events.js` to have your server's log channel id.
4. Run `Core/bot.js` to start the bot.

<br>

<h2> Documentation </h2>
<h6> Run <code>Core/bot.js</code> to start the bot. If you intend on hosting, configure the server to run that file. </h6>

<h3> Types </h3>
<h4> Argstring </h4>
An argstring defines the expected arguments for a command. It allows for types and optional arguments to be specified.
<br>

| Token | Description | Examples |
| --- | --- | --- |
| `{user}` | A user mention or id | `<@!816824328322023435>` or `816824328322023435` |
| `{string}` | Any string. If this is the last argument, it will consume the rest of the message | `hello` or `kicked for breaking rules` (if last argument) |
| `{int}` | An integer | `23` |
|  |  |  |
| `\|` | Any argument types after this will be optional |  |

> An example of an ARGSTRING is `{user} {int} | {string}`. This requires a user mention, then an integer, then optionally, a string.

<br>
<h4> Call Command Definition </h4>
These objects are used in <code>functions.js</code> to define what callable commands are available for the bot.

| Key | Type | Example |
| --- | --- | --- |
| `function` | `JS Function Object` | `kick` |
| `roles` | `Command Roles Definition` | `{roles: ['977987741843324939'], invert: false}` |
| `args` | `Argstring` | `{user} \| {string}` |

<br>
<h4> Auto Command Definition </h4>
These objects are used in <code>functions.js</code> to define what commands should be ran on all messages sent. <code>skipRoles</code> is used to determine what roles' messages these should not be ran on.

| Key | Type | Example |
| --- | --- | --- |
| `function` | `JS Function Object` | `scanForBannedWords` |
| `skipRoles` | `JS Array<String>` | `['977987741843324939']` |

<br>
<h4> Command Roles Definition </h4>
These objects are used in Call Command Definitions to determine what roles are able to use the command. 

| Key | Type | Definition |
| --- | --- | --- |
| `roles` | `JS Array<String>` | The roles that should be either allowed to use or blocked from using the command |
| `invert` | `Bool` | This inverts the selection so that these roles are blocked from the command |

