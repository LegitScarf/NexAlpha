window.NEXALPHA_CONFIG = Object.freeze({
    supabaseUrl: "https://YOUR_PROJECT_ID.supabase.co",
    supabaseAnonKey: "YOUR_SUPABASE_ANON_KEY",
    // Optional: leave blank to derive from supabaseUrl automatically.
    functionsBaseUrl: "",
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
