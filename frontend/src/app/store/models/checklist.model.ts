export interface Checklist {
  id: number;
  title: string;
  description?: string | null;
  createdAt: string;
  items: Item[];
}

export interface Item {
  id: number;
  chlId: number;
  text: string;
  done: boolean;
  lastEditedBy?: string | null;
  updatedAt: string;
}

export interface ChecklistCreateDTO {
  title: string;
  description?: string | null;
}

export interface ItemUpdateDTO {
  done?: boolean;
  text?: string;
  lastEditedBy?: string;
}
