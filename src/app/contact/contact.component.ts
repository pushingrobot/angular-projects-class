import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "../forms/CustomValidators";

const contentMinLength: number = 10;

/** TODO */
@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact-component.css"],
})
export class ContactComponent implements OnInit {

  /** TODO */
  public contactForm: FormGroup;
  public constructor(private formBuilder: FormBuilder) {}

  /** TODO */
  public ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, CustomValidators.validateEmail]],
      content: ["", [Validators.required, Validators.minLength(contentMinLength)]],
    });
  }

  /** TODO */
  public submitForm(): void {
    console.log(this.contactForm);
  }
}
