import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import CreateVMHorizontalNav from './CreateVMHorizontalNav/CreateVMHorizontalNav';
import CustomizeVirtualMachine from './customize/CustomizeVirtualMachine';
import { WizardVMContextProvider } from './utils/WizardVMContext';
import Wizard from './wizard/Wizard';

const Catalog: React.FC = () => {
  return (
    <WizardVMContextProvider>
      <Switch>
        <Route
          path={[
            '/k8s/ns/:ns/templatescatalog/customize',
            '/k8s/all-namespaces/templatescatalog/customize',
          ]}
          component={CustomizeVirtualMachine}
        />
        <Route
          path={[
            '/k8s/ns/:ns/templatescatalog/review',
            '/k8s/all-namespaces/templatescatalog/review',
          ]}
          component={Wizard}
        />
        <Route component={CreateVMHorizontalNav} />
      </Switch>
    </WizardVMContextProvider>
  );
};
export default Catalog;
