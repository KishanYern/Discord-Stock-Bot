# Discord Stock Bot Project

This is a discord bot application to access real-time information about the stock market from the discord platform. This application mainly uses the stocks.js package, which also uses [Alpha Vantage](https://www.alphavantage.co/) as its data source using the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

## Important Packages

Some important packages used on this project are:

1. [Stocks.js](https://github.com/wagenaartje/stocks.js) module
2. [live-stock-price](https://github.com/tpatel29/live-stock-price) module
3. [discord.js](https://discord.js.org/) module
4. [mongoose](https://mongoosejs.com/docs/guide.html) module

## Local Development

1. In your project folder, run npm install and install all the dependancies doing the following:

```
npm install
npm install discord.js
npm install stocks.js
npm install live-stock-price
npm install mongoose
```

2. Create a .env file and upload your discord token. [How to get a discord token](https://discord.com/developers/docs/getting-started).
   make sure your .env file is in this format:
   `token=ASDWDWDU`
   where ASDWDWDU is replaced with your discord bot token.
3. You will also need to put a database token into the .env in the format: `databaseToken=ASDWDWDU`. You can use MongoDB Atlas to set this up. A tutorial can be found [here](https://www.youtube.com/watch?v=Ina9qiiujCQ)
4. Make sure your bot is in your discord server with administrative permissions and enjoy!

## Stock Commands

### get-current-price

The `get-current-price` command takes one argument, which is required, and returns the current price of the stock at that time. For this, we use the `live-stock-price` module. <br />
Usage:

```
Command:
/get-current-price AAPL

Discord Output:
Current price of AAPL is: $190.32
```

To handle invalid stock names, the function will throw an error leading the discord bot to reply accordingly. It will also log the error in the console, but will not stop the bot from running. <br />
Usage:

```
Command:
/get-current-price APPL

Discord Output:
Invalid Stock Name!
```

### get-price-intervals

The `get-price-intervals` command takes three required arguments. They are stock-name, interval-time, and amount in that order. This command returns `amount` number of data at `interval-time` intervals on the `stock-name` stock. For example, `/get-price-intervals stock-name: AAPL interval-time: 15min amount: 10` returns 10 high and low values of AAPL in intervals of 15 minutes. <br />
Usage:

```
Command:
/get-price-intervals AAPL 15min 10

Discord Output:
Information on AAPL for 10 15min intervals:
On Tue Nov 28 2023 17:45:00 GMT-0600 (Central Standard Time), the stock opened at $189.72 and closed at $189.94.
On Tue Nov 28 2023 17:30:00 GMT-0600 (Central Standard Time), the stock opened at $189.67 and closed at $189.65.
On Tue Nov 28 2023 17:15:00 GMT-0600 (Central Standard Time), the stock opened at $189.63 and closed at $189.64.
On Tue Nov 28 2023 17:00:00 GMT-0600 (Central Standard Time), the stock opened at $189.75 and closed at $189.64.
On Tue Nov 28 2023 16:45:00 GMT-0600 (Central Standard Time), the stock opened at $189.745 and closed at $189.742.
On Tue Nov 28 2023 16:30:00 GMT-0600 (Central Standard Time), the stock opened at $189.502 and closed at $189.79.
On Tue Nov 28 2023 16:15:00 GMT-0600 (Central Standard Time), the stock opened at $189.48 and closed at $189.6.
On Tue Nov 28 2023 16:00:00 GMT-0600 (Central Standard Time), the stock opened at $189.465 and closed at $189.47.
On Tue Nov 28 2023 15:45:00 GMT-0600 (Central Standard Time), the stock opened at $189.5 and closed at $189.46.
On Tue Nov 28 2023 15:30:00 GMT-0600 (Central Standard Time), the stock opened at $189.44 and closed at $189.5.
```

The `interval-time` option uses the [autocomplete](https://discordjs.guide/slash-commands/autocomplete.html#enabling-autocomplete) function of discord.js to make sure that the interval options are valid. The only valid options for this are: '1min', '5min', '15min', '30min', '60min', 'daily', 'weekly', and 'monthly'. Information will be retrieved from at most 6 years in the past.

The `amount` option has to be between 1 and 50 (inclusive)

To handle any errors such as invalid stock name, the stocks.js package by default terminates the application by throwing an error.

## Database Commands

These commands use MongoDB as the database system. It requires a MongoDB token in the dotenv file mentioned above in the Local Development section.

### add-watchlist

If the user does not have an existing database document in the watchlist collection, then this command will add a document with the user's information, mentioned in src\schemas folder. Then it will add the item to the watchlist.<br />
Usage:

```
Command:
/add-watchlist AAPL

Discord Output:
A watchlist had been created and AAPL has been added to your watchlist.
The current price of AAPL is: $190.32
```

If the user already has an existing document in the watchlist collection, the command will just append the item to the document.<br />
Usage:

```
Command:
/add-watchlist TSLA

Discord Output:
TSLA has been added to your watchlist.
The current price of TSLA is: $240.52
```

The command will not add an item to the database if the stock does not exist and logs it in the console.
<br />
Usage:

```
Command:
/add-watchlist APPL

Discord Output:
APPL is not a valid stock name
```

This command does not allow you to have duplicates in your watchlist. For example:

```
Command:
/add-watchlist TSLA

Discord Output:
TSLA is already in your watchlist. Try using the /view-watchlist command to see your current watchlist
```

### view-watchlist

This command displays the currently saved watchlist for the userId in the database.
<br />
Usage:

```
Command:
/view-watchlist

Discord Output:
Kishan's Watchlist:
AAPL
TSLA
```

### remove-watchlist

This command will remove a specified item in your watchlist
<br />
Usage:

```
Command:
/remove-watchlist AAPL

Discord Output:
AAPL has been removed from your watchlist. Try using the /view-watchlist command to view your current watchlist.

Command:
/view-watchlist

Discord Output:
Kishan's Watchlist:
TSLA
```

### clear-watchlist

This command will reset your watchlist array in the database
<br />
Usage:

```
Command:
/clear-watchlist

Discord Output:
Your watchlist has been cleared.

Command:
/view-watchlist

Discord Output:
Your watchlist is empty or does not exist. Try using the /add-watchlist command
```

## References

Stocks.js docs [here](https://github.com/wagenaartje/stocks.js)
<br />
Live-stock-price docs [here](https://github.com/tpatel29/live-stock-price)
<br />
Discord.js docs [here](https://discord.js.org/)
<br />
Mongoose docs [here](https://mongoosejs.com/docs/guide.html)
<br />
Youtube tutorial to reference [here](https://youtu.be/6IgOXmQMT68?si=fTAhcGinI7Nxdptj)
