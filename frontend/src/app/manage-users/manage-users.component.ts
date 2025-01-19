import { Component, OnInit } from '@angular/core';
import { ManageUsersService } from '../manage-users.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})

export class ManageUsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchQuery: string = '';
  showModal: boolean = false;
  userForm: FormGroup;
  selectedUser: any = null;

  constructor(private service: ManageUsersService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      password: ['', Validators.required],
      plan: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.service.getUsers().subscribe((res) => {
      this.users = res;
      this.filteredUsers = res;
    }
    );
  }

  onSearchQueryChange(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredUsers = this.users.filter((user) => {
      const nameMatch = user?.Name?.toLowerCase().includes(query);
      const emailMatch = user?.EmailID?.toLowerCase().includes(query);
      const phoneMatch = user?.PhoneNumber?.includes(this.searchQuery);
      return nameMatch || emailMatch || phoneMatch;
    });
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.service.deleteUser(userId).subscribe(() => {
        alert('User deleted successfully');
        this.fetchUsers();
      }
      );
    }
  }

  openAddModal(): void {
    this.showModal = true;
    this.selectedUser = null;
    this.userForm.reset();
  }

  openEditModal(user: any): void {
    this.showModal = true;
    this.selectedUser = user;
    this.userForm.patchValue({
      name: user.Name,
      email: user.EmailID,
      mobile: user.PhoneNumber,
      password: user.PassWord,
      plan: user.PlanID
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedUser = null;
    this.userForm.reset();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      if (this.selectedUser) {
        this.service.updateUser(formData, this.selectedUser.ID).subscribe(() => {
          alert('User updated successfully');
          this.fetchUsers();
          this.closeModal();
        }
        );
      } else {
        this.service.insertUser(formData).subscribe(() => {
          alert('User added successfully');
          this.fetchUsers();
          this.closeModal();
        }
        );
      }
    }
  }
}
