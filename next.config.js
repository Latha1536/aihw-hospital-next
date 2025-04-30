module.exports = {
  // Required for API routes to work properly
  output: 'standalone', // or 'export' for static sites
  // Enable if using MongoDB in API routes
  experimental: {
    serverComponentsExternalPackages: ['mongodb']
  }
};