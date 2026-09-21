import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user-model'; // ✅ Correct path

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  // Backend API URL
  private apiUrl: string = 'http://localhost:3000/users';

  // Inject HttpClient
  constructor(private http: HttpClient) { }

  // ✅ Fetch all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // ✅ Fetch user by ID
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);  // ✅ Fixed backticks + ${}
  }

  // ✅ Add new user
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // ✅ Update user
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);  // ✅ Fixed backticks + ${}
  }

  // ✅ Delete user
  deleteUser(id: number): Observable<void> {  // ✅ void, not User
    return this.http.delete<void>(`${this.apiUrl}/${id}`);  // ✅ Fixed backticks + ${}
  }
}