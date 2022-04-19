import * as React from 'react';

import { V1Template } from '@kubevirt-ui/kubevirt-api/console';
import { Action } from '@openshift-console/dynamic-plugin-sdk';
import { Dropdown, DropdownItem, DropdownPosition, KebabToggle } from '@patternfly/react-core';

import useVirtualMachineTemplatesActions from './hooks/useVirtualMachineTemplatesActions';

type VirtualMachineTemplatesActionsProps = { template: V1Template };

const VirtualMachineTemplatesActions: React.FC<VirtualMachineTemplatesActionsProps> = ({
  template,
}) => {
  // const { t } = useKubevirtTranslation();
  const actions = useVirtualMachineTemplatesActions(template);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = (action: Action) => {
    if (typeof action?.cta === 'function') {
      action?.cta();
      setIsOpen(false);
    }
  };

  return (
    // TODO: use LazyActionMenu when fixed
    <Dropdown
      isPlain
      isOpen={isOpen}
      position={DropdownPosition.right}
      toggle={<KebabToggle onToggle={setIsOpen} />}
      dropdownItems={actions?.map((action) => (
        <DropdownItem
          key={action?.id}
          onClick={() => handleClick(action)}
          isDisabled={action?.disabled}
          description={action?.disabled && action?.description}
        >
          {action?.label}
        </DropdownItem>
      ))}
    />
  );
};

export default VirtualMachineTemplatesActions;