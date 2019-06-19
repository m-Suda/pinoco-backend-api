import { TraineeName } from "../../src/value_object/TraineeName";

describe('ユーザー名オブジェクトテスト', () => {

    describe('文字数テスト', () => {
        describe('正常', () => {
            test('普通の名前', () => {
                expect(() => {
                    new TraineeName('名無し 太郎さん');
                }).not.toThrow();
            });
            test('境界値正常 半角', () => {
                expect(() => {
                    new TraineeName('hannkakuhannkakuhannkakuhannkakuhannkakuhannkakuhannkakuhannkaku');
                }).not.toThrow();
            });
            test('境界値正常 全角', () => {
                expect(() => {
                    new TraineeName('全角さん全角さん全角さん全角さん全角さん全角さん全角さん全角さん全角さん全角さん全角さん全角さん全角さん全角さん全角さん全角さん');
                }).not.toThrow();
            });
            test('空文字', () => {
                expect(() => {
                    new TraineeName('');
                }).not.toThrow();
            });
            test('undefined', () => {
                expect(() => {
                    new TraineeName(undefined);
                }).not.toThrow();
            });
            test('null', () => {
                expect(() => {
                    new TraineeName(null);
                }).not.toThrow();
            });
        });
        describe('異常', () => {
            test('文字数オーバー 半角', () => {
                expect(() => {
                    new TraineeName('hankakusanhankakusanhankakusanhankakusanhankakusanhankakusanhanka');
                }).toThrow();
            });
            test('文字数オーバー 全角', () => {
                expect(() => {
                    new TraineeName('文字数超えさん文字数超えさん文字数超えさん文字数超えさん文字数超えさん文字数超えさん文字数超えさん文字数超えさん文字数超えさん文字');
                }).toThrow();
            });
        });
    });

    describe('禁則文字テスト', () => {
        describe('正常', () => {
           test('普通の名前', () => {
              expect(() => {
                  new TraineeName('ほげ ほげ太郎');
              }).not.toThrow();
           });
           test('アンスコ付いた名前', () => {
              expect(() => {
                  new TraineeName('Albert_Wesker');
              }).not.toThrow();
           });
           test('ハイフン付いた名前', () => {
              expect(() => {
                  new TraineeName('Albert-Wesker');
              }).not.toThrow();
           });
           test('ビックリマーク付いた名前', () => {
              expect(() => {
                  new TraineeName('AlbertWesker!');
              }).not.toThrow();
           });
           test('はてなマーク付いた名前', () => {
              expect(() => {
                  new TraineeName('AlbertWesker?');
              }).not.toThrow();
           });
           test('大文字の禁則文字', () => {
              expect(() => {
                  new TraineeName('＜＞”￥’＆｜％');
              }).not.toThrow();
           });
        });
        describe('異常', () => {
            describe('大なり', () => {
                test('先頭', () => {
                    expect(() => {
                        new TraineeName('>AlbertWesker');
                    }).toThrow();
                });
                test('中間', () => {
                    expect(() => {
                        new TraineeName('Albert>Wesker');
                    }).toThrow();
                });
                test('末尾', () => {
                    expect(() => {
                        new TraineeName('AlbertWesker>');
                    }).toThrow();
                });
                test('複数', () => {
                    expect(() => {
                        new TraineeName('>Albert>Wesker>');
                    }).toThrow();
                });
            });
            describe('小なり', () => {
                test('先頭', () => {
                    expect(() => {
                        new TraineeName('<AlbertWesker');
                    }).toThrow();
                });
                test('中間', () => {
                    expect(() => {
                        new TraineeName('Albert<Wesker');
                    }).toThrow();
                });
                test('末尾', () => {
                    expect(() => {
                        new TraineeName('AlbertWesker<');
                    }).toThrow();
                });
                test('複数', () => {
                    expect(() => {
                        new TraineeName('<Albert<Wesker<');
                    }).toThrow();
                });
            });
            describe('ダブルクォーテーション', () => {
                test('先頭', () => {
                    expect(() => {
                        new TraineeName('"AlbertWesker');
                    }).toThrow();
                });
                test('中間', () => {
                    expect(() => {
                        new TraineeName('Albert"Wesker');
                    }).toThrow();
                });
                test('末尾', () => {
                    expect(() => {
                        new TraineeName('AlbertWesker"');
                    }).toThrow();
                });
                test('複数', () => {
                    expect(() => {
                        new TraineeName('"Albert"Wesker"');
                    }).toThrow();
                });
            });
            describe('バックスラッシュ', () => {
                test('先頭', () => {
                    expect(() => {
                        new TraineeName('\\AlbertWesker');
                    }).toThrow();
                });
                test('中間', () => {
                    expect(() => {
                        new TraineeName('Albert\\Wesker');
                    }).toThrow();
                });
                test('末尾', () => {
                    expect(() => {
                        new TraineeName('AlbertWesker\\');
                    }).toThrow();
                });
                test('複数', () => {
                    expect(() => {
                        new TraineeName('\\Albert\\Wesker\\');
                    }).toThrow();
                });
            });
            describe('シングルクォーテーション', () => {
                test('先頭', () => {
                    expect(() => {
                        new TraineeName('\'AlbertWesker');
                    }).toThrow();
                });
                test('中間', () => {
                    expect(() => {
                        new TraineeName('Albert\'Wesker');
                    }).toThrow();
                });
                test('末尾', () => {
                    expect(() => {
                        new TraineeName('AlbertWesker\'');
                    }).toThrow();
                });
                test('複数', () => {
                    expect(() => {
                        new TraineeName('\'Albert\'Wesker\'');
                    }).toThrow();
                });
            });
            describe('アンパサンド', () => {
                test('先頭', () => {
                    expect(() => {
                        new TraineeName('&AlbertWesker');
                    }).toThrow();
                });
                test('中間', () => {
                    expect(() => {
                        new TraineeName('Albert&Wesker');
                    }).toThrow();
                });
                test('末尾', () => {
                    expect(() => {
                        new TraineeName('AlbertWesker&');
                    }).toThrow();
                });
                test('複数', () => {
                    expect(() => {
                        new TraineeName('&Albert&Wesker&');
                    }).toThrow();
                });
            });
            describe('パイプ', () => {
                test('先頭', () => {
                    expect(() => {
                        new TraineeName('|AlbertWesker');
                    }).toThrow();
                });
                test('中間', () => {
                    expect(() => {
                        new TraineeName('Albert|Wesker');
                    }).toThrow();
                });
                test('末尾', () => {
                    expect(() => {
                        new TraineeName('AlbertWesker|');
                    }).toThrow();
                });
                test('複数', () => {
                    expect(() => {
                        new TraineeName('|Albert|Wesker|');
                    }).toThrow();
                });
            });
            describe('パーセント', () => {
                test('先頭', () => {
                    expect(() => {
                        new TraineeName('%AlbertWesker');
                    }).toThrow();
                });
                test('中間', () => {
                    expect(() => {
                        new TraineeName('Albert%Wesker');
                    }).toThrow();
                });
                test('末尾', () => {
                    expect(() => {
                        new TraineeName('AlbertWesker%');
                    }).toThrow();
                });
                test('複数', () => {
                    expect(() => {
                        new TraineeName('%Albert%Wesker%');
                    }).toThrow();
                });
            });
        });
    });

});