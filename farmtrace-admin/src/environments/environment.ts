// =============================================
// Environment — Production
// These values are used when the app is built
// for production (real backend connected)
// =============================================

export const environment = {
  production: true,

  // Real Spring Boot backend URL
  apiUrl: 'http://localhost:8080',

  // Set this to false when backend is ready
  useMockData: false
};