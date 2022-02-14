class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isMenuToggledOn: false
        };
    }

    compononentDidMount() {
    }

    handleClick = (e) => {
        // When clicking the hamburguer menu, toggle state and transition
        // to opened menu (CSS animation)
        const navbarMenu = document.querySelector('#navbar-menu');
        this.setState(prevState => ({
            isMenuToggledOn: !prevState.isMenuToggledOn
        }));
        navbarMenu.classList.toggle('transition');

    }

    render() {
        var classNameNavbarMenu = 'navbar-menu'
        var classNameNavbarMask = 'navbar-mask'
        
        return (
            
            <div id='navbar'>
                <div className="navbar-header">

                    <button className="menu-icon-btn" data-menu-icon-btn onClick={(e) => {this.handleClick(e)}}>
                        <i className={this.state.isMenuToggledOn ? "fa fa-times-circle" : "fa fa-bars"} style={{color: "#999999"}}></i>
                    </button>


                    {/* Adding a mask on top of the entire page (except the navbar menu) that when clicked closes the navbar menu */}
                    <div className={this.state.isMenuToggledOn ? classNameNavbarMask : null} onClick={(e) => {this.handleClick(e)}}></div>


                    <div id='navbar-menu' className={this.state.isMenuToggledOn ? classNameNavbarMenu : 'navbar-menu'}>

                        {/* 
                            Add stuff in the right sidebar here: useful for filters & other configurations! 
                            Here follows an example of how to embed filters using the GenericQlikObject:
                        */}

                        <p>Consumer Sales Filters</p>
                        <GenericQlikObject app={this.props.appConsumerSales} objectID={'filter-1'} qlikObjectID={'gGEvB'} style={{width: '100px', height: '50px'}}></GenericQlikObject>

                        <p>Insurance Claims Filters</p>
                        <GenericQlikObject app={this.props.appInsuranceClaims} objectID={'filter-2'} qlikObjectID={'upTHf'} style={{width: '100px', height: '50px'}}></GenericQlikObject>


                    </div>

                </div>
            </div>);
    }
}