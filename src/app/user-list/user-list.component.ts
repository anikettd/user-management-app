import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { User } from '../../models/user-model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  styleUrl: './user-list.component.css',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers(): void {
    this.loading = true;
    this.error = '';

    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load users. Please try again.';
        this.loading = false;
      }
    });
  }

  // ✅ Search method
  search(): void {
    if (!this.searchTerm.trim()) {
      this.filteredUsers = this.users;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(
      user => user.name.toLowerCase().includes(term) ||
              user.email.toLowerCase().includes(term)
    );
  }

  // ✅ Clear search
  clearSearch(): void {
    this.searchTerm = '';
    this.filteredUsers = this.users;
  }

  // ✅ Add user (navigate)
  addUser(): void {
    this.router.navigate(['/users/add']);
  }

  // ✅ Edit user (navigate)
  editUser(id: number): void {
    this.router.navigate(['/users/edit', id]);
  }

  // ✅ Delete user (update BOTH lists)
  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== id);
          this.filteredUsers = this.filteredUsers.filter(u => u.id !== id); // ✅ Fix
        },
        error: () => {
          this.error = 'Failed to delete user. Please try again.';
        }
      });
    }
  }
}