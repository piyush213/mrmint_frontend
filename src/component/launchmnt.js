import React from "react";
import Header from '../directives/header';

import { Container, Row, Col } from 'react-bootstrap';
import AnimatedText from 'react-animated-text-content';
import Roll from 'react-reveal/Roll';

const LaunchMnt = () => {
    return (
        <>
        <Header />
            <div className="launchmnt">

                <div className="background-image">
                    <img src="images/box1.png" />
                   
                </div>
                <section className="hero-section">
                    <div class="area" >
                        <ul class="circles">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div >
                    <Container fluid className="">
                        <Row className="d-flex align-items-center">
                            <div className="home-page-text">
                                <Row className="">
                                    <Col lg={2}>
                                        <Roll top>
                                            <div className="coin">
                                                <img src="images/coin_banner_big.png"  alt='coin_banner_big'/>
                                            </div>
                                        </Roll>

                                    </Col>
                                    <Col lg={8}>
                                        <h1 class="esp-title-block">
                                            <span class="esp-circle"></span>
                                            <span class="esp-title-text" style={{ fontSize: "60px" }}>MNT TOKEN ON PANCAKESWAP!</span>
                                        </h1>
                                        <div className="body-text">

                                            <AnimatedText
                                                type="words"  // animate words or chars
                                                animation={{
                                                    x: '200px',
                                                    scale: 1.1,
                                                    ease: 'ease-in-out',
                                                }}
                                                animationType="words" interval={0.06} duration={1}
                                                tag="h2"
                                                className="animated-paragraph"
                                                includeWhiteSpaces
                                                threshold={0.1}
                                                rootMargin="20%"
                                                style={{ fontSize: "55px", fontFamily: "Mitr", }}
                                            >
                                                Keep Your Eyes Open!
                                            </AnimatedText>
                                            <AnimatedText
                                                type="words" animate words or chars
                                                animation={{
                                                    x: '200px',
                                                    scale: 1.1,
                                                    ease: 'ease-in-out',
                                                }}
                                                animationType="words" interval={0.06} duration={1}
                                                tag="p"
                                                className="animated-paragraph"
                                                includeWhiteSpaces
                                                threshold={0.1}
                                                rootMargin="20%"
                                            >
                                                We are going to list our MNT Token on Pancakeswaps.

                                            </AnimatedText>
                                            <p className="animated-paragraph">
                                                Yes, You Heard it right <b class="blink-soft">On 30th March</b> we are listing our most loved MNT Token on Pancakeswap
                                            </p>
                                            <Row>
                                                <Col lg={12} md={12} className="mt-3">
                                                    <h1 class="">

                                                        <span class="" style={{ texttransform: "capitalize" }} >
                                                            Listing Soon...
                                                        </span>
                                                    </h1>
                                                </Col>

                                            </Row>
                                        </div>
                                    </Col>
                                    <Col lg={2}>
                                        <Roll top>
                                            <div className="coin1">
                                                <img src="images/pancake.png" alt=""/>
                                            </div>
                                        </Roll>

                                    </Col>
                                </Row>


                            </div>
                        </Row>
                    </Container>
                </section>

            </div>
    

        </>
    )
}
export default LaunchMnt;