import { cookieStorage } from "./cookieStore";

class URLManager {
  private static domainName: string;

  static setDomainName(domainName: string) {
    URLManager.domainName = domainName;
  }

  private static get API_DEV() {
    return `http://dev.${URLManager.domainName}.com/hapi/`;
  }
  private static get API_STAGE() {
    return `http://stage.${URLManager.domainName}.com/hapi/`;
  }
  private static get API_STAGE_TEST() {
    return `http://test.${URLManager.domainName}.com/hapi/`;
  }
  private static get API_TESTNET() {
    return `https://testnet.${URLManager.domainName}.com/hapi/`;
  }
  private static get API_PRODUCTION() {
    return `https://${URLManager.domainName}.com/hapi/`;
  }

  private static get CDN_DEV() {
    return `http://cdn.dev.${URLManager.domainName}.com`;
  }
  private static get CDN_STAGE() {
    return `http://cdn.stage.${URLManager.domainName}.com`;
  }
  private static get CDN_STAGE_TEST() {
    return `http://cdn.stage.${URLManager.domainName}.com`;
  }
  private static get CDN_TESTNET() {
    return `http://cdn.testnet.${URLManager.domainName}.com`;
  }
  private static get CDN_PRODUCTION() {
    return `http://cdn.${URLManager.domainName}.com`;
  }

  private static get SIGNALR_DEV() {
    return `http://stream.dev.${URLManager.domainName}.com/stream`;
  }
  private static get SIGNALR_STAGE() {
    return `http://stream.stage.${URLManager.domainName}.com/stream`;
  }
  private static get SIGNALR_STAGE_TEST() {
    return `http://stream.test.${URLManager.domainName}.com/stream`;
  }
  private static get SIGNALR_TESTNET() {
    return `https://stream.testnet.${URLManager.domainName}.com/stream`;
  }
  private static get SIGNALR_PRODUCTION() {
    return `https://stream.${URLManager.domainName}.com/stream`;
  }

  static get baseUrl() {
    URLManager.checkDomainName();

    if (!__PRODUCTION__ && !__TESTNET__) {
      const hapi =
        __PLATFORM__ === "web" && cookieStorage.getItem("hapiAddress");

      if (hapi) {
        return hapi;
      }
    }
    if (__STAGE__) {
      return URLManager.API_STAGE;
    }

    if (__STAGE_TEST__) {
      return URLManager.API_STAGE_TEST;
    }

    if (__TESTNET__) {
      return URLManager.API_TESTNET;
    }
    if (__PRODUCTION__) {
      return URLManager.API_PRODUCTION;
    }

    return URLManager.API_DEV;
  }

  static get signalRBaseUrl() {
    URLManager.checkDomainName();

    if (!__PRODUCTION__ && !__TESTNET__) {
      const hapi =
        __PLATFORM__ === "web" && cookieStorage.getItem("streamAddress");

      if (hapi) {
        return hapi;
      }
    }

    if (__STAGE__) {
      return URLManager.SIGNALR_STAGE;
    }
    if (__STAGE_TEST__) {
      return URLManager.SIGNALR_STAGE_TEST;
    }
    if (__TESTNET__) {
      return URLManager.SIGNALR_TESTNET;
    }
    if (__PRODUCTION__) {
      return URLManager.SIGNALR_PRODUCTION;
    }

    return URLManager.SIGNALR_DEV;
  }

  static get CDNBaseUrl() {
    URLManager.checkDomainName();

    if (__STAGE__) {
      return URLManager.CDN_STAGE;
    }
    if (__STAGE_TEST__) {
      return URLManager.CDN_STAGE_TEST;
    }
    if (__TESTNET__) {
      return URLManager.CDN_TESTNET;
    }
    if (__PRODUCTION__) {
      return URLManager.CDN_PRODUCTION;
    }

    return URLManager.CDN_DEV;
  }

  private static checkDomainName() {
    if (!URLManager.domainName) {
      throw new Error(
        `hitobit-cliient: domainName is not initialized run 'URLManager.setDomainName' in top level of your app`,
      );
    }
  }
}

if (__MOCK__) {
  URLManager.setDomainName("mock");
}

export { URLManager };
