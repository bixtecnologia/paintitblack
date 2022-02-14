class SideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hash: this.props.hash,
            selectedIndex: [true, false, false, false, false, false],
        };
    }

    /*  
        Yes, I know this is ugly code and not very modular! It's the best
        I could do with my time!

        To add new pages, create a new <a> tag down in the render() function
        similar to the ones already there, and make sure the selectedIndex
        list in the React states and handler function is updated accordingly. 
        This selectedIndex state is used to change the appearance of the 
        currently selected tab in the Sidebar, and only one "true" value can 
        be active (unless you want a janky Sidebar).
    */

    handleSelection = (e, id) => {
        if (id == 'landing'){
            this.setState({
                hash: "#LandingPage",
                selectedIndex: [true, false, false, false, false, false]
            });
        }

        else if (id == 'dashboard1'){
            this.setState({
                hash: "#Dashboard1",
                selectedIndex: [false, true, false, false, false, false]
            });
        }

        else if (id == 'dashboard2'){
            this.setState({
                hash: "#Dashboard2",
                selectedIndex: [false, false, true, false, false, false]
            });
        }

        else if (id == 'fullscreen1'){
            this.setState({
                hash: "#Fullscreen1",
                selectedIndex: [false, false, false, true, false, false]
            });
        }

        else if (id == 'doc'){
            this.setState({
                hash: "#Documentation",
                selectedIndex: [false, false, false, false, true, false]
            });
        }

        else if (id == 'settings'){
            this.setState({
                hash: "#Settings",
                selectedIndex: [false, false, false, false, false, true]
            });
        }
    }

    render() {

        var classNameSelected = 'selected-menu-item'
        var classNameTickMark = 'tick-mark'

        return (
            <div id='sidebar'>
                <nav class="sidebar-menu">
                    <ul>
                        <li>
                            <a href="#LandingPage" className={this.state.selectedIndex[0] ? classNameSelected : null} onClick={(e) => {this.handleSelection(e, 'landing')}}>
                                <div className={this.state.selectedIndex[0] ? classNameTickMark : null}></div>
                                <i class="fa fa-home fa-2x"></i>
                                <span class="nav-text">
                                    Landing Page
                                </span>
                            </a>

                        </li>
                        <li>
                            <a href="#Dashboard1" className={this.state.selectedIndex[1] ? classNameSelected : null} onClick={(e) => {this.handleSelection(e, 'dashboard1')}}>
                                <div className={this.state.selectedIndex[1] ? classNameTickMark : null}></div>
                                <i class="fa fa-bar-chart-o fa-2x"></i>
                                <span class="nav-text">
                                    Dashboard 1
                                </span>
                            </a>

                        </li>
                        <li>
                            <a href="#Dashboard2" className={this.state.selectedIndex[2] ? classNameSelected : null} onClick={(e) => {this.handleSelection(e, 'dashboard2')}}>
                                <div className={this.state.selectedIndex[2] ? classNameTickMark : null}></div>
                                <i class="fas fa-chart-pie fas-2x"></i>
                                <span class="nav-text">
                                    Dashboard 2
                                </span>
                            </a>

                        </li>
                        <li>
                            <a href="#Fullscreen1" className={this.state.selectedIndex[3] ? classNameSelected : null} onClick={(e) => {this.handleSelection(e, 'fullscreen1')}}>
                                <div className={this.state.selectedIndex[3] ? classNameTickMark : null}></div>
                                <i class="fa fa-desktop fa-2x"></i>
                                <span class="nav-text">
                                    Fullscreen TV View
                                </span>
                            </a>

                        </li>
                        <li>
                            <a href="#Documentation" className={this.state.selectedIndex[4] ? classNameSelected : null} onClick={(e) => {this.handleSelection(e, 'doc')}}>
                                <div className={this.state.selectedIndex[4] ? classNameTickMark : null}></div>
                                <i class="fa fa-info fa-2x"></i>
                                <span class="nav-text">
                                    Documentation
                                </span>
                            </a>
                        </li>
                    </ul>

                    {/* Settings page at the bottom of Sidebar */}
                    <ul class="settings">
                        <li>
                            <a href="#Settings" className={this.state.selectedIndex[5] ? classNameSelected : null} onClick={(e) => {this.handleSelection(e, 'settings')}}>
                                <div className={this.state.selectedIndex[5] ? classNameTickMark : null}></div>
                                <i class="fa fa-cog fa-2x"></i>
                                <span class="nav-text">
                                    Settings
                                </span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div >
        );
    }
}