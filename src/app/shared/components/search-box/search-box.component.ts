import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit{
  @Input()
  public placeholder:string='';

  public debouncer:Subject<string>=new Subject<string>();

  @Output()
  public onValue=new EventEmitter<string>();

  @Output()
  public onDebaunce=new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value=>{
      this.onDebaunce.emit(value);
    });
  }
  emitValue(value:string){
    this.onValue.emit(value);
  }

  onKeyPress(term:string){
    this.debouncer.next(term);
  }
}
