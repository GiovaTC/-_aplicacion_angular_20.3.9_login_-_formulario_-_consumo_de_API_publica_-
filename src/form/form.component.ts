import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ApiService } from '../app/services/api.service'; 

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html'  
})
export class FormComponent {

  title = '';
  body = '';
  respuesta: any;

  constructor(private api: ApiService) {}

  enviar(): void {
    const payload = {
      title: this.title,
      body: this.body,
      userId: 1
    };

    this.api.enviarDatos(payload).subscribe(resp => {
      this.respuesta = resp;
    });
  }
} 
