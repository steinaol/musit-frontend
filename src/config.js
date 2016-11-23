export default {
  isDev: process.env.NODE_ENV === 'development',
  isFake: false,
  useDevTools: process.env.DEV_TOOLS || false,
  magasin: {
    urls: {
      storagefacility: {
        searchUrl: (term, mid) =>
          `/api/storagefacility/v1/${mid.getPath()}/storagenodes/search?searchStr=${term}&`,
        baseUrl: (mid): string =>
          `/api/storagefacility/v1/${mid.getPath()}/storagenodes`
      },
      thingaggregate: {
        baseUrl: (mid): string =>
          `/api/thingaggregate/${mid.getPath()}`
      },
      actor: {
        searchUrl: (term, mid) =>
          `/api/actor/v1/person?${mid.getQuery()}&search=[${term}]`,
        baseUrl:
          '/api/actor/v1/person',
        currentUser:
          '/api/actor/v1/dataporten/currentUser'
      },
      geolocation: {
        searchUrl: (term) =>
          `/api/geolocation/v1/address?search=[${term}]`
      }
    }
  }
};
