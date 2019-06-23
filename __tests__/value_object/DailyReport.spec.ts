import { DailyReport } from "../../src/value_object/DailyReport";

describe('日報テスト', () => {
    describe('改行コードは禁則文字に引っかからないテスト', () => {
        describe('正常', () => {
            test('CRLF', () => {
                expect(() => {new DailyReport('hoge\r\nhoge')}).not.toThrow();
            });
            test('CR', () => {
                expect(() => {new DailyReport('hoge\rhoge')}).not.toThrow();
            });
            test('LF', () => {
                expect(() => {new DailyReport('hoge\nhoge')}).not.toThrow();
            });
        });
        describe('これは引っかかる', () => {
            test('バックスラッシュ', () => {
                expect(() => {new DailyReport('hoge\\hoge')}).toThrow();
            });
            test('バックスラッシュ2つのあとにn', () => {
                expect(() => {new DailyReport('hoge\\nhoge')}).toThrow();
            });
            test('エスケープバックスラッシュのあとに改行コード', () => {
                expect(() => {new DailyReport('hoge\\\nhoge')}).toThrow();
            });
        });
    });
    describe('nullまたはundefined', () => {
        test('null', () => {
            expect(new DailyReport(null).value).toBe('');
        });
        test('undefined', () => {
            expect(new DailyReport(undefined).value).toBe('');
        });
        test('文字あり', () => {
            expect(new DailyReport('日報です').value).toBe('日報です');
        });
    });
});