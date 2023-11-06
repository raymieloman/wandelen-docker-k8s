import {Component, OnInit} from '@angular/core';
import {WandelingService} from "../../service/wandeling.service";
import {Observable} from "rxjs";
import {Wandeling} from "../../model/wandeling";
import {Router} from "@angular/router";

@Component({
  selector: 'app-wandelings',
  templateUrl: './wandelings.component.html',
  styleUrls: ['./wandelings.component.css']
})
export class WandelingsComponent {

  public wandelings$: Observable<Wandeling[] | null> = this.wandelingService.getWandelings();


  constructor(private router: Router, private wandelingService: WandelingService) {
  }
}
