import { Question } from "../question/question";

export class Answer {
    id = 0;
    approved_by = "";
    created_by = "";
    datetime = "";
    description_answer = "";
    img_src = "";
    status = "Pending approval";
    question = new Question();
}