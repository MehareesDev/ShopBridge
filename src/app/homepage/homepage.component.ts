import {Component, OnInit} from '@angular/core';
import {CommonservicesService} from '../../helper/commonservices/commonservices.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private CS: CommonservicesService) {
  }

  ngOnInit(): void {
    this.getData()
  }

  products = []
  login = localStorage.getItem('user_data') ? true : false
  loading = false;
  page = 0;
  limit = 3;
  total = 0;

  getData() {
    let _this = this
    this.loading = true;
    this.CS.getProduct({page: this.page}).subscribe(response => {
      if (response.success) {
        _this.total = response.data.nbHits
        _this.products = response.data && response.data.hits.length ? [..._this.products, ...response.data.hits] : _this.products;
      }
      _this.loading = false;
    });
  }

  logout() {
    localStorage.clear();
    this.login = false
  }

  loadmore() {
    ++this.page;
    this.getData()
  }
}
