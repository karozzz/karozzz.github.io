const { spawn, execSync } = require('child_process');
const readline = require('readline');

const PORT = process.env.PORT || 3000;

// Function to check if a port is in use
function isPortInUse() {
  try {
    // For Windows
    const command = `netstat -ano | findstr :${PORT}`;
    const result = execSync(command, { encoding: 'utf-8' });
    return result.length > 0;
  } catch (error) {
    return false;
  }
}

// Function to kill process using the port (Windows-specific)
function killProcessOnPort() {
  try {
    // Find PID using the port
    const findCommand = `netstat -ano | findstr :${PORT}`;
    const output = execSync(findCommand, { encoding: 'utf-8' });
    
    // Extract PID from the output
    const lines = output.split('\n');
    let pids = new Set();
    
    for (const line of lines) {
      if (line.includes(`${PORT}`)) {
        const match = line.match(/\s+(\d+)$/);
        if (match && match[1]) {
          pids.add(match[1]);
        }
      }
    }
    
    if (pids.size === 0) {
      console.log(`No process found using port ${PORT}`);
      return false;
    }
    
    // Kill each process
    for (const pid of pids) {
      console.log(`Killing process with PID ${pid} using port ${PORT}...`);
      execSync(`taskkill /F /PID ${pid}`);
    }
    
    console.log(`Successfully killed processes using port ${PORT}`);
    return true;
  } catch (error) {
    console.error(`Error killing process on port ${PORT}:`, error.message);
    return false;
  }
}

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Main function
async function main() {
  if (isPortInUse()) {
    console.log(`Port ${PORT} is currently in use.`);
    rl.question('Do you want to: (1) Kill the process using this port or (2) Use a different port? [1/2] ', (answer) => {
      if (answer === '1') {
        if (killProcessOnPort()) {
          startNextApp(PORT);
        } else {
          useAlternativePort();
        }
      } else {
        useAlternativePort();
      }
      rl.close();
    });
  } else {
    startNextApp(PORT);
    rl.close();
  }
}

function useAlternativePort() {
  const altPort = PORT === 3000 ? 3001 : PORT + 1;
  console.log(`Starting on alternative port ${altPort}...`);
  startNextApp(altPort);
}

function startNextApp(port) {
  console.log(`Starting Next.js on port ${port}...`);
  
  const nextStart = spawn('next', ['start', '-p', port.toString()], { 
    stdio: 'inherit',
    shell: true
  });
  
  nextStart.on('error', (err) => {
    console.error('Failed to start Next.js:', err);
  });
}

main();
