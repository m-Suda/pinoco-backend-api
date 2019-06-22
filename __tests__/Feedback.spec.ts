import * as moment from 'moment';
import {Postgres} from "../src/database/Postgres";

test('週の取得 うるう年ではない 1', () => {
    expect(() => {
        const week = moment('2019-12-28 00:00:00').week();
        console.log(week);
    }).not.toThrow();
});

test('週の取得 うるう年ではない 2', () => {
    expect(() => {
        const week = moment('2019-12-29 00:00:00').week();
        console.log(week);
    }).not.toThrow();
});

test('週の取得 うるう年 1', () => {
    expect(() => {
        const week = moment('2020-12-26 00:00:00').week();
        console.log(week);
    }).not.toThrow();
});

test('週の取得 うるう年 2', () => {
    expect(() => {
        const week = moment('2020-12-27 00:00:00').week();
        console.log(week);
    }).not.toThrow();
});

test('タイムスタンプ', () => {
    expect(() => {
        const timestamp = moment();
        console.log(timestamp);
    }).not.toThrow();
});

// postgresのtimestampはこれで行ける
test('postgres moment insert', async () => {
    const db = Postgres.instance;
    await db.connect();
    const sql = `
        INSERT INTO 
          mst_trainee(
            trainee_id, trainee_name, assigned_instructor_id, trainee_start_date, trainee_end_date, company_id            
          )
        VALUES (
          $1, $2, $3, $4, $5, $6        
        );
    `;
    const startDate = moment('2019-06-19 00:00:00').format('YYYY-MM-DD HH:mm:ss');
    console.log(startDate);
    const endDate = moment('2019-09-19 23:59:59').format('YYYY-MM-DD HH:mm:ss');
    console.log(endDate);
    const params = [
        'traineeId',
        '名無し 太郎',
        'adminId',
        startDate,
        endDate,
        'jobsupport'
    ];
    try {
        await db.execute(sql, params);
        console.log('成功');
    } catch (e) {
        console.error(e);
    }
});
