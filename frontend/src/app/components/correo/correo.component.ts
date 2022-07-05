import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CorreoService } from 'src/app/services/correo.service';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.css'],
})
export class CorreoComponent implements OnInit {
  datos!: FormGroup;
  mensaje!: string;
  asunto!: string;
  correo!: string;

  constructor(
    private correoService: CorreoService,
    private toastr: ToastrService
  ) {
    this.datos = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      asunto: new FormControl('', Validators.required),
      mensaje: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  enviarMail() {
    this.correoService
      .enviarCorreo(this.correo, this.asunto, this.mensaje)
      .subscribe(
        (result) => {
          console.log(result);
          this.toastr.success('Email enviado');
        },
        (error) => {
          console.log(error);
          alert(error.msg);
          this.toastr.error('Email No enviado');
        }
      );
  }
}
