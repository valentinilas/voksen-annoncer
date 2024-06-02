import Button from "../button/button";

export default function Results() {
    const items = [1, 2, 3, 4, 1, 2, 3, 4];
    const BLOCKS =
        items.map((item, index) => {
            return <div key={index}>
                <div className="border-b mb-4 pb-4 ">
                    {/* Card main content */}
                    <div className="flex justify-between columns-2 	">
                        <div className="result-text">
                            <h3 className="font-bold text-xl">Lorem ipsum dolor sit amet</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                        <div className="result-image">
                            <img src="https://placehold.co/600x400" className="mb-2 rounded-md" />
                        </div>
                    </div>

                    {/* Card Details */}
                    <div class="flex p-4 bg-white border  border-cherry-200 justify-between rounded-md items-center gap-4">
                        <div> <Button >Details</Button></div>
                        <div className="flex items-center gap-4">
                            <span>Location: København</span>
                            <span>Age: 24</span>
                            <span>Service: Massage</span>
                        </div>



                    </div>

                </div>

            </div>
        });
    return (
        <section className="container mx-auto bg-white mt-1 p-5 0 rounded-lg shadow-sm">
            {BLOCKS}
        </section>
    );
}