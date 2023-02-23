import * as React from 'react';
import { FC, ReactNode } from 'react';

import { Popover, PopoverPosition } from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';

import './HelpTextIcon.scss';

type HelpTextIconProps = {
  bodyContent: ReactNode;
  position?: PopoverPosition;
  className?: string;
  helpIconClassName?: string;
};

const HelpTextIcon: FC<HelpTextIconProps> = (
  bodyContent,
  position = 'top',
  className = 'help-text-icon__popover',
  helpIconClassName = '',
) => (
  <Popover aria-label={'Help'} bodyContent={bodyContent} className={className} position={position}>
    <HelpIcon className={helpIconClassName} />
  </Popover>
);

export default HelpTextIcon;