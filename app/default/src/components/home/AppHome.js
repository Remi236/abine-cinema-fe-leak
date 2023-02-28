import React from 'react'
import Carousel from '../carousel/AppCarousel';
import Header from '../header/AppHeader';
import Footer from '../footer/AppFooter';
import Tabs from '../tabs/AppTabs';


function AppHome() {
    return (
        <div>
            <Header />
            <Carousel />
            <Tabs/>
            <Footer />
        </div>
    )
}

export default AppHome
