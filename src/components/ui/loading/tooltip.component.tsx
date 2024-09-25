import React, { useState } from 'react';
import styled from 'styled-components';

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

type TTooltipType = 'info' | 'warning' | 'danger';

const TooltipText = styled.div<{ visible: boolean, type: TTooltipType }>`
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  font-size: small;
  background-color: ${({ type, theme }) => {
        switch (type) {
            case 'info':
                return theme.colors.blueMedium;
            case 'warning':
                return  theme.colors.yellow;
            case 'danger':
                return theme.colors.red;
            default:
                return theme.colors.blueMedium;
        }
    }};
  color:  ${({ theme }) => theme.colors.text};
  text-align: center;
  padding: 6px 1.5rem;
  border-radius: 12px;
  position: absolute;
  bottom: 125%; 
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;

  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.5s ease;
  z-index: 9999;


`;

interface TooltipProps {
    text: string;
    type?: TTooltipType;
    children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, type = 'info', children }) => {

    const [visible, setVisible] = useState(false);

    const showTooltip = () => setVisible(true);
    const hideTooltip = () => setVisible(false);

    return (
        <TooltipContainer
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
        >
            {children}
            <TooltipText type={type} visible={visible}>{text}</TooltipText>
        </TooltipContainer>
    );
};

export default Tooltip;
