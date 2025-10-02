import { HttpInterceptorFn, HttpHeaders } from '@angular/common/http';


const getAuthToken = (): string | null => {

  return localStorage.getItem('jwt_token');
};


export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getAuthToken();

  const publicUrls = ['api/login_check', 'api/register'];
  const isPublicUrl = publicUrls.some(url => req.url.includes(url));

  if (isPublicUrl) {
    return next(req);
  }

  if (token) {
    const authReq = req.clone({
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
    return next(authReq);
  }

  return next(req);
};