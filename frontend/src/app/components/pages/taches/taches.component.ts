import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus, faTrash, faCoffee  } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../../services/task.service';
import { UserService, User } from '../../services/user.service';
import emailjs from '@emailjs/browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-taches',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [ToastrService],
  templateUrl: './taches.component.html',
  styleUrl: './taches.component.css',
})
export class TachesComponent implements OnInit {
  faCirclePlus = faCirclePlus;
  faTrash = faTrash;
  faCoffee =faCoffee ;

  taskForm: FormGroup;
  users: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private userService: UserService,
    private toast: ToastrService
  ) {
    this.taskForm = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      tacheID: [''],
      assignments: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data) => (this.users = data));
  }

  get assignments(): FormArray {
    return this.taskForm.get('assignments') as FormArray;
  }

  addAssignment(): void {
    this.assignments.push(
      this.formBuilder.group({
        userId: ['', Validators.required],
      })
    );
  }

  removeAssignment(index: number): void {
    this.assignments.removeAt(index);
  }

  handleSubmit(): void {
    if (this.taskForm.valid) {
      this.onSubmit();
      this.sendMails();
    } else {
      this.toast.error('Veuillez remplir tous les champs obligatoires.');
    }
  }

  onSubmit(): void {
    this.taskService.postTask(this.taskForm.value).subscribe(() => {
      this.toast.success('Tâche créée avec succès !');
    });
  }

  sendMails(): void {
    const titre = this.taskForm.value.titre;
    const description = this.taskForm.value.description;

    const uniqueUserIds = new Set();

    this.taskForm.value.assignments.forEach((assignment: any) => {
      if (!uniqueUserIds.has(assignment.userId)) {
        uniqueUserIds.add(assignment.userId);

        const assignedUser = this.users.find(u => u.id === +assignment.userId);

        if (assignedUser?.email) {
          emailjs.send(
            'default_service',
            'template_e1fg6hd',
            {
              titre: titre,
              description: description,
              to_name: assignedUser.nom,
              to_email: assignedUser.email,
            },
            'djFn3omNyaIOD1v1T'
          ).then(
            () => {
              this.toast.info(`Un mail a été envoyé à ${assignedUser.email}`);
            },
            (err) => {
              console.error(err);
              this.toast.error(`Erreur lors de l'envoi à ${assignedUser.email}`);
            }
          );
        }
      }
    });
  }
}
