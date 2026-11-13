/**
 * @jest-environment node
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

interface PackageJson {
  readonly types: string;
  readonly exports: { readonly types: string };
}

const ROOT_DIR = resolve(__dirname, "..");

describe("published type declarations", () => {
  let outDir: string;
  let pkg: PackageJson;

  beforeAll(() => {
    outDir = mkdtempSync(join(tmpdir(), "use-mailchimp-form-build-"));
    execFileSync(
      join(ROOT_DIR, "node_modules", ".bin", "vite"),
      ["build", "--outDir", outDir, "--emptyOutDir"],
      { cwd: ROOT_DIR, stdio: "pipe" }
    );
    pkg = JSON.parse(
      readFileSync(join(ROOT_DIR, "package.json"), "utf8")
    ) as PackageJson;
  }, 120_000);

  afterAll(() => {
    rmSync(outDir, { recursive: true, force: true });
  });

  test("should emit the declaration file referenced by package.json types when building", () => {
    const typesPath = join(outDir, pkg.types.replace(/^\.\/dist\//, ""));
    expect(existsSync(typesPath)).toBe(true);
  });

  test("should emit the declaration file referenced by exports.types when building", () => {
    const typesPath = join(
      outDir,
      pkg.exports.types.replace(/^\.\/dist\//, "")
    );
    expect(existsSync(typesPath)).toBe(true);
    expect(readFileSync(typesPath, "utf8")).toContain("useMailChimpForm");
  });
});
