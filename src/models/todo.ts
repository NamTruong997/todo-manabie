export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  //OPTIMIZE: ALL is default status
  ALL = 'ALL'
}

export interface Todo {
  id: string
  user_id: string
  content : string
  status?: TodoStatus
  created_date: string
}