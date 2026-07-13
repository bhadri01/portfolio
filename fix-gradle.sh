#!/bin/bash
# Fix Gradle MaxPermSize error with modern JDKs
mkdir -p ~/.gradle
echo 'org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8' > ~/.gradle/gradle.properties
echo "Created ~/.gradle/gradle.properties"

# Stop any existing broken daemons
gradle --stop 2>/dev/null

# Also patch the Gradle startup script if MaxPermSize is there
GRADLE_SCRIPT="/opt/homebrew/Cellar/gradle/9.5.0/libexec/bin/gradle"
if grep -q "MaxPermSize" "$GRADLE_SCRIPT" 2>/dev/null; then
    sed -i '' 's/-XX:MaxPermSize=512m//g' "$GRADLE_SCRIPT"
    echo "Patched $GRADLE_SCRIPT to remove MaxPermSize"
else
    echo "MaxPermSize not found in gradle script — it may be in the launcher JAR"
fi

echo ""
echo "Done! Try running 'gradle init' again."
