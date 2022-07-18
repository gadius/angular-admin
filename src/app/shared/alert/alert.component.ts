import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
@Injectable({ providedIn: 'root' })
export class AlertComponent implements OnInit {

  @Input() message?: string;
  @Output('close') close =  new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {

  }

  onClose(){
    this.close.emit();
  }

}
