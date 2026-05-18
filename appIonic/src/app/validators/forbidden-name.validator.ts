import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador personalizado que rechaza un nombre concreto (case-insensitive).
 * Devuelve `{ forbiddenName: { value } }` si el control coincide con `name`.
 */
export function forbiddenNameValidator(name: RegExp | string): ValidatorFn {
  const pattern = name instanceof RegExp ? name : new RegExp(`^${name}$`, 'i');
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value ?? '').toString();
    return pattern.test(value) ? { forbiddenName: { value: control.value } } : null;
  };
}

/**
 * Validador a nivel de grupo: comprueba que dos controles tengan el mismo valor.
 * Pensado para campos `password` / `confirmPassword`.
 */
export function matchFieldsValidator(fieldA: string, fieldB: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const a = group.get(fieldA);
    const b = group.get(fieldB);
    if (!a || !b) {
      return null;
    }
    if (a.value !== b.value) {
      return { mismatch: true };
    }
    return null;
  };
}
