import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Project } from '../project';

@Component({
  selector: 'app-delete-project-modal',
  templateUrl: './delete-project-modal.component.html',
  styleUrls: ['./delete-project-modal.component.css']
})
export class DeleteProjectModalComponent implements OnInit {

  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() confirmChange = new EventEmitter;

  setOpened(val: boolean) {
    this.opened = val;
    this.openedChange.emit(this.opened);
  }

  deleteProject() {
    this.confirmChange.emit();
  }


  ngOnInit() {
  }

}
