export const config = {
  dateFormat: 'DD/MM/YYYY',
  apiUrl: process.env.REACT_APP_API_URL ?? `http://${window.location.hostname}/api`
};
