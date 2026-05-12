/**
 * Error classification and handling utilities.
 * Distinguishes between errors that should use fallback data vs. those that should propagate.
 */

export class DatabaseError extends Error {
  constructor(
    message: string,
    public isConnectionError: boolean = false,
    public originalError?: Error
  ) {
    super(message);
    this.name = "DatabaseError";
  }
}

/**
 * Determine if an error is a connection/availability error that warrants fallback data.
 * These errors should gracefully degrade to fallback data.
 * Other errors (validation, constraint violations) should propagate normally.
 */
export function isConnectionError(error: unknown): boolean {
  const message = String(error).toLowerCase();
  const code = (error as any)?.code?.toString().toLowerCase() || "";

  // Connection pool errors
  if (
    message.includes("cannot reach database") ||
    message.includes("ECONNREFUSED") ||
    message.includes("ENOTFOUND") ||
    message.includes("ETIMEDOUT") ||
    message.includes("connection refused") ||
    message.includes("connect econnrefused") ||
    message.includes("client must connect first") ||
    message.includes("connection timeout") ||
    code === "ECONNREFUSED" ||
    code === "ENOTFOUND" ||
    code === "ETIMEDOUT"
  ) {
    return true;
  }

  // Neon-specific
  if (
    message.includes("suspended") ||
    message.includes("compute endpoint") ||
    message.includes("neon") ||
    message.includes("pooler")
  ) {
    return true;
  }

  // Generic connection errors
  if (
    message.includes("failed to connect") ||
    message.includes("connection lost") ||
    message.includes("network error") ||
    message.includes("socket hang up") ||
    message.includes("socket closed") ||
    message.includes("reset by peer")
  ) {
    return true;
  }

  // Timeout errors
  if (message.includes("timeout") || message.includes("timed out")) {
    return true;
  }

  // Prisma-specific connection errors
  if (
    code === "P1000" || // "Authentication failed against database server"
    code === "P1001" || // "Can't reach database server"
    code === "P1002" || // "The database server was reached but timed out"
    code === "P1003" || // "Your database (at ...) does not exist"
    code === "P1008" || // "Operations timed out after"
    code === "P1009" || // "Database already exists"
    code === "P1013" || // "The provided database string is invalid"
    code === "P1014" || // "The underlying ... for model ... does not exist in the database"
    code === "P1015" || // "Your Prisma schema is using features that are not supported"
    code === "P1017" // "Server has closed the connection"
  ) {
    return true;
  }

  return false;
}

/**
 * Create a safe error message for server-side logging.
 * Includes enough context for debugging without exposing sensitive details.
 */
export function createErrorLog(
  context: string,
  error: unknown,
  additionalInfo?: Record<string, unknown>
): string {
  const timestamp = new Date().toISOString();
  const message = error instanceof Error ? error.message : String(error);
  const isConn = isConnectionError(error);
  const errorType = isConn ? "CONNECTION_ERROR" : "DATABASE_ERROR";

  return `[${timestamp}] ${errorType} in ${context}: ${message}${
    additionalInfo ? ` | ${JSON.stringify(additionalInfo)}` : ""
  }`;
}

/**
 * Safe logging to console in development, silent in production.
 * Never exposes Prisma stack traces or sensitive details to client.
 */
export function logError(
  context: string,
  error: unknown,
  additionalInfo?: Record<string, unknown>
): void {
  if (process.env.NODE_ENV === "development") {
    const log = createErrorLog(context, error, additionalInfo);
    console.error(`[Driven Group] ${log}`);
  }
}
