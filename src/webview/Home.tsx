import React, { useState } from 'react'
import Config from '../compoments/pravite/Config'
import { TextStyle, ImgStyle, BackgroundStyle } from '@src/types/style.type'
import './Home.less'

const initText = {
    content: '欢迎使用易头图',
    fontWeight: 300,
    fontSize: '54px',
    fontFamily: 'SourceHanSansCN-Bold',
    marginLeft: '0px',
    marginTop: '0px',
    marginRight: '0px',
    marginBottom: '0px',
    color: '#fff',
    switchText: true
}

const initImg = {

}

const initBackground = {
    background: '#2f2f2f'
}

const fontList = [{
    label: '思源-Bold',
    value: 'SourceHanSansCN-Bold',
}, {
    label: '思源-ExtraLight',
    value: 'SourceHanSansCN-ExtraLight',
}, {
    label: '思源-Heavy',
    value: 'SourceHanSansCN-Heavy',
}, {
    label: '思源-Light',
    value: 'SourceHanSansCN-Light',
}, {
    label: '思源-Medium',
    value: 'SourceHanSansCN-Medium',
}, {
    label: '思源-Normal',
    value: 'SourceHanSansCN-Normal',
}, {
    label: '思源-Regular',
    value: 'SourceHanSansCN-Regular',
}]

const Home: React.FC<{}> = () => {
    const [text, setText] = useState<TextStyle>(initText as TextStyle)
    const [img, setImg] = useState<ImgStyle>({} as ImgStyle)
    const [background, setBackground] = useState<BackgroundStyle>(initBackground)

    console.log('查看', text)

    return (
        <>
            <div className="banner" id="banner" style={background}>
                {text.switchText && <div style={text} className="banner-text">{text.content}</div>}
                {img.src && <img src={img.src} style={img} />}
            </div>
            <Config
                initText={text}
                setText={setText}
                setImg={setImg}
                fontList={fontList}
                initBackground={background}
                setBackground={setBackground}
                ></Config>
        </>
    )
}

export default Home
