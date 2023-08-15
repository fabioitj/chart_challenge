import "./style.css";

function Row({children}: {children: React.ReactElement | React.ReactElement[]}) {
    return (
        <div className='row'>
            {children}
        </div>
    );
}

export default Row;