window.NEXALPHA_CONFIG = Object.freeze({
    supabaseUrl: "https://YOUR_PROJECT_ID.supabase.co",
    supabaseAnonKey: "YOUR_SUPABASE_ANON_KEY",
    functionsBaseUrl: "https://YOUR_PROJECT_ID.supabase.co/functions/v1",
    billing: {
        amountInr: 500,
        interval: "month"
    },
    products: {
        optitrade: {
            name: "OptiTrade",
            appUrl: "https://optitrade-nexalpha.streamlit.app/"
        },
        bharatalpha: {
            name: "BharatAlpha",
            appUrl: "https://bharatalpha-nexalpha.streamlit.app/"
        }
    }
});
