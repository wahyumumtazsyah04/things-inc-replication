import pkg from "../../../../package.json" assert { type: "json" };

export async function GET() {
    const gitSha = process.env.GIT_SHA || process.env.VERCEL_GIT_COMMIT_SHA;
    const buildTime = process.env.BUILD_TIME;
    return Response.json({ name: pkg.name, version: pkg.version, gitSha, buildTime });
}
