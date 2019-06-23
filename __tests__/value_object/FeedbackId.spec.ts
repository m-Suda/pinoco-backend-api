import { FeedbackId } from "../../src/value_object/FeedbackId";

describe('フィードバックIDテスト', () => {
    describe('年月日クラスの初期化テスト', () => {
        describe('正常値', () => {
            test('', () => {
                expect(() => {new FeedbackId('201906-01')}).not.toThrow();
            });
        });
        describe('異常値', () => {
            test('形式が違う 年が4桁ではない', () => {
                expect(() => {new FeedbackId('20106-01')}).toThrow();
            });
            test('形式が違う 週が2桁ではない', () => {
                expect(() => {new FeedbackId('201906-1')}).toThrow();
            });
            test('形式が違う 区切りが-ではない', () => {
                expect(() => {new FeedbackId('201906/19')}).toThrow();
            });
            test('形式が違う', () => {
                expect(() => {new FeedbackId('ほげほげ！')}).toThrow();
            });
        });
    });

    describe('nullやundefinedが渡った時のテスト', () => {
        test('null', () => {
            expect(() => {new FeedbackId(null)}).toThrow();
        });
        test('undefined', () => {
            expect(() => {new FeedbackId(undefined)}).toThrow();
        });
    });
});