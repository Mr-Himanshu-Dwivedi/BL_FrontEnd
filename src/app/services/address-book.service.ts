import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class AddressBookService {
  private storageKey = 'addressBookData'; // Local storage key
  private persons: Person[] = this.loadPersonsFromStorage();
  private personsSubject = new BehaviorSubject<Person[]>(this.persons);
  persons$ = this.personsSubject.asObservable();

  constructor() {}

  // ✅ Load data from localStorage
  private loadPersonsFromStorage(): Person[] {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : [];
  }

  // ✅ Save data to localStorage
  private savePersonsToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.persons));
  }

  // ✅ Get all persons as Observable
  getPersons(): Observable<Person[]> {
    return this.persons$;
  }

  // ✅ Add a new person and return Observable<void>
  addPerson(person: Person): Observable<void> {
    person.id = this.persons.length > 0 ? Math.max(...this.persons.map(p => p.id)) + 1 : 1; // Assign unique ID
    this.persons.push(person);
    this.savePersonsToStorage();
    this.personsSubject.next(this.persons);
    return of(); // ✅ Ensures compatibility with `.subscribe()`
  }

  // ✅ Update person details and return Observable<void>
  updatePerson(updatedPerson: Person): Observable<void> {
    const index = this.persons.findIndex(p => p.id === updatedPerson.id);
    if (index !== -1) {
      this.persons[index] = updatedPerson;
      this.savePersonsToStorage();
      this.personsSubject.next(this.persons);
    }
    return of(); // ✅ Ensures compatibility with `.subscribe()`
  }

  // ✅ Delete a person and return Observable<void>
  deletePerson(id: number): Observable<void> {
    this.persons = this.persons.filter(p => p.id !== id);
    this.savePersonsToStorage();
    this.personsSubject.next(this.persons);
    return of(); // ✅ Ensures compatibility with `.subscribe()`
  }

  // ✅ Clear all data (if needed)
  clearAllPersons(): Observable<void> {
    this.persons = [];
    localStorage.removeItem(this.storageKey);
    this.personsSubject.next(this.persons);
    return of(); // ✅ Ensures compatibility with `.subscribe()`
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { Person } from '../models/person.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class AddressBookService {
//   private apiUrl = 'http://localhost:8080/api'; // 🌟 Backend API Base URL
//   private personsSubject = new BehaviorSubject<Person[]>([]);
//   persons$ = this.personsSubject.asObservable();

//   constructor(private http: HttpClient) {}

//   // ✅ Get all persons from Backend API
//   getPersons(): Observable<Person[]> {
//     return this.http.get<Person[]>(this.apiUrl+"/all");
//   }

//   // ✅ Add a new person (Backend Integration)
//   addPerson(person: Person): Observable<Person> {
//     return this.http.post<Person>(this.apiUrl+"/add", person);
//   }

//   // ✅ Update person details (Backend Integration)
//   updatePerson(updatedPerson: Person): Observable<Person> {
//     return this.http.put<Person>(`${this.apiUrl+"/update"}/${updatedPerson.id}`, updatedPerson);
//   }

//   // ✅ Delete a person (Backend Integration)
//   deletePerson(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl+"/delete"}/${id}`);
//   }
// }
