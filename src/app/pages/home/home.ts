import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  template: `
    <div style="padding: 20px; display: flex; flex-direction: column; gap: 20px">
      <h1>welcome to our landing page!</h1>
      <div style="
      display: flex;
      flex-direction: column;
      gap: 10px;
      border: 1px solid #ccc;
      padding: 10px;
    ">
        <button [routerLink]="['']">home</button>
        <button [routerLink]="['post']">posts</button>
      </div>
    </div>
  `,
  styles: ``,
})
export class Home {}
