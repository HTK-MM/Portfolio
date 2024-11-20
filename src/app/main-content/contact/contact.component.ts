import { CommonModule, NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { DialogConfEmailComponent } from '../../dialog-conf-email/dialog-conf-email.component';
import { Router } from '@angular/router';
import { MenuService } from '../../menu.service';





@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass, FormsModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  private _router = inject(Router);
  http = inject(HttpClient);

  contactForm!: FormGroup;
  formStatus: string = 'INVALID';
  
  /**
   * Initializes the contact form component.
   * @param formBuilder The form builder used to create the contact form.
   * @param dialog The dialog service used to open the confirmation dialog.
   * @param menuService The menu service used to reset the menu.
   */
  constructor(private formBuilder: FormBuilder, public dialog?: MatDialog, private menuService?: MenuService) {

    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$')]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      checkbox: [false, [Validators.requiredTrue]]
    });

    this.contactForm.statusChanges.subscribe(
      status => {
        console.log('mi status:', status);
        this.formStatus = status;
      }
    )

  }
  post = {
    endPoint: 'https://monica-morales.com/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };


  /** * Sends the contact form data to the specified endpoint via HTTP POST request.
   * Prevents the default form submission behavior and sends the form data as a payload.
   * Resets the form upon successful submission, logs any errors to the console, and
   * provides a completion message when the request is finished. *
   * @param event The event triggered by form submission. */
  send(event: Event) {
    event.preventDefault();
    this.http.post(this.post.endPoint, this.post.body(this.contactForm.value))
      .subscribe({
        next: (response) => {
          this.contactForm.reset();
          this.openDialog();
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => console.info('send post complete'),
      });

    console.log(this.contactForm);
  }

  /**   * Returns true if the form control with the given `field` name has a validation error
   * with the given `typeError` and has been previously visited/touched by the user.
   * @param field The name of the form control to check for errors.
   * @param typeError The type of error to check for.   */
  hasErrors(field: string, typeError: string) {
    return this.contactForm.get(field)?.hasError(typeError) && this.contactForm.get(field)?.touched;
  }

  openDialog(): void {
    const dialogRef = this.dialog?.open(DialogConfEmailComponent);
  }
  ngOnInit(): void {

  }

  goToPrivacy(route: string) {
    this._router.navigate(['/' + route]);
    this.onLinkClick();
  }

  onLinkClick() {
    this.menuService?.resetMenu();
  }

}
