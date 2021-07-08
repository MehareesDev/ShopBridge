import {Injectable} from '@angular/core';
import {HttpService} from '../../@core/http/http.service';
import {Observable, BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CommonservicesService {


  constructor(private httpService: HttpService) {
  }

  login(params) {
    return new Observable<any>(observer => {
      this.httpService
        .post(environment.BACK_END + 'login',
          params
        )
        .subscribe(res => {
          observer.next(res);
          observer.complete();
        });
    });
  }

  productUpdate(params) {
    let _this = this
    return new Observable<any>(observer => {
      this.httpService
        .post(environment.BACK_END + 'update_product',
          params
        )
        .subscribe(res => {
          observer.next(res);
          observer.complete();
        });
    });
  }


  getProduct(params) {
    let _this = this
    return new Observable<any>(observer => {
      this.httpService
        .post(environment.BACK_END + 'get_product',
          params
        )
        .subscribe(res => {
          observer.next(res);
          observer.complete();
        });
    });
  }

  getItem(params) {
    let _this = this
    return new Observable<any>(observer => {
      this.httpService
        .post(environment.BACK_END + 'get_item',
          params
        )
        .subscribe(res => {
          observer.next(res);
          observer.complete();
        });
    });
  }

  deleteProduct(params) {
    console.log("dsfvsedfdv")
    let _this = this
    return new Observable<any>(observer => {
      this.httpService
        .post(environment.BACK_END + 'delete_product',
          params
        )
        .subscribe(res => {
          observer.next(res);
          observer.complete();
        });
    });
  }



}


