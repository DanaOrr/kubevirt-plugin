import React from 'react';
import produce from 'immer';
import { DESCHEDULER_URL } from 'src/views/templates/utils/constants';
import { isDeschedulerOn } from 'src/views/templates/utils/utils';

import { useDeschedulerInstalled } from '@kubevirt-utils/hooks/useDeschedulerInstalled';
import { useIsAdmin } from '@kubevirt-utils/hooks/useIsAdmin';
import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import { V1Template } from '@kubevirt-utils/models';
import { getTemplateVirtualMachineObject } from '@kubevirt-utils/resources/template';
import { DESCHEDULER_EVICT_LABEL } from '@kubevirt-utils/resources/vmi';
import { ensurePath } from '@kubevirt-utils/utils/utils';
import {
  Button,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTermHelpText,
  DescriptionListTermHelpTextButton,
  Popover,
  Switch,
} from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';

type DeschedulerProps = {
  onSubmit?: (updatedTemplate: V1Template) => Promise<V1Template | void>;
  template: V1Template;
};

const Descheduler: React.FC<DeschedulerProps> = ({ onSubmit, template }) => {
  const { t } = useKubevirtTranslation();
  const isDeschedulerInstalled = useDeschedulerInstalled();
  const isAdmin = useIsAdmin();
  const [isChecked, setIsChecked] = React.useState<boolean>(isDeschedulerOn(template));
  const isDeschedulerEnabled = isAdmin && isDeschedulerInstalled;

  const updatedDeschedulerTemplate = (checked: boolean) => {
    return produce<V1Template>(template, (draft: V1Template) => {
      const draftVM = getTemplateVirtualMachineObject(draft);
      ensurePath(draftVM, 'spec.template.metadata.annotations');
      if (!draftVM.spec.template.metadata.annotations)
        draftVM.spec.template.metadata.annotations = {};
      if (checked) {
        draftVM.spec.template.metadata.annotations[DESCHEDULER_EVICT_LABEL] = 'true';
      } else {
        delete draftVM.spec.template.metadata.annotations[DESCHEDULER_EVICT_LABEL];
      }
      onSubmit(draft);
    });
  };
  return (
    <DescriptionListGroup>
      <DescriptionListTermHelpText>
        <Popover
          bodyContent={
            <>
              {t(
                'The Descheduler can be used to evict a running VirtualMachine so that the VirtualMachine can be rescheduled onto a more suitable Node via a live migration.',
              )}
              <div className="margin-top">
                <Button
                  className="no-left-padding"
                  component="a"
                  href={DESCHEDULER_URL}
                  icon={<ExternalLinkAltIcon />}
                  iconPosition="right"
                  target="_blank"
                  variant="link"
                >
                  {t('Learn more')}
                </Button>
              </div>
            </>
          }
          hasAutoWidth
          headerContent={t('Descheduler')}
          maxWidth="30rem"
        >
          <DescriptionListTermHelpTextButton>{t('Descheduler')}</DescriptionListTermHelpTextButton>
        </Popover>
      </DescriptionListTermHelpText>

      <DescriptionListDescription>
        <Switch
          onChange={(checked) => {
            setIsChecked(checked);
            updatedDeschedulerTemplate(checked);
          }}
          id="descheduler-switch"
          isChecked={isChecked}
          isDisabled={!isDeschedulerEnabled}
        />
      </DescriptionListDescription>
    </DescriptionListGroup>
  );
};

export default Descheduler;
