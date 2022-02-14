class FullscreenTV extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hash: this.props.hash,
            showNavigation: false
        };
    }

    compononentDidMount() {

    }

    render() {
        // This is a special page that when visited automatically hides the
        // Sidebar and Navbar. A use-case for a page like this is when you
        // have a display somewhere that should show data in fullscreen mode
        // (F11 on most browsers), such as a big TV in a control room, etc.
        // You can resize this screen to match the TV's resolution and make a
        // condensed information panel, for example.
        sidebar.style.display = 'none';
        navbar.style.display = 'none';
        areMenusShown = false;

        // Render page
        return (
            <div className="mashup-body">
                <div className="mashup-content">

                <div className="default-text-page">
                        <div className='fade-in-title' style={{ fontSize: '36pt' }}> Fullcreen Mode </div>
                        <div className='text-page-contents'>
                            <p className='fade-in-content'>

                            Hey, see that the Navbar and Sidebar both disappeared? Pretty cool huh!?
                            <br/>
                            Based on a real world case on which Paint It Black! was developed, I decided
                            that users could use a page completely in blank as a canvas for mashups, so 
                            here we are (you can press F11 to put your browser in fullscreen mode!). 
                            <br/>
                            Total freedom to develop a custom header that only appears here with your company's
                            logo and different visualizations. I've personally used this model to build kind of a 
                            BI dashboard (even though I'm actually a data engineer) that is displayed to the public
                            in a biiiiig 4k TV 24/7.
                            <br/>
                            <br/>
                            Oh, and by the way, you can press ESC at any time to hide/show the Navbar and Sidebar,
                            and not only in here, but on any page of the mashup. The key dedicated to that can be
                            changed in the App.js file, line 99 :)



                            <br/>
                            <br/>

                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                            optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                            obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                            nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                            tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                            quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
                            sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                            recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
                            minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit
                            quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur
                            fugiat, temporibus enim commodi iusto libero magni deleniti quod quam
                            consequuntur! Commodi minima excepturi repudiandae velit hic maxime
                            doloremque. Quaerat provident commodi consectetur veniam similique ad
                            earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
                            fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore
                            suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
                            modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam
                            totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam
                            quasi aliquam eligendi, placeat qui corporis!Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                            optio, eaque rerum!
                            </p>
                        </div>
                    </div>

                </div>
            </div>);
    }
}