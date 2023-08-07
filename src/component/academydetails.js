import React, { useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Academyheader from '../directives/academyheader'
import Academyfooter from '../directives/academyfooter'
import { getLatestReleasesDetailsAction, getRecentReleasesAction } from '../Action/user.action';
import 'react-accessible-accordion/dist/fancy-example.css';
import { useParams } from 'react-router-dom';

const Academydetails = () => {

  const [latestReleasesDetails, setLatestReleasesDetails] = useState([]);
  const [recentReleasesDetails, setRecentReleasesDetails] = useState([]);
  const { id } = useParams();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  const TYPING_SPEED = 150;
  const DELETING_SPEED = 30;

  class Typer extends React.Component {

    state = {
      text: '',
      isDeleting: false,
      loopNum: 0,
      typingSpeed: TYPING_SPEED
    }

    componentDidMount() {
      this.handleType();
    }

    handleType = () => {
      const { dataText } = this.props;
      const { isDeleting, loopNum, text, typingSpeed } = this.state;
      const i = loopNum % dataText.length;
      const fullText = dataText[i];

      this.setState({
        text: isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1),
        typingSpeed: isDeleting ? DELETING_SPEED : TYPING_SPEED
      });

      if (!isDeleting && text === fullText) {
        setTimeout(() => this.setState({ isDeleting: true }), 500);
      } else if (isDeleting && text === '') {
        this.setState({
          isDeleting: false,
          loopNum: loopNum + 1
        });
      }

      setTimeout(this.handleType, typingSpeed);
    };

    render() {
      return (
        <span>&nbsp;{this.props.heading}&nbsp;
          <span>{this.state.text}</span>
          <span id="cursor"></span>
        </span>
      );
    }
  }

  useEffect(() => {
    getLatestReleasesDetailsAPI();
    getRecentReleasesAPI();
  }, []);

  const getLatestReleasesDetailsAPI = async () => {
    let res = await getLatestReleasesDetailsAction({ 'id': id });
    if (res.success) {
      setLatestReleasesDetails(res.data)
    }
  }

  const getRecentReleasesAPI = async () => {
    let res = await getRecentReleasesAction();
    if (res.success) {
      setRecentReleasesDetails(res.data)
    }
  }

  return (

    <>
      <Academyheader />

      <div className='articaldetails-block' id="content">
        <div className='mrpage-title-block'>
          <div className='container'>
            <h4>
              {latestReleasesDetails?.title}
            </h4>
          </div>
        </div>

        <section className='academydetails-item'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-9 col-md-8 col-sm-12'>
                <div className='academydetails-conatnt'>
                  <div className='imgbox-block'>
                    {latestReleasesDetails.images ?
                      <img src={`${config.imageUrl + latestReleasesDetails.images}`} alt="Image" />
                      :
                      <img src="images/no-image.png" alt="Image" />
                    }
                  </div>

                  <p>
                    <div
                      dangerouslySetInnerHTML={{ __html: latestReleasesDetails?.description }}
                    />
                  </p>

                </div>
              </div>

              <div className='col-lg-3 col-md-4 col-sm-12'>
                <div className='academydetails-reartical'>
                  <h2 className='rarticaltitle'>Recent Releases</h2>
                  <div className='rarticaltitle-list'>

                    {recentReleasesDetails.map(data => (
                      <div className='rarticaltitle-item'>
                        <div className='imgbox-block'>
                          {data.images ?
                            <img src={`${config.imageUrl + data.images}`} alt="Image" />
                            :
                            <img src="images/no-image.png" alt="Image" />
                          }
                        </div>
                        <h4>
                          <a href={`${config.baseUrl}academydetails/` + data.id}>
                            <span style={{ color: '#3f4b52' }}>{data?.title}</span>
                          </a>
                        </h4>
                      </div>
                    ))}

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* <section className='academydetails-item'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-9 col-md-8 col-sm-12'>
                <div className='academydetails-conatnt'>
                  <h2>
                    Transformation Of Money: From Barter through Paper to Bitcoin
                  </h2>
                  <div className='imgbox-block'>
                    <img src="images/academy/academyArtical1.png" alt="Image" />
                  </div>
                  <p>
                    With the rise of humanity and the creation of an ever-widening range of necessities for life, money has been around ever since. In the course of history, people have paid for goods and services using a variety of commodities and other mechanisms, with bartering being the earliest system ever devised for exchanging products, and it has been in use for thousands of years.
                  </p>
                  <p>
                    But before anything can represent value to any extent, the majority of individuals must have confidence that it is indeed valuable and will remain so for a long enough time to be redeemed in the future.
                  </p>
                  <p>
                    It is essential to quickly examine the generally accepted definition of money before continuing to break down its transformation. Money is a thing that is widely acknowledged as a means of economic exchange and serves as the medium for expressing values and pricing. It is a widely recognized system for determining prices and accepting payment.
                  </p>

                  <div className='acinfo-item'>
                    <h4>History of Money </h4>
                    <p>
                      The world once placed its trust in something to stand in for money thousands of years ago, but through the process, certain problems forced us to alter our model of trust — and that is how money has continued to transform up until the present.
                    </p>
                    <p>
                      Money has gone through five key stages in one manner or another, including:
                    </p>
                    <ul className='navbar'>
                      <li className='nav-item'>
                        <p>
                          Bartering System
                        </p>
                      </li>
                      <li className='nav-item'>
                        <p>
                          Commodity Exchange Period
                        </p>
                      </li>
                      <li className='nav-item'>
                        <p>
                          Metallic Money
                        </p>
                      </li>
                      <li className='nav-item'>
                        <p>
                          Paper Money
                        </p>
                      </li>
                      <li className='nav-item'>
                        <p>
                          Fiat money (Banknotes)
                        </p>
                      </li>
                      <li className='nav-item'>
                        <p>
                          Digital Currency
                        </p>
                      </li>
                    </ul>
                    <p>
                      Let's examine each one in turn to gain a deeper knowledge of the evolution of money, how each of them functions, and their limitations prior to the emergence of digital currencies like Bitcoin.
                    </p>
                  </div>

                  <div className='acinfo-item'>
                    <h4>Bartering System </h4>
                    <p>
                      The history of money in some form or another, according to Investopedia, dates back at least 5,000 years. Apparently, before actual money came into existence, all of those historians were conducting business with one another, utilizing a trading system known as the "Barter system." This served as the backbone of the early economy. The history of money in some form or another, according to Investopedia, dates back at least 5,000 years. Apparently, before actual money came into existence, all of those historians were conducting business with one another, utilizing a trading system known as the <b>"Barter system."</b> This served as the backbone of the early economy. The way the bartering system operated is straightforward. For instance, a hunter may trade some meat for medical care with a healer, and a farmer might trade a yam tuber for some shoes with a shoemaker, and so on. Barter is ineffective because it involves the direct exchange of commodities and services between parties. For instance, if a person has cows and needs bananas, they would not only need to find a person who has bananas but also a person who needs meat.
                      It is also true to say that this system calls for inequality in the benefits that follow a trade for both sides. There were no effective methods for determining if party A received the same quantity or value as what party B dropped. This is because of the differences in the goods or properties each party drops.
                    </p>
                    <p>
                      However, human beings came up with what is referred to as “<b>commodity money</b>” to solve these problems with the <b>bartering system</b>.
                    </p>
                  </div>

                  <div className='acinfo-item'>
                    <h4>
                      Commodity money
                    </h4>
                    <p>
                      Simply said, a commodity is a basic good that almost everyone in a community can utilize. Skin, raw silver, tobacco, salt, cows, and other items come to mind. Due to their inherent usefulness, people once used these goods as currency. In many instances, they could be negotiated in value and served as the exchange's currency. This trading technique was widespread and is still in use today in some parts of the world. However, there are several problems with the system to which humans had to adjust.
                    </p>
                    <p>
                      For instance, moving animals or transporting heavy items became incredibly challenging. Also, because there was a great likelihood that these products would spoil quickly, individuals could no longer keep them conveniently.
                    </p>
                    <p>
                      However, this prompted a quest for a new kind of money, giving rise to the concept of "<b>metallic money.</b>"
                    </p>
                  </div>

                  <div className='acinfo-item'>
                    <h4>Metallic money</h4>
                    <p>
                      Around 770 BC, China switched from using tools, items, and weapons as a means of commerce to using smaller reproductions manufactured from the same bronze objects. This served as the introduction of the first coins. These metallic coins include those made of metals including gold, silver, bronze, nickel, and others.
                    </p>
                    <p>
                      These coins have images stamped on them to serve as a denomination. These kinds of establishments are now referred to as mints, and minting is the action of producing money in this manner.
                    </p>
                    <p>
                      This transactional approach also produced a number of issues because it was cumbersome to transport, jingling when in use, difficult to utilize for carrying out large transactions, etc. Some of these issues prompted China to create paper currency in 700 BC.
                    </p>
                  </div>

                  <div className='acinfo-item'>
                    <h4> Paper money </h4>
                    <p>
                      Prior to the banks eventually switching to using paper banknotes for depositors and borrowers to carry around in place of metal coins, some parts of Europe were still using metal coins as their only form of payment up to the 16th century.
                    </p>
                    <p>
                      During this time, banks, private organizations, or the government would offer to buy your gold bar, say one weighing $100, in exchange for receipt certificates known as bills in the sum of $100. Pieces of paper were not only significantly lighter to carry, but you could easily spend $2 on a cup of coffee without having to crush your bar of gold.
                    </p>
                    <p>
                      One could make purchases using this paper money, as it functioned similarly to how money operates in the world today. But if you wanted your gold back, all you had to do was return the $100 bill to the bank and get your gold back.
                    </p>
                    <p>
                      This was how paper began its use as money as an instrument of practicality and convenience, as it is evident in how it increased the possibility of international trade.
                    </p>
                  </div>

                  <div className='acinfo-item'>
                    <h4> Fiat Money
                    </h4>
                    <p>
                      Currency conflicts result in the change from paper money to fiat money (currency backed by the government). As a result, the connection between paper receipts and the gold they represent broke down over time as a result of microeconomic developments. Competition among nations frequently resulted in currency wars, in which contending nations sought to alter the value of the rival's currency by raising it and making the enemy's commodities prohibitively expensive, lowering it and weakening the enemy's purchasing power, or totally eradicating it.
                    </p>
                    <p>
                      People stopped using gold-backed money and instead started using receipts that are only supported by the word of the government. Trust enabled this to happen. People trusted the government, so fiat money was created even though there is no physical good to back it.
                    </p>
                    <p>
                      This is the origin of all currencies, including dollars, euros, and others. The Latin term "fiat" means "let it be done", which is similar to a decree. In other words, these currencies are valuable because the governments want them to be. They are referred to as a legal tender, which means that everyone in a particular jurisdiction must accept them.
                    </p>
                    <p>
                      Fiat currency's two major flaws are centralization and unlimited supply. Fiat money is issued solely under the supervision of the government and central bank, allowing them total control over how people spend their money. The government may also decide to print more money at any time, which would reduce the purchasing power of the money held by citizens.
                    </p>
                    <p>
                      Because of government-backed currencies and the current financial system, people's lives might as well be at risk because they have practically given their whole life savings to the banks and the government (yes, we’re also referring so several money scams coming up in the news where innocent individuals have lost their life savings).
                    </p>
                  </div>

                  <div className='acinfo-item'>
                    <h4>
                      So, how was Cryptocurrency created?
                    </h4>
                    <p>
                      The future of money was born in 2009 as a result of problems with trust between the citizens and the government. An article titled<a href='#'> Bitcoin: A Peer-to-Peer Electronic Cash System </a> was published on the internet on October 31, 2008, under the pseudonym<b> Satoshi Nakamoto</b>.
                    </p>
                    <p>
                      This study inspired the creation of a decentralized monetary system that would give everyone complete authority over their money, taking control away from the government and banks. However, Bitcoin started a revolution that gave rise to cryptocurrencies (money that can neither be seen nor touched but is real). Instead of being issued by governments or financial institutions, Bitcoin is issued through a process called “mining.” To solve transaction-related algorithms (or simply put, complex mathematical problems) that validate bitcoin transactions, bitcoin miners employ specialized software and receive a specific quantity of bitcoin in exchange for this effort.
                    </p>
                    <p>
                      However, people are always willing to mine bitcoin, but not everyone is able to afford the experience and resources it requires. That is why Mr Mint makes it possible for everyone, regardless of technical know-how and amount of funds, to gain access to the rewards generated from bitcoin mining.
                    </p>
                    <p>
                      Even though mining is not the only way to get bitcoin, it can be gotten from crypto exchanges — mining still serves as one of the best ways of getting the massively sought-after currency.
                    </p>
                  </div>

                  <div className='acinfo-item'>
                    <h4>
                      How many Cryptocurrencies are there?
                    </h4>
                    <p>
                      More than 20,000 cryptocurrency models have been created as a result of the concept behind Bitcoin (BTC), and they are all categorized into four main groups as follows:
                    </p>
                    <ul className='navbar'>
                      <li className='nav-item'>
                        <p>
                          Bitcoin
                        </p>
                      </li>
                      <li className='nav-item'>
                        <p>
                          Altcoins (alternative coins)
                        </p>
                      </li>
                      <li className='nav-item'>
                        <p>
                          Stablecoins
                        </p>
                      </li>
                      <li className='nav-item'>
                        <p>
                          Meme coins
                        </p>
                      </li>
                    </ul>
                    <p>
                      Like Bitcoin, the majority of these cryptocurrencies are unbacked and derive all of their value from user trust. All these cryptocurrencies rely on a robust technology called “<b>blockchain.</b>”
                    </p>
                  </div>

                  <div className='acinfo-item'>
                    <h4>
                      What is blockchain technology?
                    </h4>
                    <p>
                      Blockchain is a decentralized, immutable database that makes it easier to track assets and record transactions in a network. This acts as an open digital ledger that is in charge of maintaining a permanent record (chain of blocks) of all previously confirmed transactions, serving as the fundamental building block of the majority of cryptocurrency networks.
                    </p>
                    <p>
                      In reality, central banks all over the world have started to look into what they refer to as "Central Bank Digital Currencies - CBDC" because they have come to see the advantages that digital assets and blockchain technology offer. Although it still has some centralization, this kind of money is related to cryptocurrencies.
                    </p>
                  </div>
                </div>
              </div>

              <div className='col-lg-3 col-md-4 col-sm-12'>
                <div className='academydetails-reartical'>
                  <h2 className='rarticaltitle'>Recent artical</h2>
                  <div className='rarticaltitle-list'>
                    <div className='rarticaltitle-item'>
                      <div className='imgbox-block'>
                        <img src="images/academy/academyArtical1.png" alt="Image" />
                      </div>
                      <h4>
                        Transformation Of Money: From Barter through Paper to Bitcoin
                      </h4>
                    </div>
                    <div className='rarticaltitle-item'>
                      <div className='imgbox-block'>
                        <img src="images/academy/academyArtical2.png" alt="Image" />
                      </div>
                      <h4>
                        Bitcoin and All you Need to Know
                      </h4>
                    </div>
                    <div className='rarticaltitle-item'>
                      <div className='imgbox-block'>
                        <img src="images/academy/academyArtical3.png" alt="Image" />
                      </div>
                      <h4>
                        Make sure you know this before you Start with Crypto
                      </h4>
                    </div>

                    <div className='rarticaltitle-item'>
                      <div className='imgbox-block'>
                        <img src="images/academy/academyArtical1.png" alt="Image" />
                      </div>
                      <h4>
                        Transformation Of Money: From Barter through Paper to Bitcoin
                      </h4>
                    </div>
                    <div className='rarticaltitle-item'>
                      <div className='imgbox-block'>
                        <img src="images/academy/academyArtical2.png" alt="Image" />
                      </div>
                      <h4>
                        Bitcoin and All you Need to Know
                      </h4>
                    </div>
                    <div className='rarticaltitle-item'>
                      <div className='imgbox-block'>
                        <img src="images/academy/academyArtical3.png" alt="Image" />
                      </div>
                      <h4>
                        Make sure you know this before you Start with Crypto
                      </h4>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </div>
      <Academyfooter />
    </>
  )
}
export default Academydetails;