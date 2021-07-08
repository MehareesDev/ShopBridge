import { Component, OnInit } from '@angular/core';
import {CommonservicesService} from '../../helper/commonservices/commonservices.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private activatedroute: ActivatedRoute, private CS: CommonservicesService) {
  }

  ngOnInit(): void {
    this.getData()
  }

  products = []
  page = 0;
  limit = 3;
  total = 0;
  loading = false

  getData(){
    this.loading = true;
    let _this = this
    this.CS.getProduct({}).subscribe(response => {
      if (response.success) {
        _this.total = response.data.nbHits
        _this.products = response.data && response.data.hits.length ? [..._this.products, ...response.data.hits] : _this.products;
      }
      _this.loading = false;
    });
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/']);
  }

  deleteProduct(item){
    let _this = this
    this.CS.deleteProduct(item).subscribe(response => {
      if(response.success){
        _this.products = _this.products.filter(function(elem) {
          return elem.objectID !== item.objectID;
        })
      }
    });
  }

  loadmore() {
    ++this.page;
    this.getData()
  }

}
