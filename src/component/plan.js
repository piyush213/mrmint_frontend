import React, { useEffect, useState } from 'react'
import Dashboardheader from '../directives/dashboardheader';
import Dashboardsidebar from '../directives/dashboardsidebar';
import { getBlockExpansionIncomeAction, getCapingPlanAction, getTokenAllocationAction } from '../Action/user.action';

const Plan = () => {
    const [toggleSet, settoggleSet] = useState(1)
    const [capingPlan, setCapingPlan] = useState([]);
    const [blockExpansionIncome, setBlockExpansionIncome] = useState([]);
    const [tokenAllocation, setTokenAllocation] = useState([]);

    useEffect(() => {
        getCapingPlan();
        getBlockExpansionIncome();
        getTokenAllocation();
    }, []);

    const getCapingPlan = async () => {
        let res = await getCapingPlanAction();
        if (res.success) {
            setCapingPlan(res.data)
        }
    }

    const getBlockExpansionIncome = async () => {
        let res = await getBlockExpansionIncomeAction();
        if (res.success) {
            setBlockExpansionIncome(res.data)
        }
    }

    const getTokenAllocation = async () => {
        let res = await getTokenAllocationAction();
        if (res.success) {
            setTokenAllocation(res.data)
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
                                        <h4 className='mb-4 heading'>Block Expansion Income (Daily Closing & Caping) </h4>
                                        <div className='table-responsive'>
                                            <table className="table" width="100%" style={{ color: "#fff" }}>
                                                <thead>
                                                    <tr>
                                                        <td className="text-center">PACKAGE NAME</td>
                                                        <td className="text-center">PACKAGE AMOUNT</td>
                                                        <td className="text-center">DAILY CAPING</td>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {capingPlan.map(data => (
                                                        <tr>
                                                            <td className='text-center' >{data.name}</td>
                                                            <td className='text-center' > {data.id == 3 ?
                                                                <>
                                                                    $ {data.minimum} & Above
                                                                </>
                                                                :
                                                                <>
                                                                    $ {data.minimum} - $ {data.maximum}
                                                                </>
                                                            } </td>
                                                            <td className='text-center' >$ {data.daily_caping}</td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='card  mt-4 p-4'>
                                <div className='row'>
                                    <div className='col-lg-12 col-12 '>
                                        <h4 className='mb-4 heading'>Block Expansion Income </h4>
                                        <div className='table-responsive'>
                                            <table className="table" width="100%" style={{ color: "#fff" }}>
                                                <tbody>
                                                    {blockExpansionIncome.map(data => (
                                                        <tr>
                                                            <td className='text-center' >{data.stage}</td>
                                                            <td className='text-center' >${data.amount}</td>
                                                            <td className='text-center' >{data.percentage}%</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='card  mt-4 p-4'>
                                <div className='row'>
                                    <div className='col-lg-12 col-12 '>
                                        <h4 className='mb-4 heading'>Token Allocation </h4>
                                        <div className='table-responsive'>
                                            <table className="table" width="100%" style={{ color: "#fff" }}>
                                                <thead>
                                                    <tr>
                                                        <td className="text-center">Rank</td>
                                                        <td className="text-center">No. of Blocks</td>
                                                        <td className="text-center">Token Allocation</td>

                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {tokenAllocation.map(data => (
                                                        <tr>
                                                            <td className='text-center' >{data.rank}</td>
                                                            <td className='text-center' >{data.blocks}</td>
                                                            <td className='text-center' >{data.reward} MNT</td>
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
export default Plan;