import React, { useEffect, useState } from 'react'
import Dashboardheader from '../directives/dashboardheadernft';
import Dashboardsidebar from '../directives/dashboardsidebarnft';
import { getRewardsListAction } from '../Action/user.action';

const Reward = () => {
    const [toggleSet, settoggleSet] = useState(1)
    const [rewards, setRewards] = useState([]);

    useEffect(() => {
        getRewardsList();
    }, []);

    const getRewardsList = async () => {
        let res = await getRewardsListAction();
        if (res.success) {
            setRewards(res.data)
        }
    }

    const toggleManage = (data) => {
        settoggleSet(data)
    }

    return (
        <>
            <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
                <Dashboardsidebar />
                <div className="main-container dashboard">
                    <Dashboardheader clickToggle={toggleManage} />
                    <div className="content-wrapper-scroll">
                        <div className="content-wrapper">
                            <div className='card  mt-4 p-4'>
                                <div className='row'>
                                    <div className='col-lg-12 col-12 '>
                                        <h4 className='mb-4 heading'>Rewards & Allocation</h4>
                                        <div className='table-responsive'>
                                            <table className="table" width="100%" style={{ color: "#fff" }}>
                                                <thead>
                                                    <tr>
                                                        <td className='text-center'>Badge</td>
                                                        <td className="text-center">Rank</td>
                                                        <td className="text-center">No. of Blocks</td>
                                                        <td className="text-center">Reward</td>
                                                        <td className="text-center">Allocation</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {rewards.map(data => (
                                                        <tr>
                                                            <td className='text-center' ><img style={{height:'25px', width:'25px'}} alt='' src={`assets/images/${data.badge}`} width="18px" /></td>
                                                            <td className='text-center' >{data.rank}</td>
                                                            <td className='text-center' >{data.blocks}</td>
                                                            <td className='text-center' >${data.reward}</td>
                                                            <td className='text-center' >{data.allocation} MNT</td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
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
export default Reward;