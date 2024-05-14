import { AxiosError } from "axios";
import { get } from "lodash";

export function handleError(
  error: Error,
  filePath: string,
  functionName: string
): void {
  const errorPath: string = `Error: ${filePath} -> ${functionName} -> error: ${error}`;

  console.error(errorPath, JSON.stringify(error));
}

export function getAxiosErrorMessage(error: AxiosError): string {
  return get(error, "response.data.message", "Unknown error occurred!");
}
