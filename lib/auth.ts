/**
 * Authentication utilities for BigSkyEats integration
 * Handles JWT token validation and user authentication with BigSkyEatsServer
 */

export interface BigSkyEatsUser {
  id: string;
  email: string;
  customer_type: 'tourist' | 'non_subscribed_local' | 'insider' | 'elite' | 'platinum' | 'royalist';
  role: 'customer' | 'restaurant_owner' | 'partner' | 'admin';
  is_local: boolean;
  has_active_subscription: boolean;
}

export interface AuthResponse {
  success: boolean;
  user?: BigSkyEatsUser;
  token?: string;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
  customer_type?: 'tourist' | 'non_subscribed_local';
}

/**
 * Login user with BigSkyEatsServer
 */
export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const serverUrl = process.env.NEXT_PUBLIC_BIGSKYEATS_SERVER_URL || 'http://localhost:3000';
    const response = await fetch(`${serverUrl}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Login failed',
      };
    }

    return {
      success: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * Register new user with BigSkyEatsServer
 */
export async function registerUser(userData: RegisterData): Promise<AuthResponse> {
  try {
    const serverUrl = process.env.NEXT_PUBLIC_BIGSKYEATS_SERVER_URL || 'http://localhost:3000';
    const response = await fetch(`${serverUrl}/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Registration failed',
      };
    }

    return {
      success: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * Validate JWT token with BigSkyEatsServer
 */
export async function validateToken(token: string): Promise<AuthResponse> {
  try {
    const serverUrl = process.env.NEXT_PUBLIC_BIGSKYEATS_SERVER_URL || 'http://localhost:3000';
    const response = await fetch(`${serverUrl}/api/v1/auth/validate`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Token validation failed',
      };
    }

    return {
      success: true,
      user: data.user,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * Check if user is eligible to vote (local customer only)
 */
export function canUserVote(user: BigSkyEatsUser): boolean {
  return user.is_local && user.customer_type !== 'tourist';
}

/**
 * Get user display name for customer type
 */
export function getUserTypeDisplay(customerType: string): string {
  const typeMap: Record<string, string> = {
    tourist: 'Tourist',
    non_subscribed_local: 'Local Customer',
    insider: 'Insider',
    elite: 'Elite Member',
    platinum: 'Platinum Member',
    royalist: 'Royalist Member',
  };
  
  return typeMap[customerType] || customerType;
}

/**
 * Store authentication token in localStorage
 */
export function storeAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('bigskyeats_token', token);
  }
}

/**
 * Get authentication token from localStorage
 */
export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('bigskyeats_token');
  }
  return null;
}

/**
 * Remove authentication token from localStorage
 */
export function removeAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('bigskyeats_token');
  }
}