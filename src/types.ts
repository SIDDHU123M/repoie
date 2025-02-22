export interface Category {
  id: string;
  name: string;
  icon: string;
  items: Item[];
}

export interface Item {
  id: string;
  name: string;
  icon: string;
  path: string;
}

export type CategoryId = 'programming' | 'frameworks' | 'tools';