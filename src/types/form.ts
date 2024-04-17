import { ReactElement } from 'react';
import { FieldValues } from 'react-hook-form';

/**
 * Field definition for rendering
 */
export type RenderFormField = {
  label: string;
  Component: ReactElement;
};

/**
 * Object defining the list of form fields to be rendered
 * T is Name of the field (example: patientName)
 */
export type RenderFormFieldDefinition<T extends FieldValues = Record<string, unknown>> =
  Partial<Record<keyof T, RenderFormField>>;
