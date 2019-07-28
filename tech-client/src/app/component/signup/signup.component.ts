import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {SampleService} from "../../api/web-console/services/sample.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private httpClient: HttpClient, private router: Router, private sampleService: SampleService) { }

  ngOnInit() {
  }

  registerClick = function() {
    console.log("ss");
    // this.httpClient.post<>

    this.sampleService.getSample().subscribe(r => {
      console.log("success");
      console.log(r);
    }, e => {
      console.log("error");
      console.log(e);
    });

    // this.router.navigateByUrl("signup/email-verify")
  }
}
