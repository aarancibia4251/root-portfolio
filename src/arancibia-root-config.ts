import { LifeCycles, registerApplication, start } from "single-spa";
(window as any).global = window;

registerApplication({
  name: "@arancibia/course",
  app: () => System.import<LifeCycles>("@arancibia/course"),
  activeWhen: ["/"],
});

start({
  urlRerouteOnly: true,
});
