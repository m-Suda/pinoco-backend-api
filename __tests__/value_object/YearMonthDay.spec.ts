import { YearMonthDay } from "../../src/value_object/YearMonthDay";

describe('年月日テスト', () => {

    describe('年月日クラスの初期化テスト', () => {
        describe('正常値', () => {
            test('とりあえず本日日付', () => {
                expect(() => { new YearMonthDay('2019-06-22') }).not.toThrow();
            });
            test('昨日日付', () => {
                expect(() => { new YearMonthDay('2019-06-21') }).not.toThrow();
            });
            test('明日日付', () => {
                expect(() => { new YearMonthDay('2019-06-23') }).not.toThrow();
            });
        });
        describe('異常値', () => {
            test('形式が違う 年が4桁ではない', () => {
                expect(() => {new YearMonthDay('201-06-19')}).toThrow();
            });
            test('形式が違う 月が2桁ではない', () => {
                expect(() => {new YearMonthDay('2019-6-19')}).toThrow();
            });
            test('形式が違う 日が2桁ではない', () => {
                expect(() => {new YearMonthDay('2019-6-19')}).toThrow();
            });
            test('形式が違う 年月日の区切りが-ではない', () => {
                expect(() => {new YearMonthDay('2019/06/19')}).toThrow();
            });
            test('形式が違う 年月日以外が含まれている', () => {
                expect(() => {new YearMonthDay('2019-06-19 00:00:00')}).toThrow();
            });
            test('形式が違う そもそも日付ではない', () => {
                expect(() => {new YearMonthDay('ほげほげ！')}).toThrow();
            });
        });
    });
    describe('日付の範囲テスト', () => {
        describe('正常値', () => {
            test('1900', () => {
                expect(() => {new YearMonthDay('1900-06-19')}).not.toThrow();
            });
            test('1999', () => {
                expect(() => {new YearMonthDay('1900-06-19')}).not.toThrow();
            });
            test('2000', () => {
                expect(() => {new YearMonthDay('2000-06-19')}).not.toThrow();
            });
            test('2999', () => {
                expect(() => {new YearMonthDay('2999-06-19')}).not.toThrow();
            });
        });
        describe('異常値', () => {
            test('1899', () => {
                expect(() => {new YearMonthDay('1899-06-19 00:00:00')}).toThrow();
            });
            test('3000', () => {
                expect(() => {new YearMonthDay('3000-06-19 00:00:00')}).toThrow();
            });
        });
    });

    describe('nullやundefinedが渡った時のテスト', () => {
        test('null', () => {
            expect(() => {new YearMonthDay(null)}).toThrow();
        });
        test('undefined', () => {
            expect(() => {new YearMonthDay(undefined)}).toThrow();
        });
    });

});