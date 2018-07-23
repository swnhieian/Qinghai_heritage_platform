import React, { Component } from 'react';
import './dist/style.css'
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
import styled from 'styled-components';

import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_business } from 'react-icons-kit/md/ic_business';
import { ic_business_center } from 'react-icons-kit/md/ic_business_center';
import { ic_format_list_bulleted } from 'react-icons-kit/md/ic_format_list_bulleted';
import { ic_people } from 'react-icons-kit/md/ic_people';
import { ic_shopping_cart } from 'react-icons-kit/md/ic_shopping_cart';

const BaseContainer = props =>
    <div
        style={{
            display: 'inline-block',
            paddingTop: 16,
            paddingBottom: 16,
            fontFamily: 'Roboto',
            width: 240,
            ...props.style
        }}
    >
        {props.children}
    </div>;

const Icon20 = props => <SvgIcon size={props.size || 20} icon={props.icon} />;
const Title = styled.div`
    padding: 12px;
`;

const Separator = styled.div`
    padding-right: 12px;
`;

class About extends Component {
  
  render() {
    const sideMenus = [
      {
        'id': 'a',
        'name': '竞技',
      },
      {
        'id': 'a',
        'name': '美术',
      },
      {
        'id': 'a',
        'name': '民俗',
      },
      {
        'id': 'a',
        'name': '曲艺',
      },
      {
        'id': 'a',
        'name': '手工艺',
      },
      {
        'id': 'a',
        'name': '文学',
      },
      {
        'id': 'a',
        'name': '舞蹈',
      },
      {
        'id': 'a',
        'name': '戏剧',
      },
      {
        'id': 'a',
        'name': '医药',
      },
      {
        'id': 'a',
        'name': '音乐',
      }
    ]
    return (
      <BaseContainer>
      <SideNav highlightBgColor="#00bcd4" defaultSelected="sales2">
        <Title> Basic SideNav </Title>
        <Nav id="dashboard">
            <NavIcon><Icon20 icon={ic_aspect_ratio} /></NavIcon>
            <NavText> Dashboard </NavText>
        </Nav>
        <Nav id="sales">
            <NavIcon><Icon20 icon={ic_business} /></NavIcon><NavText> Sales </NavText>
        </Nav>
        <Nav id="products">
            <NavIcon><Icon20 icon={ic_business_center} /></NavIcon>
            <NavText> Products </NavText>
        </Nav>
        <Nav id="customers">
            <NavIcon><Icon20 icon={ic_people} /></NavIcon>
            <NavText> Customers </NavText>
            <Nav id="dashboard2">
                <NavIcon><Icon20 size={16} icon={ic_aspect_ratio} /></NavIcon>
                <NavText> Search </NavText>
            </Nav>
            <Nav id="sales2">
                <NavIcon><Icon20 size={16} icon={ic_business} /></NavIcon>
                <NavText> Promote </NavText>
            </Nav>
            <Nav id="products2">
                <NavIcon><Icon20 size={16} icon={ic_business_center} /></NavIcon>
                <NavText> Social Media </NavText>
            </Nav>
        </Nav>
        <Nav id="orders">
            <NavIcon><Icon20 icon={ic_format_list_bulleted} /></NavIcon>
            <NavText> Orders </NavText>
        </Nav>
    </SideNav>
    </BaseContainer>
    );
  }
}

export default About;
