import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/app/services/ContactService';
import { PersonService } from 'src/app/services/PersonService';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private contactService: ContactService,
    private personService: PersonService,
    public activatedRoute: ActivatedRoute

  ) { }
  closeResult: string;
  typeText: string = "Type"
  state: any
  contactType: number
  person: any = null
  contacts: any = null


  ngOnInit() {
    this.state = this.activatedRoute.paramMap
      .pipe((() => window.history.state))
    if (this.state.id !== null)
      this.getPerson(this.state.id)
  }

  getPerson(id) {
    this.personService.getPersonById(id).subscribe((data) => {
      this.person = data.person[0];
      this.contacts = data.contacts;
    })
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  setType(type: string, id: number) {
    this.typeText = type;
    this.contactType = id;
  }

  saveNewContact(contact: any) {
    const body = {
      idType: this.contactType,
      idPerson: this.person.id,
      contact: contact
    }
    this.contactService.createContact(body).subscribe((data: {}) => {
      this.typeText = 'Type'
      this.contactType = null;
      this.getPerson(this.person.id);
    })
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe(() => {
      this.getPerson(this.person.id)
    })
  }

}
