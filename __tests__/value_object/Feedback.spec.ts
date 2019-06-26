import { Feedback } from "../../src/value_object/Feedback";

describe('フィードバックテスト', () => {
    describe('改行コードは禁則文字に引っかからないテスト', () => {
        describe('正常', () => {
            test('CRLF', () => {
                expect(() => {new Feedback('hoge\r\nhoge')}).not.toThrow();
            });
            test('CR', () => {
                expect(() => {new Feedback('hoge\rhoge')}).not.toThrow();
            });
            test('LF', () => {
                expect(() => {new Feedback('hoge\nhoge')}).not.toThrow();
            });
        });
        describe('これは引っかかる', () => {
            test('バックスラッシュ', () => {
                expect(() => {new Feedback('hoge\\hoge')}).toThrow();
            });
            test('バックスラッシュ2つのあとにn', () => {
                expect(() => {new Feedback('hoge\\nhoge')}).toThrow();
            });
            test('エスケープバックスラッシュのあとに改行コード', () => {
                expect(() => {new Feedback('hoge\\\nhoge')}).toThrow();
            });
        });
    });
    describe('nullまたはundefined', () => {
        test('null', () => {
            expect(new Feedback(null).value).toBe('');
        });
        test('undefined', () => {
            expect(new Feedback(undefined).value).toBe('');
        });
        test('文字あり', () => {
            expect(new Feedback('フィードバックです').value).toBe('フィードバックです');
        });
    });
});