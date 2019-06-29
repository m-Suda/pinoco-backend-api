import { UnderstandingDegrees } from "../../src/value_object/DailyReport/UnderstandingDegrees";

describe('理解度テスト', () => {
    describe('理解度範囲', () => {
        describe('正常', () => {
            test('境界値 1', () => {
                expect(() => {new UnderstandingDegrees(1)}).not.toThrow();
            });
            test('境界値 5', () => {
                expect(() => {new UnderstandingDegrees(5)}).not.toThrow();
            });
        });
        describe('異常', () => {
            test('境界値 0', () => {
               expect(() => {new UnderstandingDegrees(0)}).toThrow();
            });
            test('境界値 6', () => {
               expect(() => {new UnderstandingDegrees(6)}).toThrow();
            });
        });
    });
});