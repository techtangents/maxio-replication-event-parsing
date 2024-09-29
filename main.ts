import * as maxio from '@maxio-com/advanced-billing-sdk';
import {EventsController, EventType} from "@maxio-com/advanced-billing-sdk";

const main = async () => {
    const subdomain = process.env.SUBDOMAIN!;
    const apikey = process.env.APIKEY!;
    const client = new maxio.Client({
        basicAuthCredentials: {
            username: apikey,
            password: 'x'
        }, subdomain
    });

    const events = new EventsController(client);
    const results = await events.listEvents({
        filter: [ EventType.SignupSuccess ],
        perPage: 10
    });
    console.log(results.result);
};

main().catch(e => {
    console.error(e);
});
