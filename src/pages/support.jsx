import { NavLink } from "react-router-dom";

export default function Support() {
    return (
        <section className="container mx-auto p-5 ">
            <div className="bg-base-200 p-5 rounded-box shadow-sm">
                <h1 className="text-2xl font-bold">Support</h1>
                <p>For any questions or issues please contact <a href="mailto:voksenannoncer@protonmail.com">voksenannoncer@protonmail.com</a></p>

                <h2 className="text-xl font-bold">Cookie and Privacy Policy</h2>
                <p>
                    Voksen Annoncer uses cookies to remember your settings and statistics. This information is shared with third parties. Read our full cookie and privacy policy <NavLink className="link" to="/cookie-policy" href="cookie-policy">here</NavLink></p>
            </div>



        </section>
    );
}