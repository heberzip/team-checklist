export interface Checklist {
  id: number;
  title: string;
  description?: string | null;
  createdAt: string;
  items: Item[];
}

export interface Item {
  id: number;
  text: string;
  done: boolean;
}

export interface ChecklistCreateDTO {
  title: string;
  description?: string | null;
}
