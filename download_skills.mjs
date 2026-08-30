import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const skillsRoot = 'c:/Users/DESKTOP/Documents/Github/.agents/skills';
const tmpDir = 'C:/Users/DESKTOP/.gemini/antigravity-ide/brain/b7f3adeb-2a63-4c68-bd46-7a6dc3c6efbb/scratch/cloned_skills';

if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
}

const repos = [
  { name: 'threejs-skills', url: 'https://github.com/CloudAI-X/threejs-skills.git' },
  { name: 'animejs-skills', url: 'https://github.com/BowTiedSwan/animejs-skills.git' },
  { name: 'mengto-skills', url: 'https://github.com/MengTo/Skills.git' },
  { name: 'marketingskills', url: 'https://github.com/coreyhaines31/marketingskills.git' },
  { name: 'anthropic-skills', url: 'https://github.com/anthropics/skills.git' },
  { name: 'wshobson-agents', url: 'https://github.com/wshobson/agents.git' }
];

for (const repo of repos) {
  const target = path.join(tmpDir, repo.name);
  if (!fs.existsSync(target)) {
    console.log(`Cloning ${repo.name}...`);
    try {
      execSync(`git clone --depth 1 ${repo.url} "${target}"`, { stdio: 'inherit' });
    } catch (e) {
      console.error(`Failed to clone ${repo.name}:`, e.message);
    }
  }
}

// Copy and install all valid skill folders into skillsRoot
function copySkills(srcDir) {
  if (!fs.existsSync(srcDir)) return;
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const fullPath = path.join(srcDir, entry.name);
      const skillMd = path.join(fullPath, 'SKILL.md');
      if (fs.existsSync(skillMd)) {
        const destPath = path.join(skillsRoot, entry.name);
        console.log(`Installing skill: ${entry.name} -> ${destPath}`);
        fs.cpSync(fullPath, destPath, { recursive: true, force: true });
      } else {
        copySkills(fullPath); // recurse
      }
    }
  }
}

console.log('Discovering and installing skills...');
copySkills(tmpDir);
console.log('Skill installation complete!');
