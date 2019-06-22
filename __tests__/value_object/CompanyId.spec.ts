import { CompanyId } from "../../src/value_object/CompanyId";

describe('企業IDテスト', () => {

    describe('英数字一部記号テスト', () => {
        describe('正常', () => {
            test('英数字のみ使われている', () => {
                expect(() => {new CompanyId('company001');}).not.toThrow();
            });
            test('英数字とハイフンが使われている', () => {
                expect(() => {new CompanyId('company-001');}).not.toThrow();
            });
            test('英数字とアンダースコアが使われている', () => {
                expect(() => {new CompanyId('company_001');}).not.toThrow();
            });
        });
        describe('異常', () => {
            test('全角日本語が使われている', () => {
                expect(() => {new CompanyId('企業あいでぃー');}).toThrow();
            });
            test('半角カタカナが使われている', () => {
                expect(() => {new CompanyId('ｷｷﾞｮｳｱｲﾃﾞｨ');}).toThrow();
            });
            test('全角禁則文字が使われている', () => {
                expect(() => {new CompanyId('＜＞／￥”’％＆｜');}).toThrow();
            });
            test('半角禁則文字が使われている', () => {
                expect(() => {new CompanyId('<>/\\"\'%&|');}).toThrow();
            });
        });
    });

    describe('インスタンス化テスト', () => {
       test('成功', () => {
           expect(() => {new CompanyId('company');}).not.toThrow();
       });
       test('失敗', () => {
           expect(() => {new CompanyId('');}).toThrow();
       });
    });
});