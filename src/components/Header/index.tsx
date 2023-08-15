import "./style.css";

function Header() {
    return (
        <div className='header'>
            <div className='header__item'>
                <span className='header__item-red-circle'></span>
                <span className='header__item-user-name'>User Name</span>
            </div>
            <div className='header__item'>
                <span className='header__item-sales-report'>Sales Report</span>
            </div>
        </div>
    );
}

export default Header;