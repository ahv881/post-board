import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-board-layout',
  templateUrl: './post-board-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostBoardLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
