import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../models/user-model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  loading: boolean = false;
  error: string = '';
  totalUsers: number = 0;
  activeUsers: number = 0;
  inactiveUsers: number = 0;

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;
    this.error = '';

    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.totalUsers = data.length;
        this.activeUsers = data.filter(u => u.isActive).length;
        this.inactiveUsers = data.filter(u => !u.isActive).length;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'Failed to load stats.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}
