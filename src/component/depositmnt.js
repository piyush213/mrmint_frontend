import React, {  useEffect, useState } from 'react'
import Dashboardheader from '../directives/dashboardheader';
import Dashboardsidebar from '../directives/dashboardsidebar';
const Depositmnt = () => {
    const [toggleSet, settoggleSet] = useState(1)
    useEffect(() => {

    })

    const toggleManage = (data) => {
        settoggleSet(data)
    }

    return (
        <>
             <div className={`page-wrapper${toggleSet === 1 ? '' : ' toggled'}`}>
                <Dashboardsidebar />
                <div className="main-container">
                <Dashboardheader clickToggle={toggleManage} />
                    <div className="content-wrapper-scroll">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className='col-md-12'>
                                    <div className="card boxHeight p-2 mt-2">
                                        <div className="card-body">
                                            <br /><br /><br /><br /><br /><br />
                                            <h2 style={{textAlign: 'center'}} className='mb-2'>Coming Soon</h2>
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
export default Depositmnt;