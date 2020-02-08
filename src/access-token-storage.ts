import { Injectable } from '@nestjs/common';

export interface TokenData {
  access_token: string;
  expires_at: string;
}

@Injectable()
export default class AccessTokenStorage {
  private readonly tokenMap = new Map<string, TokenData>();

  getToken(client_id: string): string | undefined {
    const tokenData = this.tokenMap.get(client_id);
    if (!tokenData) {
      return;
    }
    if (new Date(tokenData.expires_at) < new Date()) {
      this.tokenMap.delete(client_id);
      return;
    }
    return tokenData.access_token;
  }

  setToken(clientId: string, tokenData: TokenData): void {
    this.tokenMap.set(clientId, tokenData);
  }
}
