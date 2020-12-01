import { Component, Input, OnInit } from '@angular/core';
import { style, trigger, state, transition, animate } from '@angular/animations';
import { Saber } from './saber.modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saber',
  templateUrl: './saber.component.html',
  styleUrls: ['./saber.component.scss'],
  animations: [
    trigger('section', [
      state('in', style({
        opacity: 1,
        height: '100%'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          height: '0'
        }),
        animate(200)
      ])
    ])
  ]
})
export class SaberComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() saber: Saber

  ngOnInit(): void {
  }

  order() {
    this.router.navigate(['/checkout'], {queryParams:{saberId: this.saber.id}});
  }

}
