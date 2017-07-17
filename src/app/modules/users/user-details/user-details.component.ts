import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../../models/user';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  id: string;
  private subscription;
  user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getUser(this.id);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getUser(id: string) {
    /* this.subscription = */
    this.userService.getUser(id).subscribe(
      data => this.user = data,
      error => console.log(error)
    );
  }

  createNewUser() {
    this.userService.createUser(this.user).subscribe(
      data => console.log('data: ' + JSON.stringify(data)),
      error => console.log(error)
    );
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(
      response => {
        if (response === 204) {
          this.router.navigate(['./users']);
        }
      },
      error => console.log(error)
    );
  }

}