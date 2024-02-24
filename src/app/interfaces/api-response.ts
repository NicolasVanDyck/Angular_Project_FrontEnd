import { Content } from './content';

// created to match the response from the API
export interface ApiResponse {
  $id: string;
  $values: Content[];
}
