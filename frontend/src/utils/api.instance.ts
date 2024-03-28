import axios, { AxiosError } from "axios";

type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function makeAPIRequst(
  url: string,
  method: ApiMethod = "GET",
  body: any = {},
  params: any = {},
  isTokenIncluded: boolean = true
): Promise<any> {
  let headers: {
    Authorization?: string;
  } = {};

  if (isTokenIncluded) {
    headers.Authorization = `Bearer ${localStorage.getItem("token") ?? ""}`;
  }

  try {
    const response = await axios({
      url: `${process.env.REACT_APP_SERVER_API}/api/${url}`,
      method: method,
      data: body,
      headers: headers,
      params: params
    });
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      const reasonCode: string = error.response?.data.reason;
      if (reasonCode === "UNAUTHORIZED") {
        localStorage.removeItem("token");
      }
    }

    throw error;
  }
}
