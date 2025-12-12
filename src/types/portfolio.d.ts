export interface Portfolio {
  id: number;
  name: string;
  type: 'manual' | 'exchange' | 'wallet';
}