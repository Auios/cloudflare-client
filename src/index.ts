const apiUrl = "https://api.cloudflare.com";

export namespace Cloudflare {
  export namespace Domains {
    export interface ErrorSource {
      pointer: string;
    }

    export interface ResponseInfo {
      code: number;
      message: string;
      documentation_url: string;
      source: ErrorSource;
    }

    export interface Response<T = Record<string, unknown>> {
      errors: ResponseInfo[];
      messages: ResponseInfo[];
      result: T;
      success: boolean;
    }
  }
}

export class CloudflareClient {
  private apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getDomain(domain: string): Promise<Cloudflare.Domains.Response> {
    const response = await fetch(`${apiUrl}/client/v4/accounts/023e105f4ecef8ad9ca31a8372d0c353/registrar/domains/${domain}`, {
      headers: {
        "Authorization": `Bearer ${this.apiKey}`
      }
    });

    return response.json() as Promise<Cloudflare.Domains.Response<{
      id: string;
      name: string;
      status: string;
      created_on: string;
      modified_on: string;
    }>>;
  }
}