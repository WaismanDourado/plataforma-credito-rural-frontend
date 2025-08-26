interface TokenResponse {
  access_token: string;
  token_type: string;
}

interface UserResponse {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
}

interface PredictionResult {
  predicted_approval: number;
  probability: number;
}

interface ApiResponse {
  message?: string;
  token?: string;
  result?: PredictionResult;
  detail?: string;
  error?: string;
}