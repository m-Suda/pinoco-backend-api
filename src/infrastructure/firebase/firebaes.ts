import * as firebase from 'firebase';
import * as admin from 'firebase-admin';

const config = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTH_ADMIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
};
firebase.initializeApp(config);

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_MAIL,
        privateKey: process.env.FIREBASE_ADMIN_PROJECT_KEY!.replace(/\\n/g, '\n'),
    }),
});

/**
 * リクエストヘッダーのAuthenticationトークンを検証する。
 * @param req
 * @param res
 * @param next
 */
export function verifyIdToken(req, res, next) {
    console.log('リクエストの検証');
    if (typeof req.get('Authorization') === 'undefined') {
        console.log('検証失敗: ID Tokenが無い');
        next({
            status: 403,
            message: 'No IdToken'
        });
        return;
    }
    admin.auth().verifyIdToken(req.get('Authorization'))
        .then(() => {
            console.log('検証成功');
            next();
        })
        .catch(err => {
            console.error(err);
            next({
                status: 403,
                message: 'UnAuthorization!'
            });
        });
}

/**
 * IdTokenをデコードしてuidを取得する。
 * @param req
 */
export async function decodeIdToken(req): Promise<string | any> {
    if (typeof req.get('Authorization') === 'undefined') {
        console.error('IdTokenが無い');
        throw new Error();
    }
    return await admin.auth().verifyIdToken(req.get('Authorization'))
        .then(decodeToken => {
            return decodeToken.uid;
        })
        .catch(err => {
            console.error(`@@@ Tokenのデコードでエラー : ${err}`);
            throw new Error(err);
        });
}

/**
 * Firebase上のユーザーを削除する。
 * @param uid
 */
export async function deleteUser(uid: string): Promise<any> {
    if (uid === '' || typeof uid === 'undefined' || uid === null) {
        console.error('削除対象のuidが無い');
        throw new Error('Firebaseのユーザー削除に失敗');
    }

    return await admin.auth().deleteUser(uid)
        .then(() => {
            console.log('Firebaseのユーザー削除に成功');
        })
        .catch(error => {
            console.error(error);
            throw new Error(error);
        })
}