import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-decor',
  templateUrl: './decor.component.html',
  styleUrls: ['./decor.component.css']
})
export class DecorComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }

 

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
