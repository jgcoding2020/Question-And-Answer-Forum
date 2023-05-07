import { Question } from "../question/question";

// Answer class
// implemented by Joshua Gardner
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