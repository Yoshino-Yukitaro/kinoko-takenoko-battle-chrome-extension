import { defineManifest } from '@crxjs/vite-plugin';

const manifest = defineManifest({
  manifest_version: 3,
  name: "サクッときのこたけのこ戦争",
  version: "1.0.0",
  permissions: ["activeTab"],
  action: {
    default_popup: "popup/index.html",
  },
});

export default manifest;
