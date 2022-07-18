// Node js dependencies
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const template = fs.readFileSync(
  `${__dirname}/template.html`,
  "utf-8",
  (err, data) => {
    if (err) throw err;
  }
);

const sampleEmailTemplate = {
  emailContent: template,
};
export { sampleEmailTemplate };