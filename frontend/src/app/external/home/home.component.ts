import { Component, OnInit, ViewChild } from '@angular/core';
import { DropDownListComponent } from 'smart-webcomponents-angular/dropdownlist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('dropdownlist', { read: DropDownListComponent, static: false }) dropdownlist: DropDownListComponent;
  constructor() { }

  ngOnInit(): void {
  }

}


