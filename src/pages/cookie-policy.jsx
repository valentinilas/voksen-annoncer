
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function CookiePolicy() {
    const [t] = useTranslation();

    return (
        <section className="cookie-policy">
            <div className="bg-base-200 p-20 rounded-box shadow-sm">

                <h1 className="text-4xl mb-5">{t('cookiePolicy.effectiveDate')}</h1>
                <p className="mb-3">{t('cookiePolicy.introduction')}</p>

                <h2 className="text-2xl mb-5">{t('cookiePolicy.whatAreCookies')}</h2>
                <p className="mb-3">{t('cookiePolicy.whatAreCookiesDesc')}</p>

                <h2 className="text-2xl mb-5">{t('cookiePolicy.howWeUseCookies')}</h2>
                <p className="mb-3">{t('cookiePolicy.howWeUseCookiesDesc')}</p>

                <h3 className="text-xl font-bold  mb-2 mt-4">{t('cookiePolicy.essentialCookies')}</h3>
                <p className="mb-3">{t('cookiePolicy.essentialCookiesDesc')}</p>

                <h3 className="text-xl font-bold  mb-2 mt-4">{t('cookiePolicy.performanceCookies')}</h3>
                <p className="mb-3">{t('cookiePolicy.performanceCookiesDesc')}</p>

                <h3 className="text-xl font-bold  mb-2 mt-4">{t('cookiePolicy.functionalityCookies')}</h3>
                <p className="mb-3">{t('cookiePolicy.functionalityCookiesDesc')}</p>

                <h3 className="text-xl font-bold  mb-2 mt-4">{t('cookiePolicy.advertisingCookies')}</h3>
                <p className="mb-3">{t('cookiePolicy.advertisingCookiesDesc')}</p>

                <h2 className="text-2xl mb-5">{t('cookiePolicy.cookiesWeUse')}</h2>
                <p className="mb-3">{t('cookiePolicy.cookiesWeUseDesc')}</p>

                <h3 className="text-xl font-bold  mb-2 mt-4">{t('cookiePolicy.sessionCookies')}</h3>
                <p className="mb-3">{t('cookiePolicy.sessionCookiesDesc')}</p>

                <h3 className="text-xl font-bold  mb-2 mt-4">{t('cookiePolicy.persistentCookies')}</h3>
                <p className="mb-3">{t('cookiePolicy.persistentCookiesDesc')}</p>

                <h2 className="text-2xl mb-5">{t('cookiePolicy.yourChoices')}</h2>
                <p className="mb-3">{t('cookiePolicy.yourChoicesDesc')}</p>

                <h3 className="text-xl font-bold  mb-2 mt-4">{t('cookiePolicy.browserSettings')}</h3>
                <p className="mb-3">{t('cookiePolicy.browserSettingsDesc')}</p>

                <h3 className="text-xl font-bold  mb-2 mt-4">{t('cookiePolicy.optOutLinks')}</h3>
                <p className="mb-3">{t('cookiePolicy.optOutLinksDesc')}</p>

                <h2 className="text-2xl mb-5">{t('cookiePolicy.changesPolicy')}</h2>
                <p className="mb-3">{t('cookiePolicy.changesPolicyDesc')}</p>

                <h2 className="text-2xl mb-5">{t('cookiePolicy.contactUs')}</h2>
                <p className="mb-3">{t('cookiePolicy.contactUsDesc')}</p>
                <p className="mb-3">{t('cookiePolicy.email')}</p>



            </div>



        </section>
    );
}