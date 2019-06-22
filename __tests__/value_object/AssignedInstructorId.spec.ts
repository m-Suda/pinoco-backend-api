import { AssignedInstructorId } from "../../src/value_object/AssignedInstructorId";

// BaseValueObjectのほうでやってるのでインスタンス生成だけテスト
describe('担当講師IDテスト', () => {

    test('インスタンス化成功', () => {
        expect(() => {new AssignedInstructorId('Instructor-id');}).not.toThrow();
    });
    test('インスタンス化失敗', () => {
        expect(() => {new AssignedInstructorId('');}).toThrow();
    });
});