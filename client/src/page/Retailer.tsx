import AddWebsite from "../component/Form/FormWebsite";
import GetSites from "../component/GetSites";

const Retailer = () => {
    return (
        <>
            <GetSites type={"retailer"} />
            <AddWebsite type={"website"} />
        </>
    )
};

export default Retailer;