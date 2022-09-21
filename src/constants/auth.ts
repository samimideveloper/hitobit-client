import { Buffer } from "buffer";

export const AUTHORIZATION = `Basic ${Buffer.from(
  __CLIENT_ID__ + ":" + __CLIENT_SECRET__,
).toString("base64")}`;
