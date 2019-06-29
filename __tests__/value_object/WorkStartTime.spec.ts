import { WorkStartTime } from "../../src/value_object/Attendance/WorkStartTime";

describe('作業開始時間テスト', () => {

    describe('timestampの形式テスト', () => {
        describe('正常値', () => {
            test('とりあえず本日日付', () => {
                expect(() => {new WorkStartTime('2019-06-22 21:27:00')}).not.toThrow();
            });
            test('昨日の日付', () => {
                expect(() => {new WorkStartTime('2019-06-18 23:59:00')}).not.toThrow();
            });
            test('明日の日付', () => {
                expect(() => {new WorkStartTime('2019-06-20 00:00:00')}).not.toThrow();
            });
        });
        describe('異常値', () => {
            test('形式が違う 年が4桁ではない', () => {
                expect(() => {new WorkStartTime('201-06-19 00:00:00')}).toThrow();
            });
            test('形式が違う 月が2桁ではない', () => {
                expect(() => {new WorkStartTime('2019-6-19 00:00:00')}).toThrow();
            });
            test('形式が違う 日が2桁ではない', () => {
                expect(() => {new WorkStartTime('2019-6-19 00:00:00')}).toThrow();
            });
            test('形式が違う 時間が2桁ではない', () => {
                expect(() => {new WorkStartTime('2019-06-19 0:00:00')}).toThrow();
            });
            test('形式が違う 分が2桁ではない', () => {
                expect(() => {new WorkStartTime('2019-06-19 00:0:00')}).toThrow();
            });
            test('形式が違う 秒が2桁ではない', () => {
                expect(() => {new WorkStartTime('2019-06-19 00:00:0')}).toThrow();
            });
            test('形式が違う 年月日の区切りが-ではない', () => {
                expect(() => {new WorkStartTime('2019/06/19 00:00:00')}).toThrow();
            });
            test('形式が違う 時間の区切りが:ではない', () => {
                expect(() => {new WorkStartTime('2019-06-19 00-00-00')}).toThrow();
            });
            test('形式が違う 年月日と時間の間に空白スペースがない', () => {
                expect(() => {new WorkStartTime('2019-6-19T00:00:00')}).toThrow();
            });
        });
    });

    describe('日付の存在テスト', () => {
        describe('存在する日付', () => {
            test('普通の日付', () => {
                expect(() => {new WorkStartTime('2019-06-20 00:00:00')}).not.toThrow();
            });
            test('うるう年', () => {
                expect(() => {new WorkStartTime('2020-02-29 00:00:00')}).not.toThrow();
            });
        });
        describe('存在しない日付', () => {
            test('空文字', () => {
                expect(() => {new WorkStartTime('')}).toThrow();
            });
            test('年が0000年', () => {
                expect(() => {new WorkStartTime('0000-06-20 00:00:00')}).toThrow();
            });
            test('2月30日', () => {
                expect(() => {new WorkStartTime('2019-02-30 00:00:00')}).toThrow();
            });
            test('3月32日', () => {
                expect(() => {new WorkStartTime('2019-03-32 00:00:00')}).toThrow();
            });
            test('4月31日', () => {
                expect(() => {new WorkStartTime('2019-04-31 00:00:00')}).toThrow();
            });
            test('99:00:00', () => {
                expect(() => {new WorkStartTime('2019-06-22 99:00:00')}).toThrow();
            });
            test('00:99:00', () => {
                expect(() => {new WorkStartTime('2019-06-22 00:99:00')}).toThrow();
            });
            test('00:00:99', () => {
                expect(() => {new WorkStartTime('2019-06-22 00:00:99')}).toThrow();
            });
        });
    });

    describe('日付の範囲テスト', () => {
        describe('正常値', () => {
            test('1900', () => {
                expect(() => {new WorkStartTime('1900-06-19 00:00:00')}).not.toThrow();
            });
            test('1999', () => {
                expect(() => {new WorkStartTime('1900-06-19 00:00:00')}).not.toThrow();
            });
            test('2000', () => {
                expect(() => {new WorkStartTime('2000-06-19 00:00:00')}).not.toThrow();
            });
            test('2019', () => {
                expect(() => {new WorkStartTime('2019-06-19 00:00:00')}).not.toThrow();
            });
            test('2099', () => {
                expect(() => {new WorkStartTime('2099-06-19 00:00:00')}).not.toThrow();
            });
            test('2999', () => {
                expect(() => {new WorkStartTime('2999-06-19 00:00:00')}).not.toThrow();
            });
        });
        describe('異常値', () => {
            test('1899', () => {
                expect(() => {new WorkStartTime('1899-06-19 00:00:00')}).toThrow();
            });
            test('3000', () => {
                expect(() => {new WorkStartTime('3000-06-19 00:00:00')}).toThrow();
            });
        });
    });

    describe('nullやundefinedが渡った時のテスト', () => {
        test('null', () => {
            expect(() => {new WorkStartTime(null)}).toThrow();
        });
        test('undefined', () => {
            expect(() => {new WorkStartTime(undefined)}).toThrow();
        });
    });
});