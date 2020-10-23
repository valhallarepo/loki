export const environment = {
  production: true,
  backends: {
    primary: {
      baseUrl: 'https://api.themoviedb.org/3',
      apiKey: ''
    },
    secondary: {
      baseUrl: '',
      apiKey: ''
    },
    tertiary: {
      baseUrl: '',
      apiKey: ''
    }
    // ...
  }
};
