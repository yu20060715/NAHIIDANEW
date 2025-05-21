import { Cron } from 'croner';
import { sendFlirt, greetTimeJobs } from '../libs/schedulerHelper.js';
import { checkUnseen } from '../libs/unseenChecker.js';

// 定時撒嬌：每整點
Cron('0 * * * *', sendFlirt);

// 週一至週五 9-16 點，每 10 分鐘撒嬌
Cron('*/10 9-16 * * 1-5', sendFlirt);

// 餐點 & 宵夜提醒
Cron('0 8 * * *', greetTimeJobs);
Cron('0 12 * * *', greetTimeJobs);
Cron('0 18 * * *', greetTimeJobs);
Cron('30 21 * * *', greetTimeJobs);
Cron('0 1 * * *', greetTimeJobs);

// 未讀訊息檢查：每 30 分鐘
Cron('*/30 * * * *', () => checkUnseen());
