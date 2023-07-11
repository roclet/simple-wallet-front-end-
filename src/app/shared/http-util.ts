import {HttpHeaders} from "@angular/common/http";

export class HttpUtil {

  private static getAuthorizationHeader() {
    let headers: HttpHeaders = new HttpHeaders();
    //headers = headers.append('x-Flatten', 'true');
    headers = headers.append('Content-Type', 'application/json');
    return headers;
  }

  public static headers(): HttpHeaders {
    let headers = this.getAuthorizationHeader();
    headers = headers.append('x-Flatten', 'true');
    headers = headers.append('Content-Type', 'application/json');
    return headers;
  }

  public static unHeaders(): HttpHeaders {
    return this.getAuthorizationHeader();
  }
}
