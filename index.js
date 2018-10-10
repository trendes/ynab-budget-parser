'use strict';

const request = require('./request');
const process = require('process');

const apiToken = process.argv[2];

if (apiToken === undefined) {
    process.exit();
}

const baseUrl = 'https://api.youneedabudget.com/v1/';
const budgetsUrl = 'https://api.youneedabudget.com/v1/budgets';
const accountsUrl = 'https://api.youneedabudget.com/v1/accounts';
const userUrl = 'https://api.youneedabudget.com/v1/user';
const tokenParam = `?access_token=${apiToken}`;

const budgets = baseUrl + 'budgets' + tokenParam;

console.log(budgets);

request.get(budgets)
    .then((response) => {
        const responseObject = JSON.parse(response);

        if (responseObject.data && responseObject.data.budgets && responseObject.data.budgets[0]) {
            const budgetId = responseObject.data.budgets[0].id;
            let budgetCategoriesUrl = `${baseUrl}/budgets/${budgetId}/categories` + tokenParam;

            request.get(budgetCategoriesUrl)
                .then((response) => {
                    const responseObject = JSON.parse(response);
                    console.log('RESPONSE', JSON.stringify(responseObject, null, 2));
                })
                .catch((error) => {
                    console.log('ERROR', error);
                });
        }
        else {
            console.error("invalid response", response);
        }
    })
    .catch((error) => {
        console.log('ERROR', error);
    });