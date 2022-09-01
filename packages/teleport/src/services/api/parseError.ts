export default function parseError(json) {
  return json?.error?.message || json?.message || json?.responseText;
}

export class ApiError extends Error {
  response: object;
  constructor(message = 'Unknown error', response: object) {
    super(message);
    this.response = response;
    this.name = 'ApiError';
  }
}
