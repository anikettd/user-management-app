import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../models/user-model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  styleUrl: './user-form.component.css',
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnInit {
  user: User = { id: 0, name: '', email: '', age: 0, isActive: true };
  isEditMode: boolean = false;
  loading: boolean = false;
  error: string = '';
  successMessage: string = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadUser(Number(id));
    }
  }

  loadUser(id: number): void {
    this.loading = true;
    this.userService.getUser(id).subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'Failed to load user.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  addUser(): void {
    this.loading = true;
    this.error = '';
    this.successMessage = '';

    this.userService.addUser(this.user).subscribe({
      next: () => {
        this.successMessage = 'User added successfully!';
        this.loading = false;
        this.cdr.markForCheck();
        setTimeout(() => this.router.navigate(['/users']), 1500);
      },
      error: () => {
        this.error = 'Failed to add user.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  updateUser(): void {
    this.loading = true;
    this.error = '';
    this.successMessage = '';

    this.userService.updateUser(this.user.id, this.user).subscribe({
      next: () => {
        this.successMessage = 'User updated successfully!';
        this.loading = false;
        this.cdr.markForCheck();
        setTimeout(() => this.router.navigate(['/users']), 1500);
      },
      error: () => {
        this.error = 'Failed to update user.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  onReset(): void {
    this.user = { id: 0, name: '', email: '', age: 0, isActive: true };
    this.error = '';
    this.successMessage = '';
  }
}
