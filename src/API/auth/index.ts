import { AxiosResponse } from "axios";
import { AUTH_BASE_URL } from "./constants";
import api from "..";
import { ILoginForm } from "../../components/LoginForm/interfaces";
import { handleError } from "../error";

export async function login(
  payload: Omit<ILoginForm, "isRememberMe">
): Promise<string> {
  try {
    const response: AxiosResponse = await api.post(
      `${AUTH_BASE_URL}/login`,
      payload
    );
    return response.data;
  } catch (error) {
    handleError(error as Error, "API/auth", "login");
    throw error;
  }
}
