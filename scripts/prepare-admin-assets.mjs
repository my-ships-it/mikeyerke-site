import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const sourcePath = path.join(projectRoot, "node_modules", "decap-cms", "dist", "decap-cms.js");
const destinationPath = path.join(projectRoot, "public", "admin", "decap-cms.js");

if (!fs.existsSync(sourcePath)) {
  console.warn("Decap CMS bundle not found. Run npm install before building.");
  process.exit(0);
}

fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
fs.copyFileSync(sourcePath, destinationPath);
console.log("Prepared Decap CMS bundle at public/admin/decap-cms.js");
