import { Component } from '@angular/core';
import { ActivationRequestService } from '../activation-request.service';

@Component({
  selector: 'app-activation-request',
  templateUrl: './activation-request.component.html',
  styleUrls: ['./activation-request.component.css']
})
export class ActivationRequestComponent {

  requests: any[] = [];
  errorMessage: string = '';

  constructor(private service: ActivationRequestService) { }

  ngOnInit(): void {
    this.fetchRequests();
  }

  fetchRequests(): void {
    this.service.getRequests().subscribe((res) => {
      this.requests = res;
    })
  }

  allowAccess(requestId: number, memberId: number): void {
    this.service.allowAccess(requestId, memberId).subscribe(
      (response) => {
        alert('Access Allowed!');
        this.fetchRequests();
      },
      (error) => {
        const errorMessage = error?.error?.message;
        alert(errorMessage);
      }
    );
  }
}