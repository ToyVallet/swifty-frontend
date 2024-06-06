// Define possible API statuses
type APIStatus =
  | 'FORBIDDEN'
  | 'UNAUTHORIZED'
  | 'INTERNAL_SERVER_ERROR'
  | 'BAD_REQUEST'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'GONE'
  | 'TOO_MANY_REQUESTS'
  | 'SERVICE_UNAVAILABLE'
  | 'GATEWAY_TIMEOUT';

// Define possible API status codes
type APIStatusCode = 400 | 401 | 403 | 404 | 409 | 410 | 429 | 500 | 503 | 504;

// Define the structure of an error
interface IError extends Error {
  readonly name: string;
  readonly timestamp: Date;
  readonly trackingId: string;
  readonly statusCode: APIStatusCode;
  readonly status: APIStatus;
  readonly code: string;
  readonly message: string;
}

/**
 * @name APIError
 * @description
 * APIError 클래스
 * API 서버에서 발생한 에러를 처리하기 위한 클래스
 * @example
 * if (APIError.isAPIError(error)) {
 *  const apiError = new APIError(error);
 *  console.log(apiError.message);
 * }
 */
export default class APIError {
  public readonly name: string;
  public readonly timestamp: Date;
  public readonly trackingId: string;
  public readonly statusCode: APIStatusCode;
  public readonly status: APIStatus;
  public readonly code: string;
  public readonly message: string;

  constructor({
    name,
    timestamp,
    trackingId,
    statusCode,
    status,
    code,
    message,
  }: IError) {
    this.name = name;
    this.timestamp = new Date(timestamp);
    this.trackingId = trackingId;
    this.statusCode = statusCode;
    this.status = status;
    this.code = code;
    this.message = message;
  }

  // error가 APIError인지 확인하는 메서드
  static isAPIError(error: unknown): error is APIError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'trackingId' in error &&
      'statusCode' in error
    );
  }
}
