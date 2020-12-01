import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Saber } from '../sabers/saber/saber.modal';
import { SabersService } from '../sabers/sabers.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  constructor(private sabersService: SabersService) { }

  sabers: Saber[];
  sabersSubscription: Subscription;

  @ViewChild('addSaberForm') addSaberForm: NgForm;
  @ViewChild('editSaberForm') editSaberForm: NgForm;

  editMode: boolean = false;
  addMode: boolean = false;
  addSaberError: boolean = false;
  saberToEdit: Saber;

  ngOnInit(): void {
    const sabers = this.sabersService.getSabers();
    if(sabers) {
      this.sabers = sabers;
    } else {
      this.sabersService.getSabers();
    }
    this.sabersSubscription = this.sabersService.sabersChanged.subscribe(sabers => {
      this.sabers = sabers;
    })
  }

  switchToAddMode() {
    this.addMode = true;
    this.editMode = false;
  }

  onAddSaber() {
    if(this.addSaberForm.form.invalid){
      this.addSaberError = true;
      return;
    }
    const saber = {
      available: this.addSaberForm.form.value.available,
      name: this.addSaberForm.form.value.saberName,
      crystal: {
        name: this.addSaberForm.form.value.crystalName,
        color: this.addSaberForm.form.value.crystalColor,
        powerUsage: +this.addSaberForm.form.value.power,
        planet: +this.addSaberForm.form.value.planet,
      }
    }

    this.sabersService.addSaber(saber);
    this.addMode = false;
  }

  onEditSaber() {
    this.sabersService.setSaber(this.saberToEdit);
    this.saberToEdit = null;
    this.editMode = false;
  }

  switchToEditMode(saber: Saber) {
    this.editMode = true;
    this.addMode = false;
    this.saberToEdit = {
      ...saber
    };
  }

  cancelAdd() {
    this.addMode = false;
    this.addSaberForm.form.reset();
  }

  cancelEdit() {
    this.editMode = false;
    this.saberToEdit = null;
    this.editSaberForm.form.reset();
  }

}
