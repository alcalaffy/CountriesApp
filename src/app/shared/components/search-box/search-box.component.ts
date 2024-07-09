import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit,OnDestroy{
  @Input()
  public placeholder:string='';

  public debouncer:Subject<string>=new Subject<string>();
  private debouncerSubscription!:Subscription;

  @Output()
  public onValue=new EventEmitter<string>();

  @Output()
  public onDebaunce=new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubscription=this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value=>{
      this.onDebaunce.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription.unsubscribe();
  }

  emitValue(value:string){
    this.onValue.emit(value);
  }

  onKeyPress(term:string){
    this.debouncer.next(term);
  }
}
