/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Shared types for Users API
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CreateUserBody {
  name: string;
  email: string;
}
