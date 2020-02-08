import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { Injectable, Scope } from '@nestjs/common';

import AccessTokenStorage from './access-token-storage';
import {
  getAPIBaseURL,
  getClientSecret,
  getClientId,
} from './config';

interface TokenData {
  access_token: string;
  expires_at: string;
}

export function sendTokenRequestByCredentials(
  clientId: string,
  clientSecret: string,
) {
  return axios.post<TokenData>(getAPIBaseURL() + '/oauth/token', {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'client_credentials',
  });
}

@Injectable()
export default class APIService {
  private axios: AxiosInstance;

  constructor(
    private readonly accessTokenStorage: AccessTokenStorage,
  ) {
    this.axios = axios.create({ baseURL: getAPIBaseURL() });
  }

  configure(
    /** prefix of the REST endpoint, e.g. `/integrations/visit` */
    endpointURL: string,
  ) {
    this.axios = axios.create({
      baseURL: getAPIBaseURL() + endpointURL,
    });
  }

  async request<TData extends object = object>(
    config: AxiosRequestConfig,
  ): Promise<TData> {
    const token = await this.getToken();
    const response = await this.axios.request<TData>({
      ...config,
      headers: {
        ...config.headers,
        ['Authorization']: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  private async getToken(): Promise<string> {
    const [clientId, clientSecret] = [getClientId(), getClientSecret()];

    const token = this.accessTokenStorage.getToken(clientId);
    if (token) {
      return token;
    }

    let issueTokenResponse: { data: TokenData };
    issueTokenResponse = await sendTokenRequestByCredentials(
        clientId,
        clientSecret,
    );

    const { access_token, expires_at } = issueTokenResponse.data;
    this.accessTokenStorage.setToken(clientId, { access_token, expires_at });

    return access_token;
  }
}
