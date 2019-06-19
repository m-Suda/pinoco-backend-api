import { CompanyId } from "../../src/value_object/CompanyId";

describe('企業IDテスト', () => {

    describe('文字数テスト', () => {
        describe('正常', () => {
            test('境界値 24文字', () => {
                expect(() => {new CompanyId('companyIdcompanyIdcompan');}).not.toThrow();
            });
        });
        describe('異常', () => {
            test('境界値 25文字', () => {
                expect(() => {new CompanyId('companyIdcompanyIdcompany');}).toThrow();
            });
        });
    });

    describe('必須テスト', () => {
        describe('正常', () => {
            test('成功', () => {
                expect(() => {new CompanyId('company-id');}).not.toThrow();
            });
        });
        describe('異常', () => {
            test('空文字', () => {
                expect(() => {new CompanyId('');}).toThrow();
            });
            test('半角スペースのみ', () => {
                expect(() => {new CompanyId(' ');}).toThrow();
            });
            test('全角スペースのみ', () => {
                expect(() => {new CompanyId('　');}).toThrow();
            });
            test('null', () => {
                expect(() => {new CompanyId(null);}).toThrow();
            });
            test('undefined', () => {
                expect(() => {new CompanyId(undefined);}).toThrow();
            });
        });
    });

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
});