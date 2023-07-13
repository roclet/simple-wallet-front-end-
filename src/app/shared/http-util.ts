import { HttpHeaders } from '@angular/common/http';

export class HttpUtil {
  private static getAuthorizationHeader() {
    let headers: HttpHeaders = new HttpHeaders();
    // headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('Content-Type', 'application/json');
    return headers;
  }

  public static headers(): HttpHeaders {
    let headers = this.getAuthorizationHeader();
    headers.append('Access-Control-Allow-Origin', '*');
    // headers = headers.append('x-Flatten', 'true');
    headers = headers.append('Content-Type', 'application/json');
    return headers;
  }

  public static unHeaders(): HttpHeaders {
    return this.getAuthorizationHeader();
  }
  public static testHeader() {
    let auth_token = 'asasa21212....';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    });

    const requestOptions = { headers: headers };
  }

  public static randomString(length: number) {
    var randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }
}
