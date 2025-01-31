export const getStarkeyProvider = () => {
    // Check if StarKey is installed
    if (!window.starkey) {
        throw new Error('StarKey wallet is not installed');
    }

    // Get the Supra provider
    const provider = window.starkey;
    
    // Verify provider is properly initialized
    if (!provider) {
        throw new Error('StarKey provider not initialized');
    }

    return provider;
};