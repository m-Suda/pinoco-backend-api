import { UserName } from "../../src/value_object/UserName";

describe('ユーザー名オブジェクトテスト', () => {

    describe('文字数テスト', () => {
        describe('正常', () => {
            test('普通の名前', () => {
                expect(() => {
                    new UserName('名無し 太郎さん');
                }).not.toThrow();
            });
            test('境界値正常 半角', () => {
                expect(() => {
                    new UserName('hannkakuhannkakuhannkakuhannkakuhannkakuhannkakuhannkakuhannkaku');
                }).not.toThrow();
            });
            test('境界値正常 全角', () => {
                expect(() => {
                    new UserName('全角さん全角さん全角さん全角さん全角さん全角さん全角さん全角さん全角さん全角さん全角さん全角さん全角さん全角さん全角さん全角さん');
                }).not.toThrow();
            });
            test('空文字', () => {
                expect(() => {
                    new UserName('');
                }).not.toThrow();
            });
            test('undefined', () => {
                expect(() => {
                    new UserName(undefined);
                }).not.toThrow();
            });
            test('null', () => {
                expect(() => {
                    new UserName(null);
                }).not.toThrow();
            });
        });
        describe('異常', () => {
            test('文字数オーバー 半角', () => {
                expect(() => {
                    new UserName('hankakusanhankakusanhankakusanhankakusanhankakusanhankakusanhanka');
                }).toThrow();
            });
            test('文字数オーバー 全角', () => {
                expect(() => {
                    new UserName('文字数超えさん文字数超えさん文字数超えさん文字数超えさん文字数超えさん文字数超えさん文字数超えさん文字数超えさん文字数超えさん文字');
                }).toThrow();
            });
        });
    });

    describe('禁則文字テスト', () => {
        describe('正常', () => {
           test('普通の名前', () => {
              expect(() => {
                  new UserName('ほげ ほげ太郎');
              }).not.toThrow();
           });
           test('アンスコ付いた名前', () => {
              expect(() => {
                  new UserName('Albert_Wesker');
              }).not.toThrow();
           });
           test('ハイフン付いた名前', () => {
              expect(() => {
                  new UserName('Albert-Wesker');
              }).not.toThrow();
           });
           test('ビックリマーク付いた名前', () => {
              expect(() => {
                  new UserName('AlbertWesker!');
              }).not.toThrow();
           });
           test('はてなマーク付いた名前', () => {
              expect(() => {
                  new UserName('AlbertWesker?');
              }).not.toThrow();
           });
           test('大文字の禁則文字', () => {
              expect(() => {
                  new UserName('＜＞”￥’＆｜％');
              }).not.toThrow();
           });
        });
        describe('異常', () => {
            describe('大なり', () => {
                test('先頭', () => {
                    expect(() => {
                        new UserName('>AlbertWesker');
                    }).toThrow();
                });
                test('中間', () => {
                    expect(() => {
                        new UserName('Albert>Wesker');
                    }).toThrow();
                });
                test('末尾', () => {
                    expect(() => {
                        new UserName('AlbertWesker>');
                    }).toThrow();
                });
                test('複数', () => {
                    expect(() => {
                        new UserName('>Albert>Wesker>');
                    }).toThrow();
                });
            });
            describe('小なり', () => {
                test('先頭', () => {
                    expect(() => {
                        new UserName('<AlbertWesker');
                    }).toThrow();
                });
                test('中間', () => {
                    expect(() => {
                        new UserName('Albert<Wesker');
                    }).toThrow();
                });
                test('末尾', () => {
                    expect(() => {
                        new UserName('AlbertWesker<');
                    }).toThrow();
                });
                test('複数', () => {
                    expect(() => {
                        new UserName('<Albert<Wesker<');
                    }).toThrow();
                });
            });
            describe('ダブルクォーテーション', () => {
                test('先頭', () => {
                    expect(() => {
                        new UserName('"AlbertWesker');
                    }).toThrow();
                });
                test('中間', () => {
                    expect(() => {
                        new UserName('Albert"Wesker');
                    }).toThrow();
                });
                test('末尾', () => {
                    expect(() => {
                        new UserName('AlbertWesker"');
                    }).toThrow();
                });
                test('複数', () => {
                    expect(() => {
                        new UserName('"Albert"Wesker"');
                    }).toThrow();
                });
            });
            describe('バックスラッシュ', () => {
                test('先頭', () => {
                    expect(() => {
                        new UserName('\\AlbertWesker');
                    }).toThrow();
                });
                test('中間', () => {
                    expect(() => {
                        new UserName('Albert\\Wesker');
                    }).toThrow();
                });
                test('末尾', () => {
                    expect(() => {
                        new UserName('AlbertWesker\\');
                    }).toThrow();
                });
                test('複数', () => {
                    expect(() => {
                        new UserName('\\Albert\\Wesker\\');
                    }).toThrow();
                });
            });
            describe('シングルクォーテーション', () => {
                test('先頭', () => {
                    expect(() => {
                        new UserName('\'AlbertWesker');
                    }).toThrow();
                });
                test('中間', () => {
                    expect(() => {
                        new UserName('Albert\'Wesker');
                    }).toThrow();
                });
                test('末尾', () => {
                    expect(() => {
                        new UserName('AlbertWesker\'');
                    }).toThrow();
                });
                test('複数', () => {
                    expect(() => {
                        new UserName('\'Albert\'Wesker\'');
                    }).toThrow();
                });
            });
            describe('アンパサンド', () => {
                test('先頭', () => {
                    expect(() => {
                        new UserName('&AlbertWesker');
                    }).toThrow();
                });
                test('中間', () => {
                    expect(() => {
                        new UserName('Albert&Wesker');
                    }).toThrow();
                });
                test('末尾', () => {
                    expect(() => {
                        new UserName('AlbertWesker&');
                    }).toThrow();
                });
                test('複数', () => {
                    expect(() => {
                        new UserName('&Albert&Wesker&');
                    }).toThrow();
                });
            });
            describe('パイプ', () => {
                test('先頭', () => {
                    expect(() => {
                        new UserName('|AlbertWesker');
                    }).toThrow();
                });
                test('中間', () => {
                    expect(() => {
                        new UserName('Albert|Wesker');
                    }).toThrow();
                });
                test('末尾', () => {
                    expect(() => {
                        new UserName('AlbertWesker|');
                    }).toThrow();
                });
                test('複数', () => {
                    expect(() => {
                        new UserName('|Albert|Wesker|');
                    }).toThrow();
                });
            });
            describe('パーセント', () => {
                test('先頭', () => {
                    expect(() => {
                        new UserName('%AlbertWesker');
                    }).toThrow();
                });
                test('中間', () => {
                    expect(() => {
                        new UserName('Albert%Wesker');
                    }).toThrow();
                });
                test('末尾', () => {
                    expect(() => {
                        new UserName('AlbertWesker%');
                    }).toThrow();
                });
                test('複数', () => {
                    expect(() => {
                        new UserName('%Albert%Wesker%');
                    }).toThrow();
                });
            });
        });
    });

});