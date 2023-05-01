module.exports = {
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
        config.experiments.asyncWebAssembly = true
        return config
    }
}