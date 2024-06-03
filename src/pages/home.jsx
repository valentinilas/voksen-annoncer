import Filters from "../components/filters/filters";
import Results from "../components/results/results";
import Spotlight from "../components/spotlight/spotlight";
import { NavLink } from "react-router-dom";


export default function Home() {
    return (
        <>
            <NavLink to="/new-ad">New Ad</NavLink>
            <Spotlight/>
            <Filters />
            <Results />
        </>
    );
}