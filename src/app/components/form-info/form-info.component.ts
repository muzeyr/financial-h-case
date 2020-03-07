import { Component, OnInit, Input } from '@angular/core';
import { CustomerInfo } from 'src/app/models/general/customer-info';
import {AppFormInfo} from 'src/app/models/general/form-info';
@Component({
  selector: 'app-form-info',
  templateUrl: './form-info.component.html',
  styleUrls: ['./form-info.component.scss']
})
export class FormInfoComponent implements OnInit {

  @Input() field: string[];
  @Input() title: string;
  @Input() info: any;
  public lbl: string[];
  public formInfos: AppFormInfo[];


  constructor() {
    this.formInfos = [];
  }

  ngOnInit(): void {
    let _controller = this;
    if(this.info){
      console.log(this.info);
      this.lbl = Object.keys(this.info);
      this.lbl.forEach(label => {
        let formInfo = new AppFormInfo();
        formInfo.label = label;
        formInfo.fieldName = label;
        formInfo.val =  this.info[label];

        for (var i = 0; i < label.length; i++) {
          if(label.charAt(i) === label.charAt(i).toUpperCase()){
              formInfo.label = label.substring(0,i)+' '+label.substring(i,label.length)
          }
        }
        formInfo.label = formInfo.label.replace('_',' ');
      
        if(this.fieldCheck(label)){
          _controller.formInfos.push(formInfo);
        }
        
      });
    }
  }
  public objectValue(label: string){
    return this.info[label];
  }
  public fieldCheck(f: string): boolean {
    let isCheck =false;
    this.field.forEach(fld =>{
        if(fld ===f){
          isCheck =true;
        }
    });
    return isCheck;
  }

}
