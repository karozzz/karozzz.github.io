const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const outputDir = 'out';
const branch = 'gh-pages';
const repoUrl = 'https://github.com/karozzz/karozzz.github.io.git';

// Main function
async function main() {
  try {
    console.log('🚀 Starting GitHub Pages deployment...');
    
    // Build the project
    console.log('\n📦 Building project...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Create .nojekyll file to prevent GitHub Pages from using Jekyll
    const nojekyllPath = path.join(outputDir, '.nojekyll');
    fs.writeFileSync(nojekyllPath, '');
    console.log('\n✅ Created .nojekyll file');

    // Create CNAME file if you have a custom domain (uncomment and modify if needed)
    // const cnamePath = path.join(outputDir, 'CNAME');
    // fs.writeFileSync(cnamePath, 'yourdomain.com');
    // console.log('✅ Created CNAME file');
    
    // Deploy to GitHub Pages
    console.log('\n🚀 Deploying to GitHub Pages...');
    execSync(`npx gh-pages -d ${outputDir} -b ${branch} -r ${repoUrl}`, { stdio: 'inherit' });
    
    console.log('\n✅ Deployment complete! Your site should be available shortly.');
  } catch (error) {
    console.error('\n❌ Deployment failed:', error);
    process.exit(1);
  }
}

main();
