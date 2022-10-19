const Navigation = () => {
    return (
        <div className="flex text-center font-sans pt-2 pb-4">
            <h1 className="w-1/4 text-2xl font-bold text-purple-500 font-akira">Dashboard</h1>
            <ul className="flex w-3/4 align-baseline justify-around my-auto font-semibold text-purple-300">
                <li className=""><a href="/">Inventaire</a></li>
                <li><a href="/expensive">Dépenses</a></li>
                <li><a href="/retailer">Liste des retailers</a></li>
                <li><a href="/reseller">Liste des sites de revente</a></li>
            </ul>
        </div>
    );
};

export default Navigation;