import ky from "ky";

export const serverApi = ky.extend({
  prefixUrl: "http://localhost:8080/api/v1",
  headers: {}
});
