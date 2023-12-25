import "./App.css";

export default () => {
    return <div className="app">
        <div className="search">
            <input type="text" />
            <div className="searchBtn">Go</div>
        </div>
        <div className="main">
            <div className="location"></div>
            <div className="date"></div>
            <div className="temp"></div>
            <div className="type"></div>
        </div>
    </div>
}