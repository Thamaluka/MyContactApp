import { Component, OnInit, Output } from '@angular/core';
import { PersonService } from 'src/app/services/PersonService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  list = null;
  constructor(
    private personService: PersonService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setList();
  }

  setList() {
    this.personService.getAllContacts().subscribe((data: {}) => {
      if (data)
        this.list = data;
    })
  }


  goToContact(contact) {
    this.router.navigateByUrl('/contact', { state: { id: contact.id } });
  }

  deletePerson(id) {
    this.personService.deleteContact(id).subscribe((data: {}) => {
      this.setList();
    })
  }


}
