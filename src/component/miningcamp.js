
import React, { useEffect, useState } from 'react'
import Dashboardheadernft from '../directives/dashboardheadernft';
import Dashboardsidebarnft from '../directives/dashboardsidebarnft';
import config from '../coreFIles/config';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Autoplay } from "swiper";
import { miningcampAction, miningTransferAction } from '../Action/user.action';
import Swal from 'sweetalert2';

const Miningcamp = () => {
    const [toggleSet, settoggleSet] = useState(1)
    const [form, setForm] = useState("")
    const [hashpower, sethashpower] = useState({})
    const [miningbalance
        , setminingbalance
    ] = useState(0)
    const [mntrecordlist, setmntrecordlist] = useState({})


    const [miningtransfer
        , setminingtransfer
    ] = useState(0)


    useEffect(() => {
        getpartner()
    }, []);

    const getpartner = async () => {
        let res = await miningcampAction();
        if (res) {
            setForm(res.livemntworth);
            sethashpower(res.hashpower[0])
            setminingbalance(res.miningbalance[0].mining_balance)
            setmntrecordlist(res.MNTrecord);
        }
    };

    const getpartner1 = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Transfer this Balance!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Transfer it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                let res = await miningTransferAction();
                if (res.success) {
                    Swal.fire("Transfered!", res.msg, "success");
                    setminingtransfer();
                    window.location.reload();
                } else {
                    Swal.fire("Failed to Transfer!", res.msg, "error");
                }
            }
        });
    };

    const toggleManage = (data) => {
        settoggleSet(data)
    }

    return (
        <>
            <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
                <Dashboardsidebarnft />
                <div className="main-container">
                    <Dashboardheadernft clickToggle={toggleManage} />
                    <div className="content-wrapper-scroll pt-4 miningcamp">
                        <img src="images/car-star.png" className='boxstar'alt=''/>
                        <div className="content-wrapper">

                            <div className='row align-items-center justify-content-center mb-4'>
                                <div className='col-sm-12'>
                                    <div className='dailydistribution mb-4 '>
                                        <h5 className='mb-0'>Hash Power Distributed in 24H</h5>
                                        <div className='daily_dribute'>
                                            <h4 className='mb-0'>{hashpower.hashPower24}</h4>
                                        </div>
                                    </div>

                                </div>
                                <div className='col-lg-8 mt-3 mb-3'>
                                    <div className='cardslider'>

                                        <Swiper
                                            effect={"coverflow"}
                                            grabCursor={true}
                                            centeredSlides={true}
                                            loop={true}
                                            // slidesPerView={3}
                                            spaceBetween={1}
                                            autoplay={{
                                                delay: 2500,
                                                disableOnInteraction: false,
                                            }}
                                            breakpoints={{
                                                640: {
                                                  slidesPerView: 1,
                                                  spaceBetween: 0,
                                                },
                                                768: {
                                                  slidesPerView: 3,
                                                  spaceBetween:  0,
                                                },
                                                1024: {
                                                  slidesPerView: 3,
                                                  spaceBetween: 0,
                                                },
                                              }}
                                            coverflowEffect={{
                                                rotate: 50,
                                                stretch: 0,
                                                depth: 100,
                                                modifier: 1,
                                                slideShadows: true,
                                            }}
                                            //  pagination={true}
                                            modules={[EffectCoverflow, Pagination, Autoplay]}
                                            className="mySwiper"
                                        >
                                            <SwiperSlide>
                                                <div className='cardvideo'>
                                                    <video width="100%" autoPlay muted playsInline loop>
                                                        <source src={`${config.ipfsurl + 'QmT5hWHnFDeHwbnT9qTZauvXtYHnp8Xf5ZaL5uQSGe6tZd'}`} type="video/mp4" />
                                                        <source src={`${config.ipfsurl + 'QmT5hWHnFDeHwbnT9qTZauvXtYHnp8Xf5ZaL5uQSGe6tZd'}`} type="video/ogg" />
                                                        Your browser does not support the video tag.
                                                    </video>

                                                </div>

                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className='cardvideo'>
                                                    <video width="100%" autoPlay muted playsInline loop>
                                                        <source src={`${config.ipfsurl + 'Qmb91D7UuxuQLozK6t5B5jns7NgQpAotjXLebFmZX63pny'}`} type="video/mp4" />
                                                        <source src={`${config.ipfsurl + 'Qmb91D7UuxuQLozK6t5B5jns7NgQpAotjXLebFmZX63pny'}`} type="video/ogg" />                                                        Your browser does not support the video tag.
                                                    </video>

                                                </div>

                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className='cardvideo'>
                                                    <video width="100%" autoPlay muted playsInline loop>
                                                        <source src={`${config.ipfsurl + 'QmPrXbz6y1FeuRuNTPPypqUuEyN2xj8w4vEYzXP1x15Rq1'}`} type="video/mp4" />
                                                        <source src={`${config.ipfsurl + 'QmPrXbz6y1FeuRuNTPPypqUuEyN2xj8w4vEYzXP1x15Rq1'}`} type="video/ogg" />
                                                        Your browser does not support the video tag.
                                                    </video>

                                                </div>


                                            </SwiperSlide>
                                        </Swiper>
                                        <div className='card-box'>

                                        </div>
                                    </div>

                                </div>
                                <div className='col-lg-12  text-center' style={{ position: "relative", marginTop: "-65px" }}>
                                    <div className='btn_hashpower'>
                                       
                                        <div class="row justify-content-center">
                                            <div class="col-lg-9 col-11 total_mnt">
                                                <div class="row">
                                                    <div class="col-lg-4 col-4 pl-0 pr-0 border bg-black">
                                                        <div class="btn total_hash pt-0">
                                                            <h5 className='bg-grey p-2'>Total MNT Rewards</h5>
                                                            <h5 class="mb-0">{mntrecordlist.totalMNT}</h5>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-4 pr-0 pl-0 border bg-black">
                                                        <div class="btn pt-0">
                                                            <h5 className='bg-grey p-2'>Distributed MNT Rewards</h5>
                                                            <h5 class="mb-0">{mntrecordlist.distributedMNT}</h5>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-4 pr-0 pl-0 border bg-black">
                                                        <div class="btn pt-0">
                                                            <h5 className='bg-grey p-2'>Remaining MNT Rewards</h5>
                                                            <h5 class="mb-0">{mntrecordlist.remainingMNT}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row justify-content-center'>
                                            <div className='col-lg-10 col-11'>
                                                <div className='row'>
                                                    <div className='col-lg-6 col-6 pl-0 pr-0 border bg-black'>
                                                        <div className='btn total_hash'>
                                                            <h4>Total Hash Power</h4>
                                                            <h2 className='mb-0'>{hashpower.total}</h2>

                                                        </div>

                                                    </div>
                                                    <div className='col-lg-6 col-6 pr-0 pl-0 border bg-black'>
                                                        <div className='btn '>
                                                            <h5>My Hash Power</h5>
                                                            <h4>{hashpower.myHashPower == 0 ? "000" : hashpower.myHashPower == null ? "000" : hashpower.myHashPower}</h4>
                                                            <div className='bottombox'>
                                                                <span> 100 <small>Hash power</small> &nbsp;<img src="images/tildicon.png" alt='' style={{ width: "15px", filter: "brightness(0) invert(1)" }} />&nbsp;{form}&nbsp;<small>MNT/DAY</small> </span>
                                                            </div>
                                                        </div>

                                                    </div>


                                                </div>

                                            </div>
                                        </div>
                                        <div className='row justify-content-center claimbtn'>
                                            <div className='col-lg-6'>
                                                <div className='row justify-content-center'>
                                                    <div className='col-lg-12 col-8 pl-0 pr-0 border bg-black'>
                                                        <div className='row'>
                                                            <div className='col-lg-6'>
                                                                <div className='mntbalance'>
                                                                    <h5>Rewards</h5>
                                                                    <ul>

                                                                        <li><img src='images/coin_banner_big.png' width="30px"  alt='coin_banner_big'/></li>
                                                                        <li><h5 className='mb-0'>{miningbalance == 0 ? "0" : miningbalance == null ? "0" : miningbalance}</h5></li>
                                                                        <li><h5 className='mb-0'>MNT</h5></li>
                                                                    </ul>

                                                                </div>

                                                            </div>
                                                            <div className='col-lg-6 text-center'>
                                                                <div>
                                                                    <button className='btn btn-primary mt-2 mb-2' onClick={getpartner1}>
                                                                        Transfer
                                                                    </button>
                                                                </div>

                                                            </div>

                                                        </div>


                                                    </div>



                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Miningcamp;