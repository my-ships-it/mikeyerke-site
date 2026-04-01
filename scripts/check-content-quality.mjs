import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const projectRoot = process.cwd();
const rootsToScan = ["app", "components", "content", "lib", "README.md"];
const allowedExtensions = new Set([".ts", ".tsx", ".md", ".mdx"]);

const blockedPatterns = [
  { pattern: /Video Not Added Yet/i, reason: "Unfinished walkthrough placeholder copy." },
  { pattern: /Pending approval for public quote/i, reason: "Unpublished social proof placeholder copy." },
  { pattern: /Replace or refine each metric as you finalize/i, reason: "Draft outcomes placeholder copy." },
  { pattern: /TODO/i, reason: "Unresolved TODO marker." }
];
const requiredImpactFields = ["metric_period", "baseline", "delta", "source_artifact_url", "confidence_level"];
const allowedConfidenceLevels = new Set(["high", "medium", "directional"]);

const ignorePaths = new Set(["node_modules", ".next", ".git"]);
const violations = [];

function scanPath(relativePath) {
  const absolutePath = path.join(projectRoot, relativePath);
  if (!fs.existsSync(absolutePath)) {
    return;
  }

  const stat = fs.statSync(absolutePath);
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(absolutePath)) {
      if (ignorePaths.has(entry)) {
        continue;
      }
      scanPath(path.join(relativePath, entry));
    }
    return;
  }

  const extension = path.extname(relativePath);
  if (!allowedExtensions.has(extension)) {
    return;
  }

  const content = fs.readFileSync(absolutePath, "utf8");
  const lines = content.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    for (const blocked of blockedPatterns) {
      if (blocked.pattern.test(line)) {
        violations.push({
          file: relativePath,
          line: index + 1,
          reason: blocked.reason,
          snippet: line.trim()
        });
      }
    }
  }
}

function validateProjectOutcomeEvidence() {
  const projectsRoot = path.join(projectRoot, "content", "projects");
  if (!fs.existsSync(projectsRoot)) {
    return;
  }

  const files = fs
    .readdirSync(projectsRoot)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .sort();

  for (const file of files) {
    const absolutePath = path.join(projectsRoot, file);
    const relativePath = path.relative(projectRoot, absolutePath);
    const fileContent = fs.readFileSync(absolutePath, "utf8");
    const { data } = matter(fileContent);
    const impact = data.impact;

    if (!Array.isArray(impact)) {
      continue;
    }

    impact.forEach((metric, index) => {
      if (typeof metric !== "object" || metric === null) {
        violations.push({
          file: relativePath,
          line: 1,
          reason: "Impact metric entry must be an object.",
          snippet: `impact[${index}] is not an object`
        });
        return;
      }

      for (const field of requiredImpactFields) {
        if (!metric[field] || String(metric[field]).trim().length === 0) {
          violations.push({
            file: relativePath,
            line: 1,
            reason: `Impact metric is missing required evidence field '${field}'.`,
            snippet: `impact[${index}].${field}`
          });
        }
      }

      const confidenceLevel = String(metric.confidence_level ?? "").trim().toLowerCase();
      if (confidenceLevel && !allowedConfidenceLevels.has(confidenceLevel)) {
        violations.push({
          file: relativePath,
          line: 1,
          reason: "confidence_level must be one of: high, medium, directional.",
          snippet: `impact[${index}].confidence_level = ${confidenceLevel}`
        });
      }

      const sourceArtifactUrl = String(metric.source_artifact_url ?? "").trim();
      if (!sourceArtifactUrl) {
        return;
      }

      if (sourceArtifactUrl.startsWith("/")) {
        const artifactPath = path.join(projectRoot, "public", sourceArtifactUrl.replace(/^\//, ""));
        if (!fs.existsSync(artifactPath)) {
          violations.push({
            file: relativePath,
            line: 1,
            reason: "source_artifact_url points to a missing local file.",
            snippet: `impact[${index}].source_artifact_url = ${sourceArtifactUrl}`
          });
        }
      } else if (!/^https?:\/\//.test(sourceArtifactUrl)) {
        violations.push({
          file: relativePath,
          line: 1,
          reason: "source_artifact_url must be an absolute URL or site-relative path.",
          snippet: `impact[${index}].source_artifact_url = ${sourceArtifactUrl}`
        });
      }
    });
  }
}

for (const root of rootsToScan) {
  scanPath(root);
}
validateProjectOutcomeEvidence();

if (violations.length > 0) {
  console.error("Content quality gate failed.");
  for (const violation of violations) {
    console.error(
      `- ${violation.file}:${violation.line} | ${violation.reason}\n  ${violation.snippet}`
    );
  }
  process.exit(1);
}

console.log("Content quality gate passed.");
