# -_aplicacion_angular_20.3.9_login_-_formulario_-_consumo_de_API_publica_- :. 
# Aplicación Angular 20.3.9 – Login + Formulario + Consumo de API Publica .  

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/8d71ac9a-0fb6-487e-bce2-d02717384e7d" />        

<img width="1347" height="729" alt="image" src="https://github.com/user-attachments/assets/b08e723d-13ac-42f5-ae2e-bce4c2cfbe27" />  

<img width="1365" height="732" alt="image" src="https://github.com/user-attachments/assets/65a3efe4-f5cb-4219-83e7-89ab119b40f6" />  

<img width="1365" height="731" alt="image" src="https://github.com/user-attachments/assets/beac4603-d12e-4639-8bdd-836da2cfda04" />  

<img width="1363" height="767" alt="image" src="https://github.com/user-attachments/assets/2a9244f7-21e4-4aca-b009-23f423f310b6" />  

<img width="1365" height="767" alt="image" src="https://github.com/user-attachments/assets/5097530c-0a5a-4715-a88d-23a03bc4499e" />  

<img width="1365" height="766" alt="image" src="https://github.com/user-attachments/assets/ba34d322-0ac5-425c-86f2-c2fb3aafe759" />      

 <img width="1012" height="193" alt="image" src="https://github.com/user-attachments/assets/8eef11be-3004-4ca2-aff3-b346f52b4c35" />  

A continuación se presenta una **solución completa, profesional y funcional en Angular 20.3.9** que implementa:

- Login básico (simulado, sin backend propio).
- Formulario de envío de información.
- Consumo de una API pública Open Source.
- Buenas prácticas de Angular:
  - Standalone Components.
  - HttpClient.
  - Servicios.
  - Routing.

La API pública utilizada es **JSONPlaceholder** (open source y ampliamente usada para pruebas):

https://jsonplaceholder.typicode.com/posts


---

## 1. Arquitectura de la solucion:

### Componentes

- **LoginComponent** → Simula autenticación
- **FormComponent** → Envía información a la API pública
- **AppComponent** → Contenedor principal

### Servicios

- **AuthService** → Manejo de login (mock)
- **ApiService** → Consumo HTTP a API pública

### Flujo de la aplicación

Login → Autenticación simulada → Formulario → POST a API publica


---

## 2. Creacion del proyecto:

```bash
npm install -g @angular/cli
ng new angular-login-form-api --standalone --routing --style=css
cd angular-login-form-api
ng serve

3. Servicio de autenticación (simulado)
Ruta: src/app/services/auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private loggedIn = false;

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '1234') {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  logout(): void {
    this.loggedIn = false;
  }
}

4. Servicio para consumo de API pública
Ruta: src/app/services/api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  enviarDatos(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}

5. Componente Login
Ruta: src/app/login/login.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    if (this.auth.login(this.username, this.password)) {
      this.router.navigate(['/form']);
    } else {
      this.error = 'Credenciales inválidas';
    }
  }
}

Plantilla HTML
Ruta: src/app/login/login.component.html

<h2>Login</h2>

<form (ngSubmit)="login()">
  <label>Usuario</label>
  <input type="text" [(ngModel)]="username" name="username" required>

  <label>Contraseña</label>
  <input type="password" [(ngModel)]="password" name="password" required>

  <button type="submit">Ingresar</button>

  <p style="color:red">{{ error }}</p>
</form>

6. Componente Formulario
Ruta: src/app/form/form.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

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

Plantilla HTML
Ruta: src/app/form/form.component.html

<h2>Formulario de Envío</h2>

<form (ngSubmit)="enviar()">
  <label>Título</label>
  <input type="text" [(ngModel)]="title" name="title" required>

  <label>Contenido</label>
  <textarea [(ngModel)]="body" name="body" required></textarea>

  <button type="submit">Enviar</button>
</form>

<div *ngIf="respuesta">
  <h3>Respuesta de la API</h3>
  <pre>{{ respuesta | json }}</pre>
</div>

7. Rutas de la aplicación
Ruta: src/app/app.routes.ts

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'form', component: FormComponent }
];

8. Configuración principal de la aplicación
Ruta: src/app/app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};

9. Componente raíz
Ruta: src/app/app.component.ts

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {}

10. Credenciales de prueba

Usuario: admin
Contraseña: 1234

11. Resultado esperado

Login funcional
Navegación por rutas
Envío de datos vía HTTP POST
Visualización de la respuesta desde la API publica.

Codigo compatible con Angular 20.3.9 :. / .
