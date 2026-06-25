import { APIRequestContext, test as base, request } from '@playwright/test';
import { getValidToken } from '../utils/auth';
import PomManager from '../pages/manage/managePage';
import ManageApi from '../API/api-helpers/manage/manageApi';
import * as dotenv from 'dotenv';

const envFile = process.env.ENV_FILE === 'prod'
    ? './src/config/.env.prod'
    : './src/config/.env';
dotenv.config({ path: envFile});

type MyFixtures = {
    pom: PomManager;
    manageApi: ManageApi;
};

export const test = base.extend<MyFixtures>({
    pom: async ({ page }, use) => {
        const pom = new PomManager(page);
        await use(pom);
    },
    manageApi: async ({ request }, use) => {
        const token = await getValidToken(); // ← fetch once
        await use(new ManageApi(request, token)); // ← pass to ManageApi
    },
});

export { expect, Download } from '@playwright/test';
