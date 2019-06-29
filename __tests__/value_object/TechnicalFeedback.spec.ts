import { TechnicalFeedback } from "../../src/value_object/Feedback/TechnicalFeedback";

describe('フィードバックテスト', () => {
    describe('改行コードは禁則文字に引っかからないテスト', () => {
        describe('正常', () => {
            test('CRLF', () => {
                expect(() => {new TechnicalFeedback('hoge\r\nhoge')}).not.toThrow();
            });
            test('CR', () => {
                expect(() => {new TechnicalFeedback('hoge\rhoge')}).not.toThrow();
            });
            test('LF', () => {
                expect(() => {new TechnicalFeedback('hoge\nhoge')}).not.toThrow();
            });
        });
        describe('これは引っかかる', () => {
            test('バックスラッシュ', () => {
                expect(() => {new TechnicalFeedback('hoge\\hoge')}).toThrow();
            });
            test('バックスラッシュ2つのあとにn', () => {
                expect(() => {new TechnicalFeedback('hoge\\nhoge')}).toThrow();
            });
            test('エスケープバックスラッシュのあとに改行コード', () => {
                expect(() => {new TechnicalFeedback('hoge\\\nhoge')}).toThrow();
            });
        });
    });
    describe('nullまたはundefined', () => {
        test('null', () => {
            expect(new TechnicalFeedback(null).value).toBe('');
        });
        test('undefined', () => {
            expect(new TechnicalFeedback(undefined).value).toBe('');
        });
        test('文字あり', () => {
            expect(new TechnicalFeedback('フィードバックです').value).toBe('フィードバックです');
        });
    });
});