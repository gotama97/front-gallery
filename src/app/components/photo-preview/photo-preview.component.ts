import { Component, OnInit } from '@angular/core';
import { PhotoServiceService } from "../../services/photo-service.service";
import { ActivatedRoute,Router } from "@angular/router";

import { Photo } from "../../interfaces/photo";

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent implements OnInit {

  id:string;
  photo:Photo;

  constructor(private activateRoute:ActivatedRoute,
    private router:Router,
    private photoservice:PhotoServiceService) { }

  ngOnInit() {
this.activateRoute.params.subscribe(params =>{
  this.id=params['id']
  this.photoservice.getPhoto(this.id)
  .subscribe(
    res=>{
      this.photo = res
    },
    err=>console.log(err)
  )
})
  }

  deletePhoto(id:string){
    this.photoservice.deletePhoto(id)
    .subscribe(
      res=>{console.log(res)
      this.router.navigate(['/photos'])},
      err=>console.log(err)
    )
  }


  updatePhoto(title:HTMLInputElement,description:HTMLTextAreaElement){
  this.photoservice.updatePhoto(this.id,title.value,description.value)
  .subscribe(
    res=>{
      this.router.navigate(['/photos']);
    },
    err=>console.log(err)
  )
  return false
  }
}
