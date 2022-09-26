const Navigation = () => {
    return (
        <div className="flex text-center font-sans bg-gradient-to-r from-slate-300 to-slate-100 pt-2 pb-4">
            <h1 className="w-1/4 text-2xl font-bold text-purple-900">Dashboard</h1>
            <ul className="flex w-3/4 align-baseline justify-around my-auto font-semibold text-purple-500">
                <li className=""><a href="/">Inventaire</a></li>
                <li><a href="/retailer">Liste des retailers</a></li>
                <li><a href="/reseller">Liste des sites de revente</a></li>
            </ul>
        </div>
    );
};

export default Navigation;