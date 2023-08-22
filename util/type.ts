//parcel타입
export interface ParcelDataType {
  from_address: string;
  id: string;
  progress: string;
  to_address: string;
  url: string;
  worker_address: string;
}
//ThProps
export interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}
