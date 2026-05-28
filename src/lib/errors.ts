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
  const rawCode = (error as any)?.code?.toString() || "";
  const code = rawCode.toLowerCase();

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
    message.includes("authentication failed") ||
    message.includes("password authentication failed") ||
    message.includes("failed to connect") ||
    message.includes("connection lost") ||
    message.includes("network error") ||
    message.includes("socket hang up") ||
    message.includes("socket closed") ||
    message.includes("reset by peer") ||
    message.includes("environment variable not found") ||
    message.includes("database_url")
  ) {
    return true;
  }

  // Timeout errors
  if (message.includes("timeout") || message.includes("timed out")) {
    return true;
  }

  // Prisma-specific connection errors
  if (
    message.includes("prismaclientinitializationerror") ||
    message.includes("error in prisma client") ||
    message.includes("invalid `prisma.") ||
    rawCode === "P1000" || // "Authentication failed against database server"
    rawCode === "P1001" || // "Can't reach database server"
    rawCode === "P1002" || // "The database server was reached but timed out"
    rawCode === "P1003" || // "Your database (at ...) does not exist"
    rawCode === "P1008" || // "Operations timed out after"
    rawCode === "P1009" || // "Database already exists"
    rawCode === "P1013" || // "The provided database string is invalid"
    rawCode === "P1014" || // "The underlying ... for model ... does not exist in the database"
    rawCode === "P1015" || // "Your Prisma schema is using features that are not supported"
    rawCode === "P1017" || // "Server has closed the connection"
    rawCode === "P2021" || // "The table does not exist in the current database"
    rawCode === "P2022" // "The column does not exist in the current database"
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
    if (isConnectionError(error)) {
      console.warn(`[Driven Group] ${log}`);
    } else {
      console.error(`[Driven Group] ${log}`);
    }
  }
}
