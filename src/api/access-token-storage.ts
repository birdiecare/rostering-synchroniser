import { Injectable } from '@nestjs/common';

export interface TokenData {
  access_token: string;
  expires_at: string;
}

@Injectable()
export default class AccessTokenStorage {
  private readonly tokenMap = new Map<string, TokenData>();

  getToken(clientId: string): string | undefined {
    const tokenData = this.tokenMap.get(clientId);
    if (!tokenData) {
      return;
    }
    if (new Date(tokenData.expires_at) < new Date()) {
      this.tokenMap.delete(clientId);
      return;
    }
    return tokenData.access_token;
  }

  setToken(clientId: string, tokenData: TokenData): void {
    this.tokenMap.set(clientId, tokenData);
  }
}
