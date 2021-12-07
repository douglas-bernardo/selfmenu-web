import styled, { css } from 'styled-components';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { lighten } from 'polished';

interface BadgeProps {
  hasUnread: boolean;
}

interface NotificationProps {
  unread?: boolean;
}

interface NotificationListProps {
  visible: boolean;
}

export const Container = styled.div`
  position: relative;
  margin-right: 20px;
`;

export const Badge = styled.button<BadgeProps>`
  background: none;
  border: 0;
  position: relative;

  ${props =>
    props.hasUnread &&
    css`
      &::after {
        position: absolute;
        right: 0;
        top: 0;
        width: 8px;
        height: 8px;
        background: #ff365f;
        content: '';
        border-radius: 50%;
      }
    `}
`;

export const NotificationList = styled.div<NotificationListProps>`
  position: absolute;
  width: 280px;
  left: calc(50% - 130px);
  top: calc(100% + 30px);
  background: #fff;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 40%) 4px 4px 4px 2px;
  transition: opacity 0.2s ease 0s, visibility 0.2s ease 0s;
  padding: 15px 5px;
  display: ${props => (props.visible ? 'block' : 'none')};
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 20px);
    top: -20px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #fff;
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 300px;
  padding: 5px 15px;
  color: #acacac;

  h4 {
    flex: 1;
    text-align: center;
  }
`;

export const Notification = styled.div<NotificationProps>`
  color: #3c3c3c;

  & + div {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #e8ebf2;
  }

  p {
    font-size: 13px;
    line-height: 18px;
  }

  time {
    font-size: 12px;
    opacity: 0.6;
  }

  button {
    font-size: 12px;
    border: 0;
    background: none;
    color: ${lighten(0.2, '#ff365f')};
    padding: 0 5px;
    margin: 0 5px;
    border-left: 1px solid #e8ebf2;
  }

  ${props =>
    props.unread &&
    css`
      &::after {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #ff365f;
        border-radius: 50%;
      }
    `}
`;
