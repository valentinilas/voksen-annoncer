import Filters from "../components/filters/filters";
import Results from "../components/results/results";
import Spotlight from "../components/spotlight/spotlight";


export default function Home() {
    return (
        <>
            <Spotlight/>
            <Filters />
            <Results />
        </>
    );
}