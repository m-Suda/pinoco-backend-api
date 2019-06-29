import { TraineeEndDate } from "../../src/value_object/Trainee/TraineeEndDate";

describe('研修終了日テスト', () => {

    describe('timestampの形式テスト', () => {
        describe('正常値', () => {
            test('とりあえず本日日付', () => {
                expect(() => {new TraineeEndDate('2019-06-19 23:59:59')}).not.toThrow();
            });
            test('昨日の日付', () => {
                expect(() => {new TraineeEndDate('2019-06-18 23:59:59')}).not.toThrow();
            });
            test('明日の日付', () => {
                expect(() => {new TraineeEndDate('2019-06-20 23:59:59')}).not.toThrow();
            });
        });
        describe('異常値', () => {
            test('形式が違う 年が4桁ではない', () => {
                expect(() => {new TraineeEndDate('201-06-19 23:59:59')}).toThrow();
            });
            test('形式が違う 月が2桁ではない', () => {
                expect(() => {new TraineeEndDate('2019-6-19 23:59:59')}).toThrow();
            });
            test('形式が違う 日が2桁ではない', () => {
                expect(() => {new TraineeEndDate('2019-6-19 23:59:59')}).toThrow();
            });
            test('形式が違う 時間が2桁ではない', () => {
                expect(() => {new TraineeEndDate('2019-06-19 0:00:00')}).toThrow();
            });
            test('形式が違う 分が2桁ではない', () => {
                expect(() => {new TraineeEndDate('2019-06-19 00:0:00')}).toThrow();
            });
            test('形式が違う 秒が2桁ではない', () => {
                expect(() => {new TraineeEndDate('2019-06-19 00:00:0')}).toThrow();
            });
            test('形式が違う 年月日の区切りが-ではない', () => {
                expect(() => {new TraineeEndDate('2019/06/19 23:59:59')}).toThrow();
            });
            test('形式が違う 時間の区切りが:ではない', () => {
                expect(() => {new TraineeEndDate('2019-06-19 00-00-00')}).toThrow();
            });
            test('形式が違う 年月日と時間の間に空白スペースがない', () => {
                expect(() => {new TraineeEndDate('2019-6-19T23:59:59')}).toThrow();
            });
            test('時間が23:59:59ではない。※End dateのため', () => {
                expect(() => {new TraineeEndDate('2019-06-19 12:34:56')}).toThrow();
            });
        });
    });

    describe('日付の存在テスト', () => {
        describe('存在する日付', () => {
            test('普通の日付', () => {
                expect(() => {new TraineeEndDate('2019-06-20 23:59:59')}).not.toThrow();
            });
            test('うるう年', () => {
                expect(() => {new TraineeEndDate('2020-02-29 23:59:59')}).not.toThrow();
            });
        });
        describe('存在しない日付', () => {
            test('空文字', () => {
                expect(() => {new TraineeEndDate('')}).toThrow();
            });
            test('年が0000年', () => {
                expect(() => {new TraineeEndDate('0000-06-20 23:59:59')}).toThrow();
            });
            test('2月30日', () => {
                expect(() => {new TraineeEndDate('2019-02-30 23:59:59')}).toThrow();
            });
            test('3月32日', () => {
                expect(() => {new TraineeEndDate('2019-03-32 23:59:59')}).toThrow();
            });
            test('4月31日', () => {
                expect(() => {new TraineeEndDate('2019-04-31 23:59:59')}).toThrow();
            });
        });
    });

    describe('日付の範囲テスト', () => {
        describe('正常値', () => {
            test('1900', () => {
                expect(() => {new TraineeEndDate('1900-06-19 23:59:59')}).not.toThrow();
            });
            test('1999', () => {
                expect(() => {new TraineeEndDate('1900-06-19 23:59:59')}).not.toThrow();
            });
            test('2000', () => {
                expect(() => {new TraineeEndDate('2000-06-19 23:59:59')}).not.toThrow();
            });
            test('2019', () => {
                expect(() => {new TraineeEndDate('2019-06-19 23:59:59')}).not.toThrow();
            });
            test('2099', () => {
                expect(() => {new TraineeEndDate('2099-06-19 23:59:59')}).not.toThrow();
            });
            test('2999', () => {
                expect(() => {new TraineeEndDate('2999-06-19 23:59:59')}).not.toThrow();
            });
        });
        describe('異常値', () => {
            test('1899', () => {
                expect(() => {new TraineeEndDate('1899-06-19 23:59:59')}).toThrow();
            });
            test('3000', () => {
                expect(() => {new TraineeEndDate('3000-06-19 23:59:59')}).toThrow();
            });
        });
    });

    describe('nullやundefinedが渡った時のテスト', () => {
        test('null', () => {
            expect(() => {new TraineeEndDate(null)}).toThrow();
        });
        test('undefined', () => {
            expect(() => {new TraineeEndDate(undefined)}).toThrow();
        });
    });
});