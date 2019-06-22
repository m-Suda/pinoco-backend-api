import { BaseValueObject } from "../../src/value_object/BaseValueObject";

// 形式テストはサブクラスで行っているのでここではやらない。(あとテスト数が多くなる。)
// protectedメソッドなので、(new Class() as any)にしている。
describe('BaseValueObjectテスト', () => {
    describe('禁則文字テスト', () => {
        describe('半角禁則文字', () => {
            describe('単体', () => {
                test('大なり', () => {
                    expect((new BaseValueObject() as any).isIncludedIllegalCharacter('<hoge')).toBeTruthy();
                });
                test('小なり', () => {
                    expect((new BaseValueObject() as any).isIncludedIllegalCharacter('>hoge')).toBeTruthy();
                });
                test('ダブルクォーテーション', () => {
                    expect((new BaseValueObject() as any).isIncludedIllegalCharacter('"hoge')).toBeTruthy();
                });
                test('シングルクォーテーション', () => {
                    expect((new BaseValueObject() as any).isIncludedIllegalCharacter('\'hoge')).toBeTruthy();
                });
                test('アンパサンド', () => {
                    expect((new BaseValueObject() as any).isIncludedIllegalCharacter('&hoge')).toBeTruthy();
                });
                test('パイプ', () => {
                    expect((new BaseValueObject() as any).isIncludedIllegalCharacter('|hoge')).toBeTruthy();
                });
                test('パーセント', () => {
                    expect((new BaseValueObject() as any).isIncludedIllegalCharacter('%hoge')).toBeTruthy();
                });
                test('バックスラッシュ', () => {
                    expect((new BaseValueObject() as any).isIncludedIllegalCharacter('\\hoge')).toBeTruthy();
                });
            });
            describe('位置', () => {
                test('先頭', () => {
                    expect((new BaseValueObject() as any).isIncludedIllegalCharacter('<hoge')).toBeTruthy();
                });
                test('中間', () => {
                    expect((new BaseValueObject() as any).isIncludedIllegalCharacter('ho<ge')).toBeTruthy();
                });
                test('末尾', () => {
                    expect((new BaseValueObject() as any).isIncludedIllegalCharacter('hoge<')).toBeTruthy();
                });
            });
            describe('複数', () => {
                test('複数検知', () => {
                    expect((new BaseValueObject() as any).isIncludedIllegalCharacter('<ho&ge|')).toBeTruthy();
                });
            });
        });
        describe('全角禁則文字', () => {
            test('大なり', () => {
                expect((new BaseValueObject() as any).isIncludedIllegalCharacter('＜hoge')).toBeFalsy();
            });
            test('小なり', () => {
                expect((new BaseValueObject() as any).isIncludedIllegalCharacter('＞hoge')).toBeFalsy();
            });
            test('ダブルクォーテーション', () => {
                expect((new BaseValueObject() as any).isIncludedIllegalCharacter('”hoge')).toBeFalsy();
            });
            test('シングルクォーテーション', () => {
                expect((new BaseValueObject() as any).isIncludedIllegalCharacter('’hoge')).toBeFalsy();
            });
            test('アンパサンド', () => {
                expect((new BaseValueObject() as any).isIncludedIllegalCharacter('＆hoge')).toBeFalsy();
            });
            test('パイプ', () => {
                expect((new BaseValueObject() as any).isIncludedIllegalCharacter('｜hoge')).toBeFalsy();
            });
            test('パーセント', () => {
                expect((new BaseValueObject() as any).isIncludedIllegalCharacter('％hoge')).toBeFalsy();
            });
            test('バックスラッシュ', () => {
                expect((new BaseValueObject() as any).isIncludedIllegalCharacter('￥hoge')).toBeFalsy();
            });
        });
    });
    describe('半角または全角スペースのみかテスト', () => {
        describe('文字列', () => {
            test('文字列のみ', () => {
                expect((new BaseValueObject() as any).isHalfWidthSpaceOrFullWidthSpaceOnly('hoge')).toBeFalsy();
            });
            test('先頭に半角スペースありの文字列', () => {
                expect((new BaseValueObject() as any).isHalfWidthSpaceOrFullWidthSpaceOnly(' hoge')).toBeFalsy();
            });
            test('先頭に全角スペースありの文字列', () => {
                expect((new BaseValueObject() as any).isHalfWidthSpaceOrFullWidthSpaceOnly('　hoge')).toBeFalsy();
            });
            test('中間に半角スペースありの文字列', () => {
                expect((new BaseValueObject() as any).isHalfWidthSpaceOrFullWidthSpaceOnly('ho ge')).toBeFalsy();
            });
            test('中間に全角スペースありの文字列', () => {
                expect((new BaseValueObject() as any).isHalfWidthSpaceOrFullWidthSpaceOnly('ho　ge')).toBeFalsy();
            });
            test('末尾に半角スペースありの文字列', () => {
                expect((new BaseValueObject() as any).isHalfWidthSpaceOrFullWidthSpaceOnly('hoge ')).toBeFalsy();
            });
            test('末尾に全角スペースありの文字列', () => {
                expect((new BaseValueObject() as any).isHalfWidthSpaceOrFullWidthSpaceOnly('hoge　')).toBeFalsy();
            });
            test('半角スペースが複数ある文字列', () => {
                expect((new BaseValueObject() as any).isHalfWidthSpaceOrFullWidthSpaceOnly(' ho ge ')).toBeFalsy();
            });
            test('全角スペースが複数ある文字列', () => {
                expect((new BaseValueObject() as any).isHalfWidthSpaceOrFullWidthSpaceOnly('　ho　ge　')).toBeFalsy();
            });
        });
        describe('半角スペースのみ', () => {
            test('単体', () => {
                expect((new BaseValueObject() as any).isHalfWidthSpaceOrFullWidthSpaceOnly(' ')).toBeTruthy();
            });
            test('複数', () => {
                expect((new BaseValueObject() as any).isHalfWidthSpaceOrFullWidthSpaceOnly('  ')).toBeTruthy();
            });
        });
        describe('全角スペースのみ', () => {
            test('単体', () => {
                expect((new BaseValueObject() as any).isHalfWidthSpaceOrFullWidthSpaceOnly('　')).toBeTruthy();
            });
            test('複数', () => {
                expect((new BaseValueObject() as any).isHalfWidthSpaceOrFullWidthSpaceOnly('　　')).toBeTruthy();
            });
        });
        describe('半角または全角スペースのみ', () => {
            test('２つの組み合わせ', () => {
                expect((new BaseValueObject() as any).isHalfWidthSpaceOrFullWidthSpaceOnly(' 　 　')).toBeTruthy();
            });
            test('タブ', () => {
                expect((new BaseValueObject() as any).isHalfWidthSpaceOrFullWidthSpaceOnly('    ')).toBeTruthy();
            });
        });
    });
    describe('文字列の長さテスト', () => {
        describe('正常', () => {
            test('半角', () => {
                expect((new BaseValueObject() as any).isExceededDefaultLength('aiueoaiueo', 10)).toBeFalsy();
            });
            test('全角', () => {
                expect((new BaseValueObject() as any).isExceededDefaultLength('あいうえおかきくけこ', 10)).toBeFalsy();
            });
        });
        describe('異常', () => {
            test('半角', () => {
                expect((new BaseValueObject() as any).isExceededDefaultLength('aiueoaiueoa', 10)).toBeTruthy();
            });
            test('全角', () => {
                expect((new BaseValueObject() as any).isExceededDefaultLength('あいうえおかきくけこか', 10)).toBeTruthy();
            });
        });
    });
});