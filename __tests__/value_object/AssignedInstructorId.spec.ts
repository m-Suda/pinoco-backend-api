import { AssignedInstructorId } from "../../src/value_object/AssignedInstructorId";

describe('担当講師IDテスト', () => {

    describe('必須テスト', () => {
        describe('正常', () => {
            test('成功', () => {
                expect(() => {new AssignedInstructorId('Instructor-id');}).not.toThrow();
            });
        });
        describe('異常', () => {
            test('空文字', () => {
                expect(() => {new AssignedInstructorId('');}).toThrow();
            });
            test('半角スペース', () => {
                expect(() => {new AssignedInstructorId(' ');}).toThrow();
            });
            test('全角スペース', () => {
                expect(() => {new AssignedInstructorId('　');}).toThrow();
            });
            test('null', () => {
                expect(() => {new AssignedInstructorId(null);}).toThrow();
            });
            test('undefined', () => {
                expect(() => {new AssignedInstructorId(undefined);}).toThrow();
            });
        });
    });
});