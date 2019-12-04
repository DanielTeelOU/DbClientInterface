//overarching class so that all the fields can be used wherever they are needed
export class Issue {
  //data fields to be pulled
    id: number;
    title: string;
    body: string;
    state: string;
    created_at: string;
    updated_at: string;
    url: string;
    number: number;
    open_issues: number;
  }