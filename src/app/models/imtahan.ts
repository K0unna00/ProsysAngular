import { Ders } from "./ders";
import { Shagird } from "./shagird";

export class Imtahan {
    id: string;
    lessonId: string;
    studentId: string;
    date: Date;
    grade: number;
    lesson: Ders;
    student: Shagird;
}