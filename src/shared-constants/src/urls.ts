import { cookieStorage } from "shared-modules";

export const TRADE_BASE_URLS = "http://api.binance.com";

const API_DEV = "http://dev.hitobit.com/hapi/";
const API_STAGE = "http://stage.hitobit.com/hapi/";
const API_STAGE_TEST = "http://test.hitobit.com/hapi/";
const API_TESTNET = "https://testnet.hitobit.com/hapi/";
const API_PRODUCTION = "http://api.septapay.com/hapi/";

const CDN_DEV = "http://cdn.dev.hitobit.com";
const CDN_STAGE = "http://cdn.stage.hitobit.com";
const CDN_STAGE_TEST = "http://cdn.stage.hitobit.com";
const CDN_TESTNET = "http://cdn.testnet.hitobit.com";

const SIGNALR_DEV = "http://stream.dev.hitobit.com/stream";
const SIGNALR_STAGE = "http://stream.stage.hitobit.com/stream";
const SIGNALR_STAGE_TEST = "http://stream.test.hitobit.com/stream";
const SIGNALR_TESTNET = "https://stream.testnet.hitobit.com/stream";
const SIGNALR_PRODUCTION = "https://msg.septapay.com/hub";

function getBaseUrl() {
  if (__STAGE__) {
    const hapi = __PLATFORM__ === "web" && cookieStorage.getItem("hapiAddress");

    return hapi || API_STAGE;
  }

  if (__STAGE_TEST__) {
    const hapi = __PLATFORM__ === "web" && cookieStorage.getItem("hapiAddress");

    return hapi || API_STAGE_TEST;
  }

  if (__TESTNET__) {
    return API_TESTNET;
  }

  const hapi = __PLATFORM__ === "web" && cookieStorage.getItem("hapiAddress");

  return hapi || API_DEV;
}

function getMobileBaseUrl() {
  if (__PLATFORM__ === "pwa") {
    return window.location.origin;
  }
  if (__STAGE__) {
    return "http://m.stage.hitobit.com";
  }

  if (__DEV__) {
    return "http://m.dev.hitobit.com";
  }

  if (__TESTNET__) {
    return "http://m.testnet.hitobit.com";
  }

  const defaultUrl = "http://m.hitobit.com";

  return defaultUrl;
}

function getSignalRBaseUrl() {
  if (__STAGE__) {
    const stream =
      __PLATFORM__ === "web" && cookieStorage.getItem("streamAddress");

    return stream || SIGNALR_STAGE;
  }

  if (__STAGE_TEST__) {
    const stream =
      __PLATFORM__ === "web" && cookieStorage.getItem("streamAddress");

    return stream || SIGNALR_STAGE_TEST;
  }

  if (__TESTNET__) {
    return SIGNALR_TESTNET;
  }

  const stream =
    __PLATFORM__ === "web" && cookieStorage.getItem("streamAddress");

  return stream || SIGNALR_DEV;
}

function getCDNBaseUrl() {
  if (__STAGE__) {
    return CDN_STAGE;
  }

  if (__STAGE_TEST__) {
    return CDN_STAGE_TEST;
  }

  if (__TESTNET__) {
    return CDN_TESTNET;
  }

  return CDN_DEV;
}

export { getBaseUrl, getSignalRBaseUrl, getCDNBaseUrl, getMobileBaseUrl };
