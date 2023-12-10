const { SlashCommandBuilder, InteractionResponse } = require('discord.js');

const indicators = [
    'SMA',
    'EMA',
    'WMA',
    'DEMA',
    'TEMA',
    'TRIMA',
    'KAMA',
    'MAMA',
    'VWAP',
    'T3',
    'MACD',
    'MACDEXT',
    'STOCH',
    'STOCHF',
    'RSI',
    'STOCHRSI',
    'WILLR',
    'ADX',
    'ADXR',
    'APO',
    'PPO',
    'MOM',
    'BOP',
    'CCI',
    'CMO',
    'ROC',
    'ROCR',
    'AROON',
    'AROONOSC',
    'MFI',
    'TRIX',
    'ULTOSC',
    'DX',
    'MINUS_DI',
    'PLUS_DI',
    'MINUS_DM',
    'PLUS_DM',
    'BBANDS',
    'MIDPOINT',
    'MIDPRICE',
    'SAR',
    'TRANGE',
    'ATR',
    'NATR',
    'AD',
    'ADOSC',
    'OBV',
    'HT_TRENDLINE',
    'HT_SINE',
    'HT_TRENDMODE',
    'HT_DCPERIOD',
    'HT_DCPHASE',
    'HT_PHASOR',
]; // list of possible indicators

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-technical-indicator')
        .setDescription("Retrives a technical indicator's data!")
        .addStringOption((option) =>
            option
                .setName('stock-name')
                .setRequired(true)
                .setDescription('What is the stock name?')
        )
        .addStringOption((option) =>
            option
                .setName('interval')
                .setRequired(true)
                .setDescription(
                    'What intervals lengths should the data be retrieved from?'
                )
                .setAutocomplete(true)
        )
        .addStringOption((option) =>
            option
                .setName('indicator')
                .setRequired(true)
                .setDescription(
                    'What is the name of the indicator you want to use?'
                )
        )
        .addIntegerOption((option) =>
            option
                .setName('amount')
                .setRequired(true)
                .setDescription(
                    'How many values in those intervals of time do you want?'
                )
                .setMinValue(1)
        )
        .addIntegerOption((option) =>
            option
                .setName('time-period')
                .setDescription(
                    'the time period to calculate certain indicators from'
                )
                .setRequired(true)
                .setMinValue(1)
        ),

    async autocomplete(interaction, client) {
        const focusedValue = interaction.options.getFocused();
        const choices = [
            '1min',
            '5min',
            '15min',
            '30min',
            '60min',
            'daily',
            'weekly',
            'monthly',
        ];

        const filtered = choices.filter((choice) =>
            choice.startsWith(focusedValue)
        );
        await interaction.respond(
            filtered.map((choice) => ({ name: choice, value: choice }))
        );
    }, // autocomplete's the interval option

    async execute(interaction, client) {
        const interval = interaction.options.getString('interval');
        const indicator = interaction.options.getString('indicator');
        const stock_name = interaction.options.getString('stock-name');
        const amount = interaction.options.getInteger('amount');
        const time_period = interaction.options.getInteger('time-period');

        const { stocks } = client;

        if (!indicators.includes(indicator)) {
            await interaction.reply({
                content: `${indicator} is not a valid indicator. try using the **/get-indicator2** command to see the list of valid indicators`,
                ephemeral: true,
            });
            return;
        } // checks for valid indicator

        try {
            const result = await stocks.technicalIndicator({
                symbol: stock_name,
                interval: interval,
                amount: amount,
                time_period: time_period,
                indicator: indicator,
            });

            let parseString = `Information on ${stock_name} with indicator '${indicator}':\n`;
            result.map((data) => {
                const { date } = data;
                const indicator_data = data[`${indicator}`];
                parseString += `On ${date}, the indicator(${indicator}) value was: ${indicator_data.toFixed(
                    3
                )}\n`;
            });

            await interaction.reply({
                content: parseString,
            });
        } catch (err) {
            await interaction.reply({
                content: 'Invalid stock name!',
                ephemeral: true,
            });
            console.log(err);
        }
    },
};
