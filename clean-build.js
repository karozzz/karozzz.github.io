const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to safely remove a directory
function removeDir(dirPath) {
  try {
    if (fs.existsSync(dirPath)) {
      console.log(`Removing directory: ${dirPath}`);
      
      // On Windows, use rimraf or recursive rm for better compatibility
      try {
        execSync(`rmdir /s /q "${dirPath}"`, { stdio: 'inherit' });
      } catch (e) {
        // Fallback to Node.js method if the command fails
        fs.rmSync(dirPath, { recursive: true, force: true });
      }
      
      console.log(`Successfully removed ${dirPath}`);
    }
  } catch (err) {
    console.error(`Error removing directory ${dirPath}:`, err);
  }
}

// Main function
async function main() {
  console.log('Cleaning project for fresh build...');
  
  // Remove the .next directory
  const nextDir = path.join(__dirname, '.next');
  removeDir(nextDir);
  
  // Also good to clear cache sometimes
  try {
    console.log('Clearing Next.js cache...');
    execSync('npx next clear-cache', { stdio: 'inherit' });
  } catch (e) {
    console.log('Cache clearing failed, but continuing with build');
  }
  
  // Run the build
  console.log('Starting fresh build...');
  execSync('next build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
}

main().catch(err => {
  console.error('Build process failed:', err);
  process.exit(1);
});
