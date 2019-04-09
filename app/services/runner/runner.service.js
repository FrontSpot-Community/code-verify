import fetch from 'node-fetch';

import config from '../../configuration';
import {languages, runners, testFrameworks} from './runner.constants';


class Runner {
    constructor() {
        const codeRunner = config.get('codeRunner');
        const {baseUrl, endpoints} = codeRunner;
        this.runnerUrl = `${baseUrl}/${endpoints.run}`;
    }

    isLanguageExist(language) {
        const languagesList = Object.values(languages);
        return languagesList.some((lang) => lang === language);
    }

    async sendTask({language, code, tests}) {
        if (!this.isLanguageExist(language)) {
            return Promise.reject('Language not supported');
        }

        const body = {
            runner: runners[language],
            language,
            code,
            fixture: tests,
            testFramework: testFrameworks[language],
            ...(language === 'javascript' ? {languageVersion: '8.x/babel'} : {})
        };

        try {
            const result = await fetch(this.runnerUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            return await result.json();
        } catch (err) {
            return Promise.reject(err);
        }
    }
}

export default Runner;
