export class Task {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  isCompleted: boolean;

  constructor(
    title: string,
    description: string,
    createdAt: Date,
    isCompleted: boolean,
    id: string
  ) {
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.isCompleted = isCompleted;
    this.id = id;
  }
}
