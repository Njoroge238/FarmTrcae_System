// =============================================
// Environment — Development
// These values are used during development
// (ng serve). Mock data is enabled here so
// we can build without the backend running.
// =============================================

export const environment = {
  production: false,

  // Spring Boot backend URL — not running yet
  apiUrl: 'http://localhost:8080',

  // Set this to false when backend is ready
  // and you want to use real API calls
  useMockData: true
};