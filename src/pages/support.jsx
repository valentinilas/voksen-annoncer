import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Support() {
    const [t] = useTranslation();

    return (
        <section className="support">
            <div className="bg-base-200 p-20 rounded-box shadow-sm">
                <h1 className="text-4xl mb-5">{t('support.title')}</h1>
                <p className="mb-3">{t('support.contactEmail')} <a className="link" href={`mailto:${t('support.emailAddress')}`}>{t('support.emailAddress')}</a></p>

                <h2 className="text-2xl mb-5 mt-5">{t('support.cookiePolicy.title')}</h2>
                <p className="mb-3">{t('support.cookiePolicy.description')} <NavLink className="link" to={t('support.cookiePolicy.policyLink')}>{t('support.cookiePolicy.linkText')}</NavLink></p>
            </div>



        </section>
    );
}