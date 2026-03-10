import axios from "axios";

export const httpClient = axios.create({
  withCredentials: true,
});

export const createScopedClient = (baseURL: string) =>
  axios.create({
    baseURL,
    withCredentials: true,
  });
