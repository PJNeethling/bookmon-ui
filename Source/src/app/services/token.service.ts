import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { TokenResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private userService: UserService) { }

  saveSession(tokenResponse: TokenResponse) {
    console.log(tokenResponse);
    const now = new Date();
    const expiryTime = now.getTime() + tokenResponse.expiresIn * 1000; 
    window.localStorage.setItem('AT', tokenResponse.accessToken);
    window.localStorage.setItem('RT', tokenResponse.refreshToken);
    window.localStorage.setItem('EI', expiryTime.toString());
    window.localStorage.setItem('TT', tokenResponse.tokenType);

  }

  getSession(): TokenResponse | null {
    if (typeof window !== 'undefined' && window.localStorage.getItem('AT')) {

      const now = new Date();
      const expiryTime = parseInt(window.localStorage.getItem('EI') || '0', 10);

      if (now.getTime() < expiryTime) {
        const tokenResponse: TokenResponse = {
          accessToken: window.localStorage.getItem('AT') || '',
          refreshToken: window.localStorage.getItem('RT') || '',
          expiresIn: expiryTime - now.getTime(),
          tokenType: window.localStorage.getItem('TT') || ''
        };
        return tokenResponse;
      } else {
        return null;
      }
    }
    return null;
  }

  logout() {
    window.localStorage.clear();
  }

  isLoggedIn(): boolean {
    let session = this.getSession();
    
    if (!session) {
      return false;
    }

    // IF we use JWT Token - Check if token is expired
    // Bookmon API is not using jwt tokens, its just a bearer token
    // const jwtToken = JSON.parse(atob(session.accessToken.split('.')[1]));
    // const tokenExpired = Date.now() > (jwtToken.exp * 1000);

    // return !tokenExpired;
    return true;
  }
}
