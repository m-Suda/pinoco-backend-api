import { Report } from "../../src/value_object/DailyReport/Report";

describe('日報テスト', () => {
    describe('改行コードは禁則文字に引っかからないテスト', () => {
        describe('正常', () => {
            test('CRLF', () => {
                expect(() => {new Report('hoge\r\nhoge')}).not.toThrow();
            });
            test('CR', () => {
                expect(() => {new Report('hoge\rhoge')}).not.toThrow();
            });
            test('LF', () => {
                expect(() => {new Report('hoge\nhoge')}).not.toThrow();
            });
        });
        describe('これは引っかかる', () => {
            test('バックスラッシュ', () => {
                expect(() => {new Report('hoge\\hoge')}).toThrow();
            });
            test('バックスラッシュ2つのあとにn', () => {
                expect(() => {new Report('hoge\\nhoge')}).toThrow();
            });
            test('エスケープバックスラッシュのあとに改行コード', () => {
                expect(() => {new Report('hoge\\\nhoge')}).toThrow();
            });
        });
    });
    describe('nullまたはundefined', () => {
        test('null', () => {
            expect(new Report(null).value).toBe('');
        });
        test('undefined', () => {
            expect(new Report(undefined).value).toBe('');
        });
        test('文字あり', () => {
            expect(new Report('日報です').value).toBe('日報です');
        });
    });
});