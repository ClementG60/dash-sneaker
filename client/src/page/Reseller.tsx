import AddWebsite from "../component/Form/FormWebsite";
import GetSites from "../component/GetSites";

const Reseller = () => {
    return (
        <>
            <GetSites type={"reseller"} />
            <AddWebsite type={"resell-website"} />
        </>
    );
};

export default Reseller;