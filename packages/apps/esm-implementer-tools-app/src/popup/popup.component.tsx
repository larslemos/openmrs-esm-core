import React, { useState, useEffect } from "react";
import Close16 from "@carbon/icons-react/es/close/16";
import Button from "carbon-components-react/es/components/Button";
import ContentSwitcher from "carbon-components-react/es/components/ContentSwitcher";
import Switch from "carbon-components-react/es/components/Switch";
import styles from "./popup.styles.css";
import { useTranslation } from "react-i18next";
import { Configuration } from "../configuration/configuration.component";
import { ModuleDiagnostics } from "../backend-dependencies/backend-dependencies.component";
import { FrontendModule } from "../backend-dependencies/openmrs-backend-dependencies";
import { setHasAlert } from "../store";

interface DevToolsPopupProps {
  close(): void;
  frontendModules: Array<FrontendModule>;
  visibleTabIndex?: number;
}

export default function Popup(props: DevToolsPopupProps) {
  const { t } = useTranslation();
  const [configHasAlert] = useState(false);
  const [diagnosticsHasAlert, setDiagnosticsHasAlert] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(
    () => setHasAlert(configHasAlert || diagnosticsHasAlert),
    [diagnosticsHasAlert, configHasAlert]
  );

  return (
    <div className={styles.popup}>
      <div className={styles.topBar}>
        <div className={styles.tabs}>
          <ContentSwitcher
            onChange={(c) => {
              setActiveTab((c as any).index);
            }}
          >
            <Switch
              name="configuration-tab"
              text={t("configuration", "Configuration")}
              onClick={() => {}}
              onKeyDown={() => {}}
            />
            <Switch
              name="backend-modules-tab"
              text={t("backendModules", "Backend Modules")}
              onClick={() => {}}
              onKeyDown={() => {}}
            />
          </ContentSwitcher>
        </div>
        <div>
          <Button
            className={styles.closeButton}
            kind="secondary"
            renderIcon={Close16}
            iconDescription="Close"
            onClick={props.close}
            hasIconOnly
          />
        </div>
      </div>
      <div className={styles.content}>
        {activeTab == 0 ? (
          <Configuration />
        ) : (
          <ModuleDiagnostics
            setHasAlert={setDiagnosticsHasAlert}
            frontendModules={props.frontendModules}
          />
        )}
      </div>
    </div>
  );
}
