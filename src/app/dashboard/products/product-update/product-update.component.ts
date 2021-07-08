import {Component, OnInit} from '@angular/core';
import {CommonservicesService} from '../../../../helper/commonservices/commonservices.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedroute: ActivatedRoute, private CS: CommonservicesService) {
  }

  imgBase64Path = null;
  submitted = false;
  productForm: FormGroup
  loading = false
  error = false
  id = this.activatedroute.snapshot.params.id;
  UploadedImage = null

  ngOnInit() {
    this.createForm();
    if (this.id) {
      this.getItem();
    }
  }

  getItem() {
    var params = {objectID: this.id}
    let _this = this
    this.CS.getItem(params).subscribe(response => {
      if (response.success) {
        _this.setForm(response.data)
      }
    })
  }

  createForm() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]]
    });
  }

  setForm(data) {
    this.productForm.get('name').setValue(data.name);
    this.productForm.get('description').setValue(data.description);
    this.productForm.get('price').setValue(data.price);
    this.UploadedImage = data.Image ? data.Image : null;
  }

  get form() {
    return this.productForm.controls;
  }

  fileChangeEvent(fileInput: any) {
    let _this = this
    if (fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          _this.imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  submit() {
    let _this = this;
    this.submitted = true;
    if (this.productForm.status == 'VALID') {
      let params = this.productForm.value
      params['Image'] = _this.imgBase64Path
      if (_this.id) {
        params['objectID'] = _this.id;
      }
      if (_this.UploadedImage) {
        params['UploadedImage'] = _this.UploadedImage;
      }
      _this.loading = true
      _this.CS.productUpdate(params).subscribe(response => {
        _this.loading = false
        if (response.success) {
          _this.loading = false
          _this.router.navigate(['/dashboard']);
        } else {
          _this.error = true;
        }
      });
    }
  }
}
