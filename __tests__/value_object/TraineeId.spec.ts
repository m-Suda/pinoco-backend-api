import { TraineeId } from "../../src/value_object/TraineeId";

describe('研修受講者IDテスト', () => {

    describe('必須テスト', () => {
        describe('正常', () => {
            test('成功', () => {
                expect(() => {new TraineeId('trainee-id');}).not.toThrow();
            });
        });
        // このIDにはFirebase Authenticationのuidが入るので空チェックのみ行う。
        describe('異常', () => {
            test('空文字', () => {
                expect(() => {new TraineeId('');}).toThrow();
            });
            test('半角スペースのみ', () => {
                expect(() => {new TraineeId('');}).toThrow();
            });
            test('全角スペースのみ', () => {
                expect(() => {new TraineeId('');}).toThrow();
            });
            test('null', () => {
                expect(() => {new TraineeId(null);}).toThrow();
            });
            test('undefined', () => {
                expect(() => {new TraineeId(undefined);}).toThrow();
            });
        });
    });

});