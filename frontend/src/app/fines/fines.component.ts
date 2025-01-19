import { Component } from '@angular/core';
import { FinesService } from '../fines.service';

@Component({
  selector: 'app-fines',
  templateUrl: './fines.component.html',
  styleUrls: ['./fines.component.css']
})
export class FinesComponent {

  fines: any[] = [];
  errorMessage: string = '';

  constructor(private service: FinesService) { }

  ngOnInit(): void {
    this.fetchFines();
  }

  fetchFines(): void {
    this.service.getFines().subscribe((res) => {
      this.fines = res;
    })
  }

  notifyUser(fine: any): void {
    this.service.notifyUser(fine).subscribe(
      (response) => {
        alert('Notification sent successfully!');
      },
      (error) => {
        const errorMessage = error?.error?.message;
        alert(errorMessage);
      }
    );
  }
}