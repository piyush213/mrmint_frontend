/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Header from '../directives/header'
import Footer from '../directives/footer'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel, } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';


const Faq = () => {


    return (

        <>
            <Header />
            <div id="content" className="">
            {/* <div className="breadcrumb-wrap bg-f br-4" style={{ background: "url(assets/images/pink-elegant-geometrical-texture.png)", backgroundSize: "cover" }}> */}
            <div className="breadcrumb-wrap bg-f br-4" >
                    <div className="overlay bg-black op-7" />
                    <div className="container">
                        <div className="breadcrumb-title">
                            <h2>Frequently Asked Questions</h2>
                            <ul className="breadcrumb-menu list-style">
                                <li>
                                    <a href="#">Home</a>
                                </li>
                                <li>FAQ</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='container mt-5 mb-5'>

                    <div className="col-md-12">
                       <div style={{overflowX:"hidden"}}>
                       <Accordion>
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        What is Mr Mint ($MNT)?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>
                                        $MNT is a BSC token designed to make it super simple to invest in crypto mining without any knowledge or expensive equipment. We work with strategic mining partners in Australia, the United Kingdom, Iceland & India who use 100% hydroelectric & solar power to mine $BTC and other cryptocurrencies.
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        What is the Official Contract Address?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>
                                        The contract address is: <b>0x3e81Aa8d6813Ec9D7E6ddB4e523fb1601a0e86F3</b>
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        Can I know more about the tokenomics of the $MNT token?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>Here are Mr Mint’s tokenomics in detail <a style={{ color: '#11c2ff' }} href="https://mrmint.io/#tokenomics">https://mrmint.io/#tokenomics</a></p>
                                </AccordionItemPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        Who are the people behind Mr Mint? Where can I read about the team?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>
                                        The Team behind the Mr Mint Project comes with expertise in the domain of over a decade. They have been active investors, traders, miners, as well as have a technical background that grew hand-in-hand with the growth of the domain. <br />Keeping in line with the culture of crypto and blockchain, the team has chosen to be pseudonymous. The project’s potential is backed by the extensive research, experience, and learnings of the team, and they envision the project shining in the light of its own progress, to stand on its own merits. It allows Mr Mint to be who it really is.
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        How do Mining Rewards Work?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>
                                        All of the mining rewards, i.e. the $BTC earned from mining is added to the liquidity and market cap of $MNT, or in other words, used to purchase $MNT tokens, some of which are immediately burned after purchase. This not only increases the price of $MNT but also decreases the supply gradually giving you an asset to hold.
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        How do I purchase $MNT?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>
                                        To purchase $MNT, you need to have BNB. <br />If you’re looking for a step-by-step guide on how to buy $MNT Token, follow these: <br />
                                        <a target="_blank" style={{ color: '#11c2ff' }} href='https://www.youtube.com/watch?v=uLExgGXE_Vw'>How to create a Metamask Wallet and buy BNB </a> <br />
                                        <a target="_blank" style={{ color: '#11c2ff' }} href='https://www.youtube.com/watch?v=RcDDbU53SIY'>How to buy MNT</a>
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        I don't have a MetaMask Wallet. Can I still buy the Mr Mint token?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>
                                        To purchase $MNT, you can use a decentralized wallet like Trust Wallet or Metamask. If you’re looking for a step-by-step guide on how to create a MetaMask Wallet, follow this: <a target="_blank" style={{ color: '#11c2ff' }} href='https://www.youtube.com/watch?v=uLExgGXE_Vw'> How to create a Metamask Wallet to buy MNT.</a> <br />
                                        If you prefer Trust Wallet, follow this - <a target="_blank" style={{ color: '#11c2ff' }} href='images/trustwalletprocess.pdf'> How to create a Trust Wallet to buy MNT </a>
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        How does the $MNT Wallet Interface work?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>Once you connect your Metamask to access your $MNT Wallet Interface, you get several options that show you your $MNT holdings, staking, and referral earning data. <br />
                                        Staking Rewards: You earn $MNT against staked MNT depending on the number of months you have staked for.<br />
                                        Referral Rewards: You earn $MNT worth 5% of the deposit amount of all users using your unique referral ID.<br />
                                        Withdraw button: All staking rewards and referral rewards can be withdrawn via this button. Staking rewards can be withdrawn on a monthly basis. Withdrawals can be made to the connected metamask wallet.
                                    </p>
                                    <p>For a detailed explanation you may watch this guide: <a target="_blank" style={{ color: '#11c2ff' }} href='https://www.youtube.com/watch?v=FrHaUd0rXog'>  Guide on the Wallet Interface</a></p>
                                </AccordionItemPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        I have purchased $MNT but don't know how to stake? How does $MNT Staking work?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>When you visit mrmint.io and connect your wallet, you get to see how many $MNT you currently hold. These tokens remain vested for 9 months from the date of purchase. But you have the opportunity to stake them and earn from staking during the vesting period. To know how to stake your MNT refer this guide: <br />

                                        <a target="_blank" style={{ color: '#11c2ff' }} href='https://www.youtube.com/watch?v=FrHaUd0rXog'>Here’s a guide on the Wallet Interface and how you can stake MNT</a>

                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        When can I withdraw my Staking Rewards?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>Staking rewards will reflect in your staking earnings on a monthly basis. They can be withdrawn on a monthly basis too. Staking rewards cannot be vested, but they can be traded immediately.</p>
                                    <p></p>
                                </AccordionItemPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        Why can’t I trade $MNT soon after I buy? Why are my tokens locked and what is the vesting period?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>When you buy $MNT, your tokens are locked for a period of 9 months from the date of purchase. We do this to protect investors from price fluctuations or what is largely known as ‘pump and dump’ in the crypto world. Waiting for a predetermined duration means that the token will have stability in price, and early investors can use our staking mechanism to benefit and receive rewards. <br />You can refer to the table below that explains the vesting schedule:</p>
                                    <div style={{overflowX:"scroll"}}>
                                    <table class="table text-center" border="1px" width="100%">
                                        <thead>
                                            <tr>
                                                <th>Phase</th>
                                                <th>Token Price</th>
                                                <th>Vesting Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Private Sale</td>
                                                <td>$0.054</td>
                                                <td>5% unlock every month, after 9 months of purchase</td>
                                            </tr>
                                            <tr>
                                                <td>Pre Sale</td>
                                                <td>$0.094</td>
                                                <td>8% unlock every month, after 9 months of purchase</td>
                                            </tr>
                                            <tr>
                                                <td>Public Sale</td>
                                                <td>$0.15</td>
                                                <td>10% unlock every month, after 9 months of purchase</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                    <p></p>
                                </AccordionItemPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        Something is not working for me. Where can I contact the Mr Mint team?
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>We are happy to help you. In case you need anything, Don’t hesitate to contact us here:<a target="_blank" style={{ color: '#11c2ff' }} href="https://mrmint.io/contactus"> https://mrmint.io/contact </a>
                                        Or DM us on any of our social media accounts.<br />
                                        Also note that the Mr Mint team will never contact you directly or ask for any of your information.
                                    </p>
                                    <p></p>
                                </AccordionItemPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        Someone is messaging me about $MNT and asking for my keys, wallets, funds or seed phrase.
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>Never give anyone your Wallet Keys or insert them into any links on the internet. The $MNT team will never ask you for any of this information. Beware of scammers and anyone that seems suspicious. Always ask in the public chat and wait for a response from an official admin or team member if you are uncertain.
                                    </p>
                                    <p></p>
                                </AccordionItemPanel>
                            </AccordionItem>
                        </Accordion>
                       </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )

}
export default Faq;