import request from "../utils/request";

export async function dataRequest(params) {
  console.log(params);
  return request("/api/user", { data: params, method: "post" });
}
