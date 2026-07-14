import windowsDataRaw from "./windows-data.json";
import headerToolsDataRaw from "./header-tools-data.json";
import leftMenuDataRaw from "./left-menu-data.json";
import servicesDataRaw from "./services-data.json";
import projectDataRaw from "./projects-data.json";

import { resolveIconPaths } from "@/utils/resolveIconPaths";

export const windowsData = resolveIconPaths(windowsDataRaw);
export const headerToolsData = resolveIconPaths(headerToolsDataRaw);
export const leftMenuData = resolveIconPaths(leftMenuDataRaw);
export const servicesData = resolveIconPaths(servicesDataRaw);
export const projectData = resolveIconPaths(projectDataRaw);
