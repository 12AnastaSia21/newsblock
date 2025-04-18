import { useState } from 'react'
import './TheNewsBlock.sass'
import { Button, Typography } from 'antd'
import infoIcon from '../assets/InfoSquare.svg'
import squareIcon from '../assets/Square.svg'
import checkSquareIcon from '../assets/CheckSquare.svg'
import bookOpen from '../assets/BookOpen.svg'
import userLine from '../assets/User1Line.svg'

const { Text, Link } = Typography;

const sentimentColor = {
    positive: 'sentiment-positive',
    negative: 'sentiment-negative',
    neutral: 'sentiment-neutral'
  };

export default function TheNewsBlock({ news }) {
    const [selected, setSelected] = useState(false) //Состояние для кнопки выбора новости up-info-container__button-select
    const toggleIcon = () => setSelected(prev => !prev)
    
    return (
        <>
            <div className='news-block'>
                <div className='news-block__up-info-container'>
                    <div className='up-info-container__statistical-info'>
                        <div className='up-info-container__date-of-publication semi-transparent-text-s'>
                        <span className='up-info-container__date-of-publication accent-text-s'>
                            {new Date(news.DP).toLocaleString('en-GB', { day: '2-digit' })}
                        </span>{' '}
                        {new Date(news.DP).toLocaleString('en-GB', {
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,}).replace(',', '')
                        }
                        </div>
                        <div className='up-info-container__reach semi-transparent-text-s'><span className='accent-text'>{news.REACH}</span> Reach</div>
                        <div className='up-info-container__traffic semi-transparent-text-s'>
                            Top traffic: {' '}
                            {news.TRAFFIC.map((item, index) => (
                                <span key={index} className="traffic-item-s">
                                    <span className="semi-transparent-text-s">{item.value}</span>:&nbsp;
                                    <span className="accent-text-s">{(item.count * 100).toFixed(1)}%</span>
                                    {index < news.TRAFFIC.length - 1 && ' '}
                                </span>))
                            }
                        </div>
                    </div>
                    <div className='up-info-container__statistical-button'>
                        <Button type="primary" size='small' className={`up-info-container__button-sentiment ${sentimentColor[news.SENT]}`}><p className='text-button'>{news.SENT}</p></Button>
                        <button className='up-info-container__button-info'><img src={infoIcon} alt=''/></button>
                        <button className='up-info-container__button-select' onClick={toggleIcon}><img src={selected ? checkSquareIcon : squareIcon} alt=''/></button>
                    </div>
                </div>
                <div className='news-block__headline'>
                    <Link className='news-block__headline-link' href={news.URL} target="_blank">{news.TI}</Link>
                </div>
                <div className='news-block__news-meta-info'>
                    <div className='news-meta-info__domain news-meta-info__block'>
                        <img className='news-meta-info__domain-favicon news-meta-info__icon' src={news.FAV}/>
                        <Link className='news-meta-info__domain-link semi-transparent-text-m'><u>{news.DOM}</u></Link>
                    </div>
                    <div className='news-meta-info__country news-meta-info__block'>
                        <img className='news-meta-info__country-flag news-meta-info__icon' src={`https://flagcdn.com/w40/${news.CNTR_CODE.toLowerCase()}.png`} alt={news.CNTR_CODE}/>
                        <p className='news-meta-info__country-name semi-transparent-text-m'>{news.CNTR}</p>
                    </div>
                    <div className='news-meta-info__language news-meta-info__block'>
                        <img className='news-meta-info__language-icon news-meta-info__icon' src={bookOpen}/>
                        <p className='news-meta-info__language-abbreviation semi-transparent-text-m'>{news.LANG}</p>
                    </div>
                    <div className='news-meta-info__author news-meta-info__block'>
                        <img className='news-meta-info__author-icon news-meta-info__icon' src={userLine}/>
                        <p className='news-meta-info__author-name semi-transparent-text-m'>{news.AU}</p>
                    </div>
                </div>
            </div>
        </>
    )
}