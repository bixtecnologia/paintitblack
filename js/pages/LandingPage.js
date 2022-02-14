class LandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hash: this.props.hash
        };
    }

    compononentDidMount() {
    }

    render() {
        return (
            <div className="mashup-body">
                <div className="mashup-content">

                    {/* Add your landing page content here v */}

                    <div className="default-text-page">

                        <div className='fade-in-title' style={{ fontSize: '36pt' }}> Paint It Black! </div>
                        <div className='text-page-contents'>
                            <p className='fade-in-content'>

                                Hello, this is Paint It Black!, a dark-mode themed QlikSense mashup template
                                built by <a href='https://www.linkedin.com/in/fellipe-fernandes/' target='_blank'>Fellipe Fernandes</a> in collaboration with <a href='https://www.linkedin.com/company/bixtecnologia/' target='_blank'>BIX Tecnologia</a> based on the following principles: <br />
                                <br />

                                <div className='landing-page-cards-container'>

                                    <div className='landing-page-cards'>
                                        <div className='landing-page-cards-header'>GENERALITY</div> 
                                        
                                        <p className='landing-page-cards-content'>By providing enough base code to integrate different charts, maps, fields and pages with different purposes</p>
                                    </div>

                                    <div className='landing-page-cards'>
                                        <div className='landing-page-cards-header'>ADAPTABILITY</div> 
                                        
                                        <p className='landing-page-cards-content'>Easy to add or remove pages, menus, graphs and to adapt the template to your needs</p>
                                    </div>

                                    <div className='landing-page-cards'>
                                        <div className='landing-page-cards-header'>CONNECTIVITY</div> 
                                        
                                        <p className='landing-page-cards-content'>By providing a framework for multi-app integration in a single mashup</p>
                                    </div>

                                    <div className='landing-page-cards'>
                                        <div className='landing-page-cards-header'>OPERABILITY</div> 
                                        
                                        <p className='landing-page-cards-content'>Being quick and easy switch between DEV and PRD environments such as switching between consuming from QlikSense Desktop or Enterprise</p>
                                    </div>

                                    <div className='landing-page-cards'>
                                        <div className='landing-page-cards-header'>EASE-OF-USE</div>
                                        
                                        <p className='landing-page-cards-content'>Developed by someone who actually had to read code and learn the tech stack as PIB! was being built, while also making it right</p>
                                    </div>
                                </div>

                                <br/>
                                <br/>

                                This is the landing page, the default page that is shown when accessing the mashup's base URL, or by clicking the <span class="fa fa-home" style={{ cursor: 'default', display: 'inline' }}></span> icon on the sidebar.
                                <br />
                                It is where you could put some text, logos and images, maybe some descriptive text on the submenus, some business case rules, etc.
                                <br />
                                You can press the ESC key to show/hide the Sidebar and Navbar at any time (remember this when visiting the Fullscreen TV tab!)

                            </p>
                        </div>
                    </div>



                </div>
            </div>
        );
    }
}