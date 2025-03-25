import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddressBookService } from '../../services/address-book.service';
import { Person } from '../../models/person.model';
import { AddPersonComponent } from '../add-person/add-person.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'address', 'city', 'state', 'zip', 'phoneNumber', 'actions'];
  dataSource = new MatTableDataSource<Person>([]);

  constructor(private addressBookService: AddressBookService, public dialog: MatDialog) {}

  ngOnInit() {
    this.addressBookService.getPersons().subscribe(data => {
      console.log('Loaded Data:', data); // ✅ Debugging line
      this.dataSource.data = data;
    });
  }
  
  openDialog(person?: Person) {
    const dialogRef = this.dialog.open(AddPersonComponent, {
      width: '700px',
      data: person ? { ...person } : null
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (person) {
          this.addressBookService.updatePerson(result).subscribe(() => this.refreshData());
        } else {
          this.addressBookService.addPerson(result).subscribe(() => this.refreshData());
        }
      }
    });
  }
  
  deletePerson(id: number) {
    this.addressBookService.deletePerson(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(p => p.id !== id);
    });
  }
  
  private refreshData() {
    this.addressBookService.getPersons().subscribe(data => {
      this.dataSource.data = data;  // ✅ Refresh table after add/update
    });
  }
}

// import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { AddressBookService } from '../../services/address-book.service';
// import { Person } from '../../models/person.model';
// import { AddPersonComponent } from '../add-person/add-person.component';
// import { MatTableDataSource } from '@angular/material/table';

// @Component({
//   selector: 'app-address-book',
//   templateUrl: './address-book.component.html',
//   styleUrls: ['./address-book.component.scss']
// })
// export class AddressBookComponent implements OnInit {
//   displayedColumns: string[] = ['fullName', 'address', 'city', 'state', 'zip', 'phoneNumber', 'actions'];
//   dataSource = new MatTableDataSource<Person>([]);

//   constructor(private addressBookService: AddressBookService, public dialog: MatDialog) {}

//   ngOnInit() {
//     this.loadPersons();
//   }

//   /** ✅ Fetch All Persons from Backend */
//   loadPersons() {
//     this.addressBookService.getPersons().subscribe({
//       next: (data) => {
//         console.log('Loaded Data:', data); // ✅ Debugging line
//         this.dataSource.data = data;
//       },
//       error: (err) => console.error('Error fetching persons:', err)
//     });
//   }

//   /** ✅ Open Dialog for Add/Edit */
//   openDialog(person?: Person) {
//     const dialogRef = this.dialog.open(AddPersonComponent, {
//       width: '700px',
//       data: person ? { ...person } : null
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         if (person) {
//           // ✅ Update Existing Person
//           this.addressBookService.updatePerson(result).subscribe({
//             next: () => this.loadPersons(),
//             error: (err) => console.error('Error updating person:', err)
//           });
//         } else {
//           // ✅ Add New Person
//           this.addressBookService.addPerson(result).subscribe({
//             next: () => this.loadPersons(),
//             error: (err) => console.error('Error adding person:', err)
//           });
//         }
//       }
//     });
//   }

//   /** ✅ Delete Person */
//   deletePerson(id: number) {
//     if (confirm('Are you sure you want to delete this contact?')) {
//       this.addressBookService.deletePerson(id).subscribe({
//         next: () => this.loadPersons(),
//         error: (err) => console.error('Error deleting person:', err)
//       });
//     }
//   }
// }
