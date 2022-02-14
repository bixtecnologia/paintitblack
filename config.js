configs = {

    environment: 'DEV', // Global switch between DEV and PRD environments. Use
    // this in conjunction with: if (config.environment === "XXX"){doStuffHere}
    // Useful when you wanna separate external API keys from DEV and PRD, or
    // to automatically search for Qlik app NAMES in DEV, and IDS in PRD
    // (see QlikConnection.js)

    devQvfNames: {
        ConsumerSales: 'Consumer Sales.qvf',
        InsuranceClaims: 'Insurance Claims 2021.qvf'
    },

    prdQvfNames: {
        ConsumerSales: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        InsuranceClaims: 'yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy'
    },

    darkTheme: {
        backgroundColor: '#121212'
    },

    Dashboard1: {
        EURUSD_repeat_delay: 30, // Delay in seconds between each API call
        EURUSD_upchange_color: '#007F0E',
        EURUSD_downchange_color: '#AD0000',
    },

}
