export const Config = {
    addAdvice: {
        limits: {
            perUser: {
                calls: 3,
                periodS: 60,
            },
            perPhone: {
                calls: 4,
                periodS: 40 * 60,
            },
        },
    },
    sendSMS: {
        limits: {
            perUser: {
                calls: 4,
                periodS: 60,
            },
            perPhone: {
                calls: 4,
                periodS: 40 * 60,
            },
        },
    },
};