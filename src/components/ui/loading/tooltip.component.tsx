import React, { useState } from 'react';
import styled from 'styled-components';

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

type TTooltipType = 'info' | 'warning' | 'danger';

const TooltipText = styled.div<{ $visible: 'visible' | 'hidden', $type: TTooltipType }>`
  visibility: ${({ $visible }) => $visible};
  font-size: small;
  background-color: ${({ $type, theme }) => {
        switch ($type) {
            case 'info':
                return theme.colors.blueMedium;
            case 'warning':
                return theme.colors.yellow;
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

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.5s ease;
  z-index: 9999;
  &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        border-width: 3px;
        border-radius:  0 0 2px 2px;  
        border-style: solid;
        border-color: ${({ $type, theme }) => {
        switch ($type) {
            case 'info':
                return theme.colors.blueMedium;
            case 'warning':
                return theme.colors.yellow;
            case 'danger':
                return theme.colors.red;
            default:
                return theme.colors.blueMedium;
        }
    }} transparent transparent transparent;
 }


`;

interface TooltipProps {
    text: string;
    type?: TTooltipType;
    children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, type = 'info', children }) => {

    const [visible, setVisible] = useState<'visible' | 'hidden'>('hidden');

    const showTooltip = () => setVisible('visible');
    const hideTooltip = () => setVisible('hidden');

    return (
        <TooltipContainer
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
        >
            {children}
            <TooltipText $type={type} $visible={visible}>{text}</TooltipText>
        </TooltipContainer>
    );
};

export default Tooltip;
