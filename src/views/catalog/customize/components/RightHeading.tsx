import * as React from 'react';

import { getTemplateOSIcon } from '@catalog/templatescatalog/utils/os-icons';
import { V1Template } from '@kubevirt-ui/kubevirt-api/console';
import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import {
  getTemplateDescription,
  getTemplateDocumentationURL,
  getTemplateName,
} from '@kubevirt-utils/resources/template/utils/selectors';
import { Button, Flex, FlexItem } from '@patternfly/react-core';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon';

type RightHeadingProps = {
  template: V1Template;
};

export const RightHeader: React.FC<RightHeadingProps> = ({ template }) => {
  const { t } = useKubevirtTranslation();
  if (!template?.metadata?.annotations) return null;

  const displayName = getTemplateName(template);
  const documentationLink = getTemplateDocumentationURL(template);
  const description = getTemplateDescription(template);
  const icon = getTemplateOSIcon(template);
  return (
    <div className="co-catalog-item-info customize-vm__right-header">
      <div>
        <Flex>
          <FlexItem>
            <img alt="os-icon" src={icon} />
          </FlexItem>

          <FlexItem>
            <h2 className="co-section-heading co-catalog-item-details__name">{displayName}</h2>
          </FlexItem>
        </Flex>
        {documentationLink && (
          <div>
            <Button
              className="pf-u-pl-0"
              component="a"
              href={documentationLink}
              icon={<ExternalLinkAltIcon />}
              iconPosition="right"
              target="_blank"
              variant="link"
            >
              {t('View documentation')}
            </Button>
          </div>
        )}
      </div>
      {description && <p className="co-catalog-item-details__description">{description}</p>}
    </div>
  );
};
