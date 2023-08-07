import React, {  useEffect, useState } from 'react'
import Dashboardheader from '../directives/dashboardheader';
import Dashboardsidebar from '../directives/dashboardsidebar';
import { getEarningProjectionsAction } from '../Action/user.action';

const Projection = () => {
    const [toggleSet, settoggleSet] = useState(1)
    const [earningProjections, setEarningProjections] = useState([]);

    useEffect(() => {
        getEarningProjectionsAPI();
    }, []);

    const getEarningProjectionsAPI = async () => {
        let res = await getEarningProjectionsAction();
        if (res.success) {
            setEarningProjections(res.data)
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
                                        <h4 className='mb-4 heading'>Earning Projections</h4>
                                        <div className='table-responsive'>
                                            <table className="table" width="100%" style={{ color: "#fff" }}>
                                                <thead>
                                                    <tr>
                                                        <td className="text-center">Block</td>
                                                        <td className="text-center">Referrals(If direct)</td>
                                                        <td className="text-center">Matching</td>
                                                        <td className="text-center">Rewards</td>
                                                        <td className="text-center">Allocations</td>
                                                        <td className="text-center">Total Earning</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {earningProjections.map(data => (
                                                        <tr>
                                                            <td className="text-center">{data.block}</td>
                                                            <td className="text-center">{data.referral_percentage}%</td>
                                                            <td className="text-center">${data.matching}</td>
                                                            <td className="text-center">${data.rewards}</td>
                                                            <td className="text-center">{data.allocations} MNT</td>
                                                            <td className="text-center">${data.total_earning}</td>
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
export default Projection;