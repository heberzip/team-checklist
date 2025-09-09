import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

export type ItemFormValue = { id?: number; text: string };

@Component({
  selector: 'chl-item-form',
  standalone: true,
  templateUrl: './item-form.html',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class ItemForm {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  // Si viene un ítem => editar; si viene null => crear
  @Input() item: ItemFormValue | null = null;

  @Output() save = new EventEmitter<ItemFormValue>();
  @Output() cancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    text: ['', [Validators.required, Validators.maxLength(200)]],
  });

  // Cuando se muestra el diálogo, precarga el texto si hay item
  onShow() {
    this.form.reset({
      text: this.item?.text ?? '',
    });
  }

  onCancel() {
    this.cancel.emit();
    this.visibleChange.emit(false);
  }

  onHide() {
    this.cancel.emit();
    this.visibleChange.emit(false);
  }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { text } = this.form.getRawValue();
    this.save.emit({ id: this.item?.id, text });
    this.visibleChange.emit(false);
  }
}
