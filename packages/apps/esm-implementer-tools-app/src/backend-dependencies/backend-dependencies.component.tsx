import React, { Fragment, useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable, {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
} from "carbon-components-react/es/components/DataTable";
import {
  FrontendModule,
  hasInvalidDependencies,
} from "./openmrs-backend-dependencies";

export interface ModuleDiagnosticsProps {
  setHasAlert(value: boolean): void;
  frontendModules: Array<FrontendModule>;
}

export const ModuleDiagnostics: React.FC<ModuleDiagnosticsProps> = ({
  frontendModules,
  setHasAlert,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    setHasAlert(hasInvalidDependencies(frontendModules));
  }, [frontendModules]);

  const headers = useMemo(
    () => [
      {
        key: "name",
        header: t("moduleName", "Module Name"),
      },
      {
        key: "installedVersion",
        header: t("installedVersion", "Installed Version"),
      },
      {
        key: "requiredVersion",
        header: t("requiredVersion", "Required Version"),
      },
    ],
    [t]
  );

  return (
    <div>
      <DataTable rows={[]} headers={headers}>
        {({ headers, getTableProps, getHeaderProps }) => (
          <TableContainer title="">
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {frontendModules.map((esm) => (
                  <Fragment key={esm.name}>
                    <TableRow>
                      <TableCell>
                        <strong>{esm.name}</strong>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    {esm.dependencies.map((dep) => (
                      <TableRow key={dep.name}>
                        <TableCell>{dep.name}</TableCell>
                        <TableCell>
                          {dep.type === "missing" ? (
                            <span style={{ color: "red" }}>
                              {t("missing", "Missing")}
                            </span>
                          ) : dep.type === "version-mismatch" ? (
                            <span style={{ color: "red" }}>
                              {dep.installedVersion}
                            </span>
                          ) : (
                            <span style={{ color: "green" }}>
                              {dep.installedVersion}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>{dep.requiredVersion}</TableCell>
                      </TableRow>
                    ))}
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
    </div>
  );
};
