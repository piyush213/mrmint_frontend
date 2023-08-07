import React, {  useEffect, useState } from 'react'
import Dashboardheader from '../directives/dashboardheader';
import Dashboardsidebar from '../directives/dashboardsidebar';
import { getPhaseAction } from '../Action/user.action';

const Staking = () => {
    const [toggleSet, settoggleSet] = useState(1)
    const [phaseList, setPhaseList] = useState([]);

    useEffect(() => {
        getPhaseAPI();
    }, []);

    const getPhaseAPI = async () => {
        let res = await getPhaseAction();
        if (res.success) {
            setPhaseList(res.data)
        }
    }

    const toggleManage = (data) => {
        settoggleSet(data)
    }

    return (
        <>
            <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
                <Dashboardsidebar />
                <div className="main-container">
                    <Dashboardheader clickToggle={toggleManage} />
                    <div className="content-wrapper-scroll">
                        <div className="content-wrapper">
                            <div className='card  mt-4 p-4'>
                                <div className='row'>
                                    <div className='col-lg-12 col-12 '>
                                        <h4 className='mb-4'>MNT Token Phase</h4>
                                        <div className='table-responsive'>
                                            <table className="table" width="100%" style={{ color: "#fff" }}>
                                                <thead>
                                                    <tr>
                                                        <td className="text-center">Phase</td>
                                                        <td className="text-center">Quantity</td>
                                                        <td className="text-center">Price($)</td>
                                                        <td className="text-center">Start Date</td>
                                                        <td className="text-center">End Date</td>
                                                        <td className="text-center">Status</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {phaseList.map((item, i) => (
                                                        <tr>
                                                            <td className="text-center">
                                                                <strong>{item.phase}</strong>
                                                            </td>
                                                            <td className="text-center">{item.quantity}</td>
                                                            <td className="text-center">${item.price}</td>
                                                            <td className="text-center">{item.start_date}</td>
                                                            <td className="text-center">{item.end_date}</td>
                                                            <td className="text-center">
                                                                {item.status == 1?
                                                                    <span style={{cursor:'default'}} className='btn-sm btn btn-primary'>Active</span>
                                                                : 
                                                                <span style={{color:'#55bbff'}}>Completed</span>
                                                                }
                                                            </td>                                                            
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
export default Staking;