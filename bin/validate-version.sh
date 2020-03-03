# GET BRANCH MANIFEST VERSION
BRANCH_VERSION=$(jq -r  '.version' manifest.json)

# GET MASTER MANIFEST VERSION
MASTER_VERSION=$(git show master:manifest.json | jq -r  '.version')

echo "$MASTER_VERSION -> $BRANCH_VERSION"

# COMPARE VERSIONS
LOWER_VERSION=$(printf '%s\n' "$BRANCH_VERSION" "$MASTER_VERSION" | sort -V | head -n1)

 if [ "$LOWER_VERSION" = "$BRANCH_VERSION" ]; then 
        echo "Please bump your manifest version."
        exit 1;
 else
        echo "Manifest version was bumped."
 fi