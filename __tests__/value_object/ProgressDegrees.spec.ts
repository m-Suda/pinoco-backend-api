import { ProgressDegrees } from "../../src/value_object/DailyReport/ProgressDegrees";

describe('進捗度テスト', () => {
    describe('進捗度範囲', () => {
        describe('正常', () => {
            test('境界値 1', () => {
                expect(() => {new ProgressDegrees(1)}).not.toThrow();
            });
            test('境界値 5', () => {
                expect(() => {new ProgressDegrees(5)}).not.toThrow();
            });
        });
        describe('異常', () => {
            test('境界値 0', () => {
                expect(() => {new ProgressDegrees(0)}).toThrow();
            });
            test('境界値 6', () => {
                expect(() => {new ProgressDegrees(6)}).toThrow();
            });
        });
    });
});