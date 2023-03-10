import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            hello: 'hello world',
            manageUser: {
                title: 'welcome to hanoi',
            },
            systemSidebar: {
                users: {
                    title: 'Users',
                    data: {
                        title1: 'List user',
                        title2: 'Blog',
                    },
                },
                employees: {
                    title: 'Employee',
                    data: {
                        title1: 'Add appointment',
                        title2: 'Hair salon',
                    },
                },
                information: {
                    title: 'Information',
                    data: {
                        title1: 'Booking',
                        title2: 'Service',
                    },
                },
                feedback: {
                    title: 'Feedback',
                    data: {
                        title1: 'List feedback',
                        title2: 'List service',
                    },
                },
                dashboard: {
                    title: 'DashBoard',
                    data: {
                        title_booking: 'Booking chart',
                        title_order: 'Order chart',
                        title_service: 'Service chart',
                        title_guest: 'Guest chart',
                        title_branch: 'Branch chart',
                    },
                },
                table: {
                    title: 'Table',
                    data: {
                        title_employee: 'Timesheets',
                        title_branch: 'Branch revenue table',
                        title_booking: 'Appointment table',
                        title_order: 'Order table',
                    },
                },
            },
        },
    },
    vi: {
        translation: {
            hello: 'xin ch??o th??? gi???i',
            manageUser: {
                title: 'ch??o m???ng ?????n h?? n???i',
            },
            systemSidebar: {
                accounts: {
                    title: 'T??i kho???n',
                    data: {
                        list: 'Danh s??ch',
                        create: 'T???o',
                    },
                },
                blog: {
                    title: 'B??i vi???t',
                    data: {
                        list: 'Danh s??ch',
                        create: 'T???o',
                    },
                },
                booking: {
                    title: 'L???ch l??m vi???c',
                    data: {
                        list: 'Danh s??ch',
                        create: 'T???o',
                    },
                },
                branch: {
                    title: 'Chi nh??nh',
                    data: {
                        list: 'Danh s??ch',
                        create: 'T???o',
                    },
                },
                service: {
                    title: 'D???ch v???',
                    data: {
                        list: 'Danh s??ch d???ch v???',
                        create: 'T???o d???ch v???',
                    },
                },
                type_service: {
                    title: 'Lo???i d???ch v???',
                    data: {
                        list: 'Danh s??ch lo???i d???ch v???',
                        create: 'T???o lo???i d???ch v???',
                    },
                },
                voucher: {
                    title: 'M?? gi???m gi??',
                    data: {
                        list: 'Danh s??ch',
                        create: 'T???o',
                    },
                },
                feedback: {
                    title: 'Ph???n h???i',
                    data: {
                        list: 'Danh s??ch',
                        create: 'T???o',
                    },
                },
                dashboard: {
                    title: 'Bi???u ?????',
                    data: {
                        title_booking: 'Bi???u ????? l???ch h???n',
                        title_order: 'Bi???u ????? ????n h??ng',
                        title_service: 'Bi???u ????? d???ch v???',
                        title_guest: 'Bi???u ????? kh??ch h??ng',
                        title_branch: 'Bi???u ????? chi nh??nh',
                    },
                },
                table: {
                    title: 'B???ng',
                    data: {
                        title_employee: 'B???ng ch???m c??ng',
                        title_branch: 'B???ng doanh thu chi nh??nh',
                        title_booking: 'B???ng l???ch h???n',
                        title_order: 'B???ng ????n h??ng',
                    },
                },
            },
        },
    },
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'vi', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
