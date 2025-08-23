export class HttpError extends Error {
  status: number;
  success: boolean;
  constructor(success: boolean, message: string, status: number) {
    super(message);
    this.success = success;
    this.message = message;
    this.status = status;
  }
}

export class DomainError extends Error {
  constructor(message: string, public errorCode: string, public statusCode: number) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ResourceAlreadyExists extends DomainError {
  constructor(message: string) {
    super(message, "RESOURCE_ALREADY_EXISTS", 409);
  }
}

export class ResourceNotFound extends DomainError {
  constructor(message: string) {
    super(message, "RESOURCE_NOT_FOUND", 404);
  }
}
