import os

# --- CONFIGURATION ---
OUTPUT_FILE = "hugo_context.txt"

# Folders to scan. Added "static" to capture robots.txt/JS,
# but the script will still ignore images inside it based on extension.
INCLUDE_DIRS = ["layouts", "content", "assets", "data", "archetypes", "static"]

# Specific config files to include from root
INCLUDE_FILES = ["hugo.toml", "config.toml", "hugo.yaml", "config.yaml", "theme.toml"]

# Allowed Text Extensions (Filters out images/fonts automatically)
VALID_EXTS = {
    ".html", ".md", ".markdown",
    ".toml", ".yaml", ".yml", ".json",
    ".css", ".scss", ".sass",
    ".js", ".ts",
    ".txt", ".xml"
}

def main():
    print(f"📦 Packing Hugo context...")
    with open(OUTPUT_FILE, "w", encoding="utf-8") as outfile:
        # 1. Process Root Config Files
        for f in INCLUDE_FILES:
            if os.path.exists(f):
                write_file(f, outfile)

        # 2. Process Directories
        for root, dirs, files in os.walk("."):
            # Filter directories to only walk allowed ones
            if root == ".":
                dirs[:] = [d for d in dirs if d in INCLUDE_DIRS]

            for file in files:
                ext = os.path.splitext(file)[1].lower()
                if ext in VALID_EXTS:
                    path = os.path.join(root, file)
                    write_file(path, outfile)

    print(f"✅ Done! Content written to: {OUTPUT_FILE}")

def write_file(path, outfile):
    try:
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
            # XML-style wrapping for clear separation
            outfile.write(f"\n<file path=\"{path}\">\n")
            outfile.write(content)
            outfile.write("\n</file>\n")
            print(f"  + {path}")
    except Exception as e:
        print(f"  X Skipping {path}: {e}")

if __name__ == "__main__":
    main()
