import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { UserResponse } from './interfaces/user-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'awesome_todo-list';

  users: UserResponse[] = [];

  constructor(private userService: UserService) {
    this.userService.getAllUsers().subscribe(response => {
      console.log("hola")
      console.log(response);
      this.users = response;
    });
  }
}
