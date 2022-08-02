import { useState } from 'react';
import { buildField } from '../business/Field';
import { IField } from '../types';

const useField = (rows: number, columns: number) => {
  const [field, setField] = useState<IField>(buildField(rows, columns))

  return [field, setField] as const;
}

export default useField;
