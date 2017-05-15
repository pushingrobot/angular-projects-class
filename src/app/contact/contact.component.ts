import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import CustomValidators from "../forms/CustomValidators";

const minContentLength: number = 10;

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact-component.css"],
})
export class ContactComponent implements OnInit {
  public contactForm: FormGroup;
  private constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, CustomValidators.validateEmail]],
      content: ["", [Validators.required, Validators.minLength(minContentLength)]],
    });
  }
  public submitForm(): void {
    console.log(this.contactForm);
  }
}
