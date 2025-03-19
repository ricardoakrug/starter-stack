import { NextResponse } from "next/server";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function handleError(error: unknown) {
  console.error("[ERROR]", error);

  if (error instanceof AppError) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode });
  }

  // Handle Zod validation errors
  if (error instanceof Error && error.name === "ZodError") {
    return NextResponse.json(
      { error: "Validation failed", details: error.message },
      { status: 400 }
    );
  }

  // Handle database errors
  if (error instanceof Error && error.message.includes("database")) {
    return NextResponse.json({ error: "Database operation failed" }, { status: 500 });
  }

  // Handle authentication errors
  if (error instanceof Error && error.message.includes("auth")) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
  }

  // Default error response
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}

export function logError(error: unknown, context: string) {
  const timestamp = new Date().toISOString();
  const errorMessage = error instanceof Error ? error.message : String(error);
  const stackTrace = error instanceof Error ? error.stack : undefined;

  console.error(`[${timestamp}] ${context}:`, {
    error: errorMessage,
    stack: stackTrace,
  });

  // In a production environment, you would want to send this to a logging service
  // like Sentry, LogRocket, or similar
}
