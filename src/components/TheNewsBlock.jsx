import { useState, useRef, useEffect } from 'react'
import './TheNewsBlock.sass'
import { Button, Typography } from 'antd'
import infoIcon from '../assets/InfoSquare.svg'
import squareIcon from '../assets/Square.svg'
import checkSquareIcon from '../assets/CheckSquare.svg'
import bookOpen from '../assets/BookOpen.svg'
import userLine from '../assets/User1Line.svg'
import downArrow from '../assets/BxsDownArrow.svg'
import upArrow from '../assets/BxsUpArrow.svg'

const { Text, Link } = Typography;

const sentimentColor = {
    positive: 'sentiment-positive',
    negative: 'sentiment-negative',
    neutral: 'sentiment-neutral'
  };

export default function TheNewsBlock({ news }) {
    const [selected, setSelected] = useState(false) //Состояние для кнопки выбора новости up-info-container__button-select
    const [isExpanded, setIsExpanded] = useState(false); //Состояние для скрытия текста
    // Состояние для скрытия тегов, если они не помещаются на строке
    const [showAllKeywords, setShowAllKeywords] = useState(false);
    const [visibleCount, setVisibleCount] = useState(news.KW.length);
    const keywordsContainerRef = useRef(null);

    
    const toggleIcon = () => setSelected(prev => !prev)    
    const toggleExpand = () => {
      setIsExpanded((prev) => !prev);
    };
  
    const highlightedHTML = news.HIGHLIGHTS
        .join('\n')
        .replace(/<kw>(.*?)<\/kw>/g, '<span class="highlighted-keyword">$1</span>'); //Замена тегов <kw></kw> на <span></span> в мок-данных

    // Хук для определения количества тегов, которые помещаются в строку, если не помещаются - отображение останавливается и появляется кнопка с кол-вом скрытых тегов
        useEffect(() => {
            if (!showAllKeywords && keywordsContainerRef.current) {
              const container = keywordsContainerRef.current;
              const containerWidth = container.offsetWidth;
              const children = Array.from(container.children);
              let totalWidth = 0;
              let count = 0;
        
              for (let child of children) {
                const childWidth = child.offsetWidth + 8;
                if (totalWidth + childWidth > containerWidth) break;
                totalWidth += childWidth;
                count++;
              }
        
              setVisibleCount(count);
            }
          }, [showAllKeywords, news.KW]);
    
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
                <div className={`news-block__main ${isExpanded ? 'expanded' : ''}`}>
                    <p
                        className="news-block__main-text"
                        dangerouslySetInnerHTML={{ __html: highlightedHTML }}
                    />
                    {highlightedHTML.length > 400 && (
                        <button
                            className="news-block__main-text__show-more-button"
                            onClick={toggleExpand}
                        >
                            {isExpanded ? 'Show less' : 'Show more'}
                            <img
                                className="button-arrow"
                                src={isExpanded ? upArrow : downArrow}
                                alt=""
                            />
                        </button>
                    )}
                </div>
                <div 
                    className={`news-block__keywords ${showAllKeywords ? 'keywords--wrapped' : ''}`}
                    ref={keywordsContainerRef}
                >
                    {(showAllKeywords ? news.KW : news.KW.slice(0, visibleCount)).map((keyword, index) => (
                        <div key={index} className='keywords__keyword-tag'>
                            <span className='keyword-tag__value semi-transparent-text-m'>{keyword.value}</span>
                            <span className='keyword-tag__count accent-text-m'>{keyword.count}</span>
                        </div>
                    ))}
                    {/* Кнопка, показывающая теги */}
                    {!showAllKeywords && news.KW.length > visibleCount && (
                        <button
                            className="keywords__show-more-button"
                            onClick={() => setShowAllKeywords(true)}
                        >
                            Show all +{news.KW.length - visibleCount}
                        </button>
                    )}
                    {/* Кнопка, скрывающая теги */}
                    {showAllKeywords && news.KW.length > visibleCount && (
                        <button
                            className="keywords__show-more-button"
                            onClick={() => setShowAllKeywords(false)}
                        >
                            Show less
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}