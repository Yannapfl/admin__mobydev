import { format } from 'date-fns';

export const formatDateBirth = (date) => format(new Date(date), 'dd.MM.yyyy');