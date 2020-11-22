import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Form, Input, InputNumber, Button, Row, Col, Switch, Select } from "antd";
import "@simonwep/pickr/dist/themes/monolith.min.css"; // 'monolith' theme
import { TextStyle, ImgStyle, BackgroundStyle, FontOption } from "@src/types/style.type";
import { TextConfig } from '@src/types/config.type'
import { removePx, textToConfig, configToText } from '@src/utils/index'
import './Config.less'
import { ChromePicker, CirclePicker } from 'react-color';
import domtoimage from 'dom-to-image';

const { Option } = Select;
const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

interface Props {
  setText: Dispatch<SetStateAction<TextStyle>>
  setImg: Dispatch<SetStateAction<ImgStyle>>
  setBackground: Dispatch<SetStateAction<BackgroundStyle>>
  initText: TextStyle
  initBackground: BackgroundStyle
  fontList: FontOption[]
}


const Config: React.FC<Props> = (props) => {
  const { initText, setText, setImg, initBackground, setBackground, fontList } = props
  const { content, color } = initText
  const initialValues = {
    text: {
      content,
      ...(textToConfig(initText)),
      color
    }
  }
  const onFinish = (values: any) => {
    console.log(values);
  };

  console.log('initialValues.text', initialValues.text)

  const onFormLayoutChange = (data: { text: TextConfig }) => {
    if (data.text.family) {
      const styleTag = document.getElementById('font-style')
      const fontValue = styleTag?.dataset.font;
      if (fontValue !== data.text.family) {
        styleTag?.parentNode?.removeChild(styleTag);
        const newTag = document.createElement('style')
        newTag.dataset.font = data.text.family
        newTag.id = 'font-style'
        const textNode = document.createTextNode(`
        @font-face {
          font-family: '${data.text.family}';
          src: url('./font/${data.text.family}.otf');
        }
        `);
        newTag.appendChild(textNode);
        document.head.appendChild(newTag)
      }
    }
    if (typeof data.text.switchText === 'undefined') {
      const textContent = configToText({
        ...initialValues.text,
        ...data.text
      })
      console.log('取消', initialValues.text, textContent)
      setText(textContent)
      return
    } else if( typeof data.text.switchText === 'boolean' ){
      setText(configToText({
        ...initialValues.text,
        ...data.text
      }))
      return
    }

  };

  const onChangeComplete = (color: any) => {
    console.log('initialValues.text', initialValues.text)
    setText(configToText({
      ...initialValues.text,
      color: color.hex
    }))
  }

  const onChangeCompleteBg = (color: any) => {
    setBackground({
      background: color.hex
    })
  }

  const downloadImg = () => {
    const node = document.querySelector('#banner') as any;
    // const clone_node = node.cloneNode(true)
    // clone_node.style.transform = 'scale(2)';
    const scale = 2
    domtoimage.toPng(node, {
      quality: 1,
      height: node.clientHeight * scale,
      width: node.clientWidth * scale,
      style: {
        transform: 'scale(' + scale + ')',
        transformOrigin: 'center center'
      }
    })
    .then(function (dataUrl: any) {
      console.log(dataUrl);
        var link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = dataUrl;
        link.click();
    });
  }

  useEffect(() => {
    
  }, [initText]);

  return (
    <Form
      style={{marginTop: '10px'}}
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      initialValues={initialValues}
      onValuesChange={onFormLayoutChange}
    >
      <Row>
        <Col span={6}>
          <Form.Item name={["text", "switchText"]} label="是否显示文字" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
        <Col span={6} offset={12} >
          <Button onClick={downloadImg} style={{float: 'right'}} type="primary" danger>下载</Button>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Form.Item name={["text", "content"]} label="内容">
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name={["text", "weight"]} label="字体粗细">
            <InputNumber step={100}/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name={["text", "size"]} label="字体大小">
            <InputNumber step={1}/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name={["text", "family"]} label="字体">
            <Select>
              {
                fontList.map(item => {
                  return (
                    <Option value={item.value} style={{ fontFamily: `"${item.value}"` }}>{item.label}</Option>
                  )
                })
              }
              
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Form.Item name={["text", "left"]} label="左边距">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name={["text", "right"]} label="右边距">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name={["text", "top"]} label="上边距">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name={["text", "bottom"]} label="下边距">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name={["text", "color"]} label="选择颜色">
            {/* <div className="color-picker"></div> */}
            <ChromePicker
              color={color}
              onChangeComplete={onChangeComplete}  
              ></ChromePicker>
          </Form.Item>
        </Col>
        <Col span={6} offset={6}>
          {/* <Form
            {...layout}> */}
            <Form.Item name={["img", "color"]} label="选择背景颜色">
            {/* <div className="color-picker"></div> */}
            <ChromePicker
              color={initBackground.background}
              onChangeComplete={onChangeCompleteBg}  
            ></ChromePicker>
            <p>常用色彩</p>
            <CirclePicker
              onChangeComplete={onChangeCompleteBg}  
              color={initBackground.background}
              colors={['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF', '#2F2F2F']}
              ></CirclePicker>
            </Form.Item>
          {/* </Form> */}
        </Col>
      </Row>
      {/* <Row> */}
        
      {/* </Row> */}
      {/* <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
    </Form>
  );
};

export default Config;
