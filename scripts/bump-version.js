#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetVersion = process.argv[2];

if (!targetVersion) {
    console.error('Usage: npm run bump <version>');
    console.error('Examples:');
    console.error('  npm run bump patch');
    console.error('  npm run bump minor');
    console.error('  npm run bump major');
    console.error('  npm run bump 0.2.5');
    process.exit(1);
}

try {
    const pkgPath = path.join(__dirname, '../package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    const currentVersion = pkg.version;

    let newVersion = targetVersion;
    if (['patch', 'minor', 'major'].includes(targetVersion)) {
        const parts = currentVersion.split('.').map(Number);
        if (targetVersion === 'patch') parts[2]++;
        if (targetVersion === 'minor') {
            parts[1]++;
            parts[2] = 0;
        }
        if (targetVersion === 'major') {
            parts[0]++;
            parts[1] = 0;
            parts[2] = 0;
        }
        newVersion = parts.join('.');
    }

    console.log(`Bumping version from ${currentVersion} to ${newVersion}...`);

    pkg.version = newVersion;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    console.log('Updated package.json');

    const cargoPath = path.join(__dirname, '../src-tauri/Cargo.toml');
    let cargo = fs.readFileSync(cargoPath, 'utf8');
    cargo = cargo.replace(
        new RegExp(`version = "${currentVersion}"`),
        `version = "${newVersion}"`
    );
    fs.writeFileSync(cargoPath, cargo);
    console.log('Updated src-tauri/Cargo.toml');

    try {
        execSync('git add package.json src-tauri/Cargo.toml', { stdio: 'inherit' });
        execSync(`git commit -m "chore: bump version to ${newVersion}"`, { stdio: 'inherit' });
        console.log(`Created git commit v${newVersion}`);
    } catch (err) {
        console.warn('Could not create git commit. Please do it manually.');
    }

    console.log(`\nVersion bumped successfully! Run 'git push origin main --tags' to push.`);
} catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
}