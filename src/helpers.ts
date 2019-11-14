import { ApolloError } from "apollo-server-lambda";
import fetch from "node-fetch";

export const parseToFloat = (str: string): number =>
  parseFloat(str.replace(`,`, `.`));

export const convertDateToISO = (date: string): string =>
  new Date(date).toISOString();

const isHTTPError = (status: number) => {
  return !(status >= 200 && status < 300);
};

export const getData = async (url: string) => {
  try {
    const res = await fetch(url);
    const json = await res.json();
    if (isHTTPError(res.status)) {
      throw new ApolloError(json, "http-status-error", {
        statusCode: res.status,
        error: json
      });
    }
    console.log(json);
    return json;
  } catch (error) {
    console.log(JSON.stringify(error));
    throw error;
  }
};

export const postData = async (url: string, body: any) => {
  try {
    const res = await fetch(url, {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    });
    const json = await res.json();
    if (isHTTPError(res.status)) {
      throw new ApolloError(json, "http-status-error", {
        statusCode: res.status,
        error: json
      });
    }
    console.log(json);
    return json;
  } catch (error) {
    console.log(JSON.stringify(error));
    throw error;
  }
};
