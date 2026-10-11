#!/usr/bin/env bash
# Regenerates the management clients in sdks/management/<language> from specs/management.yaml.
# Needs Java 17+ (openapi-generator runs on the JVM); the generator CLI is fetched with npx.
# Usage: scripts/generate-management.sh [language ...]   (default: all)
set -euo pipefail
cd "$(dirname "$0")/.."
SPEC=specs/management.yaml
GEN="npx --yes @openapitools/openapi-generator-cli@2.25.0 generate"
OUT=sdks/management
IGNORE=$(mktemp); printf 'test/\ntests/\n**/test/**\n**/*Test*/**\n**/*Tests.cs\n**/*Test.php\n**/test_*.py\n.travis.yml\ngit_push.sh\n' > "$IGNORE"
trap 'rm -f "$IGNORE"' EXIT

gen() { # language generator extra-properties [extra args...]
  local lang=$1 g=$2 props=$3; shift 3
  rm -rf "$OUT/$lang"
  $GEN -i "$SPEC" -g "$g" -o "$OUT/$lang" --additional-properties="$props" --ignore-file-override="$IGNORE" --git-user-id=trustportidentity --git-repo-id=identity-sdks "$@" >/dev/null
  echo "generated $lang"
}

want() { [ $# -eq 0 ] && return 0; for l in "${LANGS[@]}"; do [ "$l" = "$1" ] && return 0; done; return 1; }
LANGS=("$@")
sel() { [ ${#LANGS[@]} -eq 0 ] || printf '%s\n' "${LANGS[@]}" | grep -qx "$1"; }

sel typescript && gen typescript typescript-fetch "supportsES6=true,importFileExtension=.js,npmName=@trustport/identity-management,npmVersion=0.1.0,stringEnums=true,withInterfaces=false"
sel python     && gen python python "packageName=trustport_identity_management,projectName=trustport-identity-management,packageVersion=0.1.0"
sel php        && gen php php "invokerPackage=TrustPort\\Identity\\Management,composerVendorName=trustport,composerProjectName=identity-management,artifactVersion=0.1.0"
sel csharp     && gen csharp csharp "packageName=TrustPort.Identity.Management,targetFramework=net8.0,packageVersion=0.1.0,library=httpclient,nullableReferenceTypes=true"
sel swift      && gen swift swift5 "projectName=TrustPortIdentityManagement,responseAs=AsyncAwait,library=urlsession"
sel go         && gen go go "packageName=management,isGoSubmodule=true" 
exit 0
