import {assign, DoneEventObject, Machine} from 'xstate';

export const fetchCustomer = (): Promise<any> =>
    Promise.resolve({
        id: '2352357',
        firstName: 'John',
        lastName: 'Smith',
    });

interface CustomerModalContext {
    response: {
        id: string;
        firstName: string;
        lastName: string;
    };
}

interface CustomerModalSchema {
    states: {
        loading: {};
        initial: {};
    };
}

type CustomerModalEvent = { type: 'INITIALIZED' };

const customerModalMachine = Machine<CustomerModalContext, CustomerModalSchema, CustomerModalEvent>(
    {
        initial: 'loading',
        context: {
            response: undefined,
        },
        states: {
            loading: {
                invoke: {
                    src: 'fetchCustomer',
                    onDone: [
                        {
                            target: 'initial',
                            actions: 'setCustomerFromResponse',
                        },
                    ],
                },
            },
            initial: {},
        },
    },
    {
        services: {
            fetchCustomer: (context) => fetchCustomer(),
        },
        actions: {
            setCustomerFromResponse: assign<CustomerModalContext, DoneEventObject>({
                response: (_, event) => event.data.response,
            }),
        }
    },
);
