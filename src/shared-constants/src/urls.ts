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
    return API_STAGE;
  }

  if (__STAGE_TEST__) {
    return API_STAGE_TEST;
  }

  if (__TESTNET__) {
    return API_TESTNET;
  }

  return API_DEV;
}

function getSignalRBaseUrl() {
  if (__STAGE__) {
    return SIGNALR_STAGE;
  }

  if (__STAGE_TEST__) {
    return SIGNALR_STAGE_TEST;
  }

  if (__TESTNET__) {
    return SIGNALR_TESTNET;
  }

  return SIGNALR_DEV;
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

export { getBaseUrl, getSignalRBaseUrl, getCDNBaseUrl };
